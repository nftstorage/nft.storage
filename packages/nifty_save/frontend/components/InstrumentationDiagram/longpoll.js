import { useEffect, useRef } from 'react'

/**
 *
 * @param {function} cb
 * @param {number} timing
 */

export function useLongPoll(cb, timing) {
  const activeFunction = useRef()
  useEffect(() => {
    activeFunction.current = cb
  }, [cb])

  useEffect(() => {
    const tick = () => {
      activeFunction.current()
    }

    if (timing) {
      const repeater = setInterval(tick, timing)
      return () => clearInterval(repeater)
    }
  }, [cb, timing])
}
