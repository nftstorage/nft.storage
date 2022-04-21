import clsx from 'clsx'

/**
 * @typedef {Object} BoxProps
 * @prop {string} [bgColor]
 * @prop {string} [borderColor]
 * @prop {string} [wrapperClassName]
 * @prop {string} [className]
 * @prop {any} children
 */

/**
 *
 * @param {BoxProps} props
 * @returns
 */
export default function Box({
  bgColor = 'white',
  borderColor = 'nsgray',
  wrapperClassName,
  className,
  children,
}) {
  return (
    <div
      className={clsx(
        `bg-${borderColor}`,
        'border',
        'border-black',
        wrapperClassName
      )}
    >
      <div
        className={clsx(
          'relative',
          'w-full',
          'h-full',
          'p-6',
          `bg-${bgColor}`,
          'border',
          'border-solid',
          'border-black',
          'top-2',
          'right-2',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
