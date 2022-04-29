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
      className={clsx(
        'py-1 px-2 text-sm border border-solid border-black capitalize mr-1 mb-1',
        isString && 'select-none'
      )}
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
          'btn-secondary capitalize items-center m-1 !min-w-0 border border-black !py-1 !px-2',
          tag.selected && 'active !bg-black !text-peach',
          !tag.selected && 'hover:bg-orange hover:border-red hover:text-peach'
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
 * @param {import("./types").Tags} props
 * @returns {JSX.Element}
 */

const Tags = ({ tags, className }) => (
  <div className={clsx(`flex flex-wrap z-5 ${className}`)}>
    {tags.map((tag, index) => (
      <Tag tag={tag} key={`blog-tag-${tag}-${index}`} />
    ))}
  </div>
)

export default Tags
