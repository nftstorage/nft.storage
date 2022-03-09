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
          'w-100',
          'h-100',
          'pa3',
          `bg-${bgColor}`,
          'ba',
          'border-black',
          className
        )}
        style={{ top: 10, right: 8 }}
      >
        {children}
      </div>
    </div>
  )
}
