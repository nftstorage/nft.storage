let Countly = {}
// @ts-ignore
Countly.q = Countly.q || []
if (typeof window !== 'undefined') {
  // @ts-ignore
  Countly = window.Countly || {}
  Countly.q = Countly.q || []
  Countly.debug = false
  Countly.app_key = process.env.NEXT_PUBLIC_COUNTLY_KEY
  Countly.url = process.env.NEXT_PUBLIC_COUNTLY_UR
  Countly.q.push(['track_sessions'])
  Countly.q.push(['track_pageview'])
  Countly.q.push(['track_clicks'])
  Countly.q.push(['track_scrolls'])
  Countly.q.push(['track_links'])
}

/** @constant */
export const events = {
  LINK_CLICK_NAVBAR: 'linkClickNavbar',
  LINK_CLICK_FOOTER: 'linkClickFooter',
  // Used for CTAs that are only linking to other pages/resources
  CTA_LINK_CLICK: 'ctaLinkClick',
  // Other custom action events
  LOGIN_CLICK: 'loginClick',
  LOGOUT_CLICK: 'logoutClick',
  BLOG_SUBSCRIBE_CLICK: 'blogSubscribeClick',
  FILE_UPLOAD_CLICK: 'fileUploadClick',
  FILE_DELETE_CLICK: 'fileDeleteClick',
  FILES_NAVIGATION_CLICK: 'filesNavigationClick',
  TOKEN_CREATE: 'tokenCreate',
  TOKEN_COPY: 'tokenCopy',
  TOKEN_DELETE: 'tokenDelete',
  NOT_FOUND: 'notFound',
  PINNING_REQUEST: 'pinningRequest',
}

/** @constant */
export const ui = {
  HOME_HERO: 'home/hero',
  HOME_GET_STARTED: 'home/get-started',
  NAVBAR: 'navbar',
  LOGIN: 'login',
  BLOG_CARD: 'blog/card',
  BLOG_POST: 'blog/post',
  BLOG_SUBSCRIBE: 'blog/subscribe',
  FILES: 'files',
  NEW_FILE: 'new-file',
  NEW_TOKEN: 'new-token',
  PINNING_REQUEST: 'pinning-request',
  TOKENS: 'tokens',
  NFT_UP: 'nft-up',
}

/**
 * Track an event to countly with custom data
 *
 * @param {string} event Event name to be sent to countly.
 * @param {Object} [segmentation] Custom data object to be used as segmentation data in countly.
 */
export function trackEvent(event, segmentation = {}) {
  Countly.q.push([
    'add_event',
    {
      key: event,
      segmentation: {
        path: location.pathname,
        ...segmentation,
      },
    },
  ])
}

/**
 * Track page view to countly.
 *
 * @param {string} [path] Page route to track. Defaults to window.location.pathname if not provided.
 */
export function trackPageView(path) {
  Countly.q.push(['track_pageview', path])
}

/**
 * Track custom link click.
 * @param {string} event Event name to be sent to countly.
 * @param {HTMLLinkElement} target DOM element target of the clicked link.
 * @param {Object} data Extra data to be sent to countly
 */
export function trackCustomLinkClick(event, target, data = {}) {
  trackEvent(event, {
    link: target.href.includes(location.origin)
      ? new URL(target.href).pathname + (new URL(target.href).hash || '')
      : target.href,
    text: target.innerText,
    ...data,
  })
}

const _countly = {
  events,
  ui,
  trackEvent,
  trackPageView,
  trackCustomLinkClick,
}

export default _countly
