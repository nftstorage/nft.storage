/**
 * HashLink Component
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {any} props.children
 */
export default function HashLink({ id, children }) {
  return (
    <a
      id={id}
      href={`#${id}`}
      className="relative hide-child no-underline color-inherit"
    >
      <span className="absolute child" style={{ left: '-0.85em' }}>
        #
      </span>
      {children}
    </a>
  )
}
