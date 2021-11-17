/**
 * Tag Component
 *
 * @param {Object} props
 * @param {string} props.children
 * @returns {JSX.Element}
 */
export const Tag = ({ children }) => (
  <span className="ph2 pv1 f6 ba select-none">{children}</span>
)

/**
 * Tags Component
 *
 * @param {Object} props
 * @param {string[]} props.tags
 * @returns {JSX.Element}
 */
const Tags = ({ tags }) => (
  <div className="flex z-5">
    {tags.map((tag, index) => (
      <div key={`blog-card-tag-${tag}-${index}`} className="mr2">
        <Tag>{tag}</Tag>
      </div>
    ))}
  </div>
)

export default Tags
