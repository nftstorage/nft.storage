import { nanoid } from 'nanoid/non-secure'

const logtailApiURL = 'https://in.logtail.com/'

const buildMetadataFromHeaders = (/** @type {Headers} */ headers) => {
  /** @type {Record<string, string>} */
  const responseMetadata = {}
  Array.from(headers).forEach(([key, value]) => {
    responseMetadata[key.replace(/-/g, '_')] = value
  })
  return responseMetadata
}

export class Logging {
  /**
   * @param {Request} request
   * @param {import('./env').Env} env
   * @param {import('./').Ctx} ctx
   */
  constructor(request, env, ctx) {
    this.request = request
    this.env = env
    this.ctx = ctx

    this._times = new Map()
    /**
     * @type {string[]}
     */
    this._timesOrder = []
    /**
     * @type {any[]}
     */
    this.logEventsBatch = []
    this.startTs = Date.now()
    this.currentTs = this.startTs

    const cf = request.cf // TODO?
    let rCf
    if (cf) {
      const { tlsClientAuth, tlsExportedAuthenticator, ...rest } = cf
      rCf = rest
    }
    this.metadata = {
      user: {
        id: 0,
      },
      request: {
        url: request.url,
        method: request.method,
        headers: buildMetadataFromHeaders(request.headers),
        cf: rCf,
      },
      cloudflare_worker: {
        version: env.VERSION,
        commit: env.COMMITHASH,
        branch: env.BRANCH,
        worker_id: nanoid(10),
        worker_started: this.startTs,
      },
    }
  }

  _date() {
    const now = Date.now()
    if (now === this.currentTs) {
      const dt = new Date().toISOString()
      /**
       * Fake increment the datetime string to order the logs entries
       * It won't leap seconds but for most cases it will increment by 1 the datetime milliseconds
       */
      const newDt = dt.replace(/\.(\d*)Z/, (s, p1, p2) => {
        return `.${String(Number(p1) + this.logEventsBatch.length)}Z`
      })
      return new Date(newDt).toISOString()
    } else {
      this.currentTs = now
      return new Date().toISOString()
    }
  }

  /**
   * Add log entry to batch
   *
   * @param {any} body
   */
  _add(body) {
    this.logEventsBatch.push(body)
  }

  async postBatch() {
    if (!this.env.LOGTAIL_TOKEN) {
      return
    }

    if (this.logEventsBatch.length > 0) {
      const batchInFlight = [...this.logEventsBatch]
      this.logEventsBatch = []
      const rHost = batchInFlight[0].metadata.request.headers.host
      const body = JSON.stringify(batchInFlight)
      const request = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.env.LOGTAIL_TOKEN}`,
          'Content-Type': 'application/json',
          'User-Agent': `Cloudflare Worker via ${rHost}`,
        },
        body,
      }
      const resp = await fetch(logtailApiURL, request)
      if (this.env.DEBUG) {
        console.info(
          `[${this._date()}] `,
          `${batchInFlight.length} Logs pushed with status ${resp.status}.`
        )
      }
    }
  }

  /**
   * End instance, push logs and servers timings
   *
   * @param {Response} response
   */
  async end(response) {
    if (this.env.DEBUG) {
      response.headers.set('Server-Timing', this._timersString())
    }
    const run = async () => {
      const dt = this._date()
      const duration = Date.now() - this.startTs
      const log = {
        message: '',
        dt,
        level: 'info',
        metadata: {
          ...this.metadata,
          response: {
            headers: buildMetadataFromHeaders(response.headers),
            status_code: response.status,
            duration,
          },
        },
      }
      this._add(log)
      await this.postBatch()
    }
    this.ctx.waitUntil(run())

    return response
  }

  /**
   * Log
   *
   * @param {string | Error} message
   * @param {'debug' | 'info' | 'warn' | 'error'} level
   * @param {any} [context]
   * @param {any} [metadata]
   */
  log(message, level, context, metadata) {
    const dt = this._date()
    let log = {
      dt,
      level,
      metadata: { ...this.metadata, ...metadata },
      ...context,
    }

    if (message instanceof Error) {
      log = {
        ...log,
        stack: message.stack,
        message: message.message,
      }
      this.env.sentry && this.env.sentry.captureException(message)
    } else {
      log = {
        ...log,
        message,
      }
    }

    if (this.env.DEBUG) {
      console[level](`[${dt}] `, log.message, context)
    }
    this._add(log)
  }

  /**
   * @param {string} message
   * @param {any} [context]
   */
  debug(message, context) {
    return this.log(message, 'debug', context)
  }

  /**
   * @param {string} message
   * @param {any} [context]
   */
  info(message, context) {
    return this.log(message, 'info', context)
  }

  /**
   * @param {string} message
   * @param {any} [context]
   */
  warn(message, context) {
    return this.log(message, 'warn', context)
  }
  /**
   * @param {string | Error} message
   * @param {any} [context]
   */
  error(message, context) {
    return this.log(message, 'error', context)
  }

  /**
   * @param {string} name
   * @param {any} [description]
   */
  time(name, description) {
    this._times.set(name, {
      name: name,
      description: description,
      start: Date.now(),
    })
    this._timesOrder.push(name)
  }

  /**
   * @param {string} name
   */
  timeEnd(name) {
    const timeObj = this._times.get(name)
    if (!timeObj) {
      return console.warn(`No such name ${name}`)
    }

    const end = Date.now()
    const duration = end - timeObj.start
    const value = duration
    timeObj.value = value
    this._times.set(name, {
      ...timeObj,
      end,
      duration,
    })

    if (this.env.DEBUG) {
      console.log(`[${this._date()}] `, `name: ${duration} ms`)
    }
    return timeObj
  }

  _timersString() {
    const result = []
    for (const key of this._timesOrder) {
      const { name, duration, description } = this._times.get(key)
      result.push(
        description
          ? `${name};desc="${description}";dur=${duration}`
          : `${name};dur=${duration}`
      )
    }

    return result.join(',')
  }
}
