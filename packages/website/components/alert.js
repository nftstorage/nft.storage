import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

/**
 * @typedef {Object} AlertProps
 * @prop {string} [className]
 * @prop {('top'|'bottom')} [position]
 * @prop {('error'|'success'|'info')} [type]
 * @prop {Number} [timer] How much seconds before onTimerEnd should be called
 * @prop {Function} [onTimerEnd]
 * @prop {JSX.Element} [children]
 */

const ANIMATION_DURATION = 400

/**
 *
 * @param {AlertProps} props
 * @returns
 */
export default function Alert({
  className,
  position = 'bottom',
  type = 'info',
  timer,
  onTimerEnd,
  children,
}) {
  const [hasTimerEnded, setTimerHasEnded] = useState(false)

  useEffect(() => {
    if (timer && onTimerEnd) {
      setTimeout(() => {
        setTimerHasEnded(true)
        setTimeout(onTimerEnd, ANIMATION_DURATION)
      }, timer * 1000)
    }
  }, [timer, onTimerEnd])

  return (
    <div
      className={clsx(
        className,
        'flex justify-center items-center',
        'fixed left-0 right-0 z-999',
        position === 'bottom' &&
          hasTimerEnded &&
          'bottom-0 disappear-to-bottom',
        position === 'bottom' &&
          !hasTimerEnded &&
          'bottom-0 appear-from-bottom',
        position === 'top' && 'top-0',
        type === 'error' && 'bg-red',
        type === 'success' && 'bg-green'
      )}
    >
      {children}
    </div>
  )
}
