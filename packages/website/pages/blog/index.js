import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import matter from 'gray-matter'
import { Card, HighlightCard } from '../../components/blog/cards'
import Tags from '../../components/tags'
import { allTags } from '../../components/blog/constants'
import { usePagination } from '../../lib/usePagination'
import clsx from 'clsx'
import Loading from '../../components/loading'
import Button from '../../components/button'

const BLOG_ITEMS_PER_PAGE = 2

export async function getStaticProps() {
  const files = fs.readdirSync('all-blogs')

  let featuredImage = null

  // we can create a "featured" flag if we want and feature blogs that way

  /**
   * @param {string} fn
   */
  const getBirthtime = fn => fs.statSync(`all-blogs/${fn}`).birthtime.getTime()

  files.sort((a, b) => getBirthtime(b) - getBirthtime(a))

  const posts = files
    ? files
        .filter(filename => filename.toLowerCase() !== '.ds_store')
        .map((fn, index) => {
          const content = fs.readFileSync(`all-blogs/${fn}`).toString()
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
 * @param {() => void} props.handleCardClick
 * @param {string[]} [props.filters]
 * @returns {JSX.Element}
 */
const Paginated = ({ items, pageNumber, setPageNumber, handleCardClick }) => {
  const paginationRange = usePagination({
    totalCount: items.length,
    pageSize: BLOG_ITEMS_PER_PAGE,
    currentPage: pageNumber,
  })

  /**
   * items hook
   * @param {import('../../components/types').PostMeta[]} items
   */
  const useItems = items => {
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
  }, [page])

  /**
   * @param {number} newPage
   */
  const handlePageClick = newPage => {
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
        unstyled
        key={`pag-nav-item-${page || children}`}
        onClick={!page || isActive ? undefined : () => handlePageClick(page)}
        disabled={disabled}
        className={clsx(
          'ba b--black ttu h8 ma1 mnw8 select-none',
          isActive
            ? 'bg-black nspeach pointer-default'
            : 'black bg-transparent',
          !isActive && !disabled && 'grow pointer',
          disabled && 'o-50'
        )}
      >
        {children}
      </Button>
    )
  }

  const PaginatedNav = () => {
    const rangeButtons = paginationRange?.map(item => (
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
    <div className="pb24 flex-auto">
      {currentItems.length > 0 ? (
        <Items currentItems={currentItems} handleClick={handleCardClick} />
      ) : (
        <div className="flex h-100 pt4 flex-auto justify-center items-center">
          No items to show
        </div>
      )}
      {items.length > BLOG_ITEMS_PER_PAGE && (
        <div className="flex justify-center mt13">
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
 * @param {() => void} props.handleClick
 */
const Items = ({ currentItems, handleClick }) => (
  <div className="flex justify-evenly flex-wrap pt2">
    {currentItems.map((post, i) => (
      <Card key={i} post={post} onClick={handleClick} />
    ))}
  </div>
)

/**
 * Blog Page
 *
 * @param {Object} props
 * @param {import('../../components/types').PostMeta[] | []} props.posts
 */
const Blog = ({ posts }) => {
  const [, ...rest] = posts
  const [currentPosts, setCurrentPosts] = useState(rest)
  const [pageNumber, setPageNumber] = useState(0)
  const [filters, setFilters] = useState(['all'])
  const [loading, setLoading] = useState(false)
  const first = posts[0]

  const router = useRouter()

  useEffect(() => {
    if (!posts) return
    const filtered =
      filters[0] !== 'all'
        ? posts.filter(post => {
            return post.tags?.some(t => filters.includes(t.toLowerCase()))
          })
        : rest
    setCurrentPosts(filtered)
  }, [filters])

  /**
   *
   * @param {string} tag
   */
  const handleTagClick = tag => {
    setFilters(prev => {
      if (tag === 'all') return ['all']
      let newTags = prev.includes(tag)
        ? prev.filter(t => t.toLowerCase() !== tag)
        : [...prev, tag.toLowerCase()]
      newTags = newTags.filter(t => t.toLowerCase() !== 'all')
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
        'bg-nsltblue flex flex-auto justify-center items-center w-100 h-100 z-999 top-0 left-0 select-none',
        abs && 'absolute'
      )}
    >
      {children}
    </div>
  )

  if (loading)
    return (
      <Backdrop abs>
        <Loading />
      </Backdrop>
    )

  if (posts.length === 0) return <Backdrop>There are no blogs yet 😞</Backdrop>

  return (
    <main className="blog bg-nspeach w-100 flex flex-auto">
      <div className="flex flex-column justify-center flex-auto">
        <div className="w-100 bg-black" style={{ height: 1 }} />
        <HighlightCard onClick={() => setLoading(true)} post={first} />
        <div className="w-100 bg-black" style={{ height: 1 }} />
        <div className="button-tags-container pt3 flex flex-column ph13 flex-auto">
          <Tags
            tags={allTags.map(tag => {
              const normTag = tag.toLowerCase()
              return {
                label: normTag,
                onClick: () => handleTagClick(normTag),
                selected: filters.includes(normTag),
              }
            })}
          />
          <div className="w-100 bg-black mb3 mt3" style={{ height: 1 }} />
        </div>
        <Paginated
          key={pageNumber}
          handleCardClick={() => setLoading(true)}
          items={currentPosts}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </main>
  )
}

export default Blog
