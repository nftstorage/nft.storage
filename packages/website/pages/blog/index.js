import { Card, HighlightCard } from '../../components/blog/cards'
import { useEffect, useState } from 'react'

import Button from '../../components/button'
import Tags from '../../components/tags'
import { allTags } from '../../components/blog/constants'
import clsx from 'clsx'
import fs from 'fs'
import matter from 'gray-matter'
import { usePagination } from '../../lib/usePagination'
import { useRouter } from 'next/router'

const BLOG_ITEMS_PER_PAGE = 9

export async function getStaticProps() {
  const files = fs.readdirSync('posts')

  let featuredImage = null

  // we can create a "featured" flag if we want and feature blogs that way

  /**
   * @param {string} date
   */

  files.sort().reverse()

  const posts = files
    ? files
        .filter((filename) => !filename.startsWith('.'))
        .map((fn, index) => {
          const content = fs.readFileSync(`posts/${fn}`).toString()
          const info = matter(content)
          if (index === 0) featuredImage = info.data.thumbnail
          return {
            ...info.data,
            slug: fn.split('.')[0],
          }
        })
    : []

  return {
    props: {
      posts,
      title: 'Blog - NFT Storage',
      image: featuredImage,
      navBgColor: 'bg-nsltblue',
      altLogo: true,
      needsUser: false,
    },
  }
}

/**
 * Pagination Component
 *
 * @param {Object} props
 * @param {import('../../components/types').PostMeta[]} props.items
 * @param {number} props.pageNumber
 * @param {(pageNumber: number) => void} props.setPageNumber
 * @param {string[]} [props.filters]
 * @returns {JSX.Element}
 */
const Paginated = ({ items, pageNumber, setPageNumber }) => {
  const paginationRange = usePagination({
    totalCount: items.length,
    pageSize: BLOG_ITEMS_PER_PAGE,
    currentPage: pageNumber,
  })

  /**
   * items hook
   * @param {import('../../components/types').PostMeta[]} items
   */
  const useItems = (items) => {
    const [currentItems, setCurrentItems] = useState(items)

    useEffect(() => {
      const offset = (pageNumber * BLOG_ITEMS_PER_PAGE) % items.length
      const endOffset = offset + BLOG_ITEMS_PER_PAGE
      const sliced = items.slice(offset, endOffset)
      setCurrentItems(sliced)
    }, [items])

    return currentItems
  }

  const currentItems = useItems(items)

  const pageCount = Math.ceil(items.length / BLOG_ITEMS_PER_PAGE)

  const router = useRouter()
  const { page } = router.query

  useEffect(() => {
    const newPage = typeof page === 'string' ? parseInt(page) : 1
    setPageNumber(newPage - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  /**
   * @param {number} newPage
   */
  const handlePageClick = (newPage) => {
    router.push({
      pathname: '/blog',
      query:
        newPage === 1 ? undefined : { page: encodeURI(newPage.toString()) },
    })
  }

  /**
   * @param {Object} props
   * @param {string} props.children
   * @param {boolean} [props.disabled]
   * @param {boolean} [props.isActive]
   * @param {number} [props.page]
   */
  const PagNavButton = ({ page, children, disabled, isActive }) => {
    return (
      <Button
        key={`pag-nav-item-${page || children}`}
        onClick={!page || isActive ? undefined : () => handlePageClick(page)}
        disabled={disabled}
        variant="tag"
        className={clsx(
          'border border-black bg-peach m-1 h-8 !min-w-0 items-center',
          !isActive &&
            !disabled &&
            'hover:bg-orange hover:border-red hover:text-peach',
          isActive && '!bg-black !text-white cursor-default',
          disabled && 'disabled opacity-50 cursor-default'
        )}
      >
        {children}
      </Button>
    )
  }

  const PaginatedNav = () => {
    const rangeButtons = paginationRange?.map((item) => (
      <PagNavButton
        key={`nav-button-${item}`}
        page={typeof item === 'string' ? undefined : item}
        isActive={typeof item !== 'string' && item - 1 === pageNumber}
      >
        {item.toString()}
      </PagNavButton>
    ))
    return (
      <>
        <PagNavButton page={pageNumber} disabled={pageNumber === 0}>
          prev
        </PagNavButton>
        {rangeButtons}
        <PagNavButton
          page={pageNumber + 2}
          disabled={pageNumber === pageCount - 1}
        >
          next
        </PagNavButton>
      </>
    )
  }
  return (
    <div className="flex-auto pb-24">
      {currentItems.length > 0 ? (
        <Items currentItems={currentItems} />
      ) : (
        <div className="flex items-center justify-center flex-auto h-full pt-8">
          More blogs coming soon
        </div>
      )}
      {items.length > BLOG_ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-12">
          <PaginatedNav />
        </div>
      )}
    </div>
  )
}

/**
 * Blog Cards
 *
 * @param {Object} props
 * @param {import('../../components/types').PostMeta[]} props.currentItems
 */
const Items = ({ currentItems }) => (
  <div className="card-grid grid gap-8 justify-center pt-8">
    {currentItems.map((post, i) => (
      <Card key={i} post={post} />
    ))}
  </div>
)

/**
 *
 * @param {Object} props
 * @param {string[]} props.tags
 * @param {string[]} props.filters
 * @param {(tag: string) => void} props.handleTagClick
 * @returns {JSX.Element}
 */
function TagsContainer({ tags, filters, handleTagClick }) {
  return (
    <div className="button-tags-container py-4 max-w-7xl">
      <Tags
        className="justify-center sm:justify-start border-b border-black pb-4"
        tags={tags.map((tag) => {
          const normTag = tag.toLowerCase()
          return {
            label: normTag,
            onClick: () => handleTagClick(normTag),
            selected: filters.includes(normTag),
          }
        })}
      />
    </div>
  )
}

/**
 * Blog Page
 *
 * @param {Object} props
 * @param {import('../../components/types').PostMeta[] | []} props.posts
 */
const Blog = ({ posts }) => {
  const [currentPosts, setCurrentPosts] = useState(posts)
  const [pageNumber, setPageNumber] = useState(0)
  const [filters, setFilters] = useState(['all'])
  const first = posts[0]

  const router = useRouter()

  useEffect(() => {
    if (!posts) return

    const shouldFilterPosts = filters[0] !== 'all'
    const _posts = shouldFilterPosts
      ? posts.filter((post) =>
          post.tags?.some((t) => filters.includes(t.toLowerCase()))
        )
      : posts

    setCurrentPosts(_posts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, posts])

  /**
   *
   * @param {string} tag
   */
  const handleTagClick = (tag) => {
    setFilters((prev) => {
      if (tag === 'all') return ['all']
      let newTags = prev.includes(tag)
        ? prev.filter((t) => t.toLowerCase() !== tag)
        : [...prev, tag.toLowerCase()]
      newTags = newTags.filter((t) => t.toLowerCase() !== 'all')
      return newTags.length > 0 ? newTags : ['all']
    })
    if (pageNumber !== 0) {
      router.push({
        pathname: '/blog',
      })
    }
  }

  /**
   * @param {Object} props
   * @param {JSX.Element | string} props.children
   * @param {boolean} [props.abs]
   */
  const Backdrop = ({ children, abs }) => (
    <div
      className={clsx(
        'bg-nsltblue flex flex-auto justify-center items-center w-full h-full z-999 top-0 left-0 select-none',
        abs && 'absolute'
      )}
    >
      {children}
    </div>
  )

  if (posts.length === 0) return <Backdrop>There are no blogs yet 😞</Backdrop>

  return (
    <main className="flex flex-auto blog bg-nspeach w-full">
      <div className="w-full">
        <HighlightCard post={first} />
        <div className="w-full max-w-7xl px-6 sm:px-16 mx-auto">
          <TagsContainer
            filters={filters}
            handleTagClick={handleTagClick}
            tags={allTags}
          />
          <Paginated
            key={pageNumber}
            items={currentPosts}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </main>
  )
}

export default Blog
