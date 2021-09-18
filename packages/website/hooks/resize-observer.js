import { useEffect } from 'react'

/**
 * @param {React.MutableRefObject<HTMLElement | null>} ref React ref on which resizes are to be observed
 * @param {ResizeObserverCallback} callback Function that needs to be fired on resize
 */
function useResizeObserver(ref, callback) {
  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(callback)

      observer.observe(ref.current)

      return () => observer.disconnect()
    }
  }, [ref, callback])
}

export { useResizeObserver }
