import clsx from 'clsx'

/**
 * Code Text Component
 *
 * @param {Object} props
 * @param {string} [props.color]
 * @param {string} [props.bgColor]
 * @param {string} [props.className]
 * @param {string | JSX.Element | JSX.Element[]} [props.children]
 */
const InlineCode = ({
  color = 'text-black',
  bgColor = 'bg-gray-400',
  className,
  children,
}) => (
  <code
    className={clsx(
      'code ph1 whitespace-pre-wrap break-words',
      color,
      bgColor,
      className
    )}
  >
    {children}
  </code>
)

export default InlineCode
