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
      <span className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-all">
        #
      </span>
      {children}
    </a>
  )
}
