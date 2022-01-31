import Button from './button'
import clsx from 'clsx'

/**
 * Tag Component
 *
 * @param {Object} props
 * @param {import("./types").Tag | string} props.tag
 * @returns {JSX.Element}
 */
export const Tag = ({ tag }) => {
  const isString = typeof tag === 'string'
  const inner = (
    <span
      className={clsx('ph2 pv1 f6 ba ttc mr1 mb1', isString && 'select-none')}
    >
      {isString ? tag : tag.label}
    </span>
  )
  return isString ? (
    inner
  ) : (
    <div>
      <Button
        onClick={tag.onClick}
        variant="tag"
        className={clsx(
          'btn-secondary ttc items-center',
          tag.selected && 'active'
        )}
      >
        {tag.label}
      </Button>
    </div>
  )
}

/**
 * Tags Component
 *
 * @param {Object} props
 * @param {import("./types").Tag[] | string[]} props.tags
 * @returns {JSX.Element}
 */
const Tags = ({ tags }) => (
  <div
    className={clsx(
      'blog-tags flex flex-wrap z-5',
      typeof tags[0] !== 'string' && 'blog-tags-buttons'
    )}
  >
    {tags.map((tag, index) => (
      <Tag tag={tag} key={`blog-tag-${tag}-${index}`} />
    ))}
  </div>
)

export default Tags
