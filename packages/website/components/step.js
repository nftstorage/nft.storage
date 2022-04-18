/**
 * Step Component
 *
 * @param {Object} props
 * @param {string} [props.wrapperClassName]
 * @param {string} [props.className]
 * @param {string} props.children
 */
export default function Step({ wrapperClassName, className, children }) {
  wrapperClassName = `inline-block border border-solid border-black mb-3 ${
    wrapperClassName ?? ''
  }`.trim()
  className =
    `inline-block relative w-full py-1 px-3 chicagoflf text-2xl text-white bg-black ${
      className ?? ''
    }`.trim()
  return (
    <div className={wrapperClassName}>
      <div className={className}>Step {children}</div>
    </div>
  )
}
