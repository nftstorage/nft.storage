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
      className="group relative no-underline color-inherit"
    >
      <span
        className="absolute opacity-0 group-hover:opacity-100 transition-all"
        style={{ left: '-0.85em' }}
      >
        #
      </span>
      {children}
    </a>
  )
}
