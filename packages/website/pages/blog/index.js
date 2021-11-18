import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import matter from 'gray-matter'
import ReactPaginate from 'react-paginate'
import { Card, HighlightCard } from '../../components/blog/cards'
import Tags from '../../components/tags'
import { allTags } from '../../components/blog/constants'

export async function getStaticProps() {
  const files = fs.readdirSync('all-blogs')

  const articles = files.map(file => {
    const data = fs.readFileSync(`all-blogs/${file}`).toString()

    return {
      ...matter(data).data,
      slug: file.split('.')[0],
    }
  })

  return {
    props: {
      articles,
      title: 'FAQ - NFT Storage',
      navBgColor: 'bg-nspeach',
      needsUser: false,
    },
  }
}

/**
 * Pagination Component
 *
 * @param {Object} props
 * @param {import('../../components/types').ArticleMeta[]} props.items
 * @param {number} props.itemsPerPage
 * @returns {JSX.Element}
 */
const PaginatedItems = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(items)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  console.log('HERE ARE ITEMS')

  useEffect(() => {
    setCurrentItems(items.slice(0, itemsPerPage))
    updateOffset(0)
  }, [items, itemsPerPage])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    // @ts-ignore - TODO fix type
    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  /**
   * @param {number} newPage
   */
  const updateOffset = newPage => {
    const newOffset = (newPage * itemsPerPage) % items.length
    console.log(
      `User requested page number ${newPage}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  /**
   * @param {Record<string, any>} event
   */
  const handlePageClick = event => {
    updateOffset(event.selected)
  }

  return (
    <>
      {currentItems && <Items currentItems={currentItems} />}
      <div className="flex justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="NEXT"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="PREV"
          marginPagesDisplayed={5}
          // @ts-ignore
          renderOnZeroPageCount={null}
          containerClassName="rp-container"
          pageLinkClassName="page-button"
          previousLinkClassName="page-button"
          nextLinkClassName="page-button"
          activeLinkClassName="active-page-button"
          disabledLinkClassName="disabled-page-button"
        />
      </div>
    </>
  )
}

/**
 * Blog Cards
 *
 * @param {Object} props
 * @param {import('../../components/types').ArticleMeta[]} props.currentItems
 */
const Items = ({ currentItems }) => (
  <div className="flex justify-evenly flex-wrap pt2">
    {currentItems.map((article, i) => (
      <Card key={i} article={article} />
    ))}
  </div>
)

/**
 * Blog Page
 *
 * @param {Object} props
 * @param {import('../../components/types').ArticleMeta[]} props.articles
 */
const Blog = ({ articles }) => {
  const router = useRouter()
  const { page } = router.query
  const [, ...rest] = articles
  const [currentArticles, setCurrentArticles] = useState(rest)
  const [filters, setFilters] = useState(['all'])
  const first = articles[0]

  console.log('PAGE IS: ', page)

  useEffect(() => {
    console.log('filters:', filters)
    const filtered =
      filters[0] !== 'all'
        ? articles.filter(article => {
            return article.tags?.some(t => filters.includes(t))
          })
        : articles
    setCurrentArticles(filtered)
  }, [filters])

  /**
   *
   * @param {string} tag
   */
  const handleTagClick = tag =>
    setFilters(prev => {
      if (tag === 'all') return ['all']
      let newTags = prev.includes(tag)
        ? prev.filter(t => t.toLowerCase() !== tag)
        : [...prev, tag.toLowerCase()]
      newTags = newTags.filter(t => t.toLowerCase() !== 'all')
      return newTags.length > 0 ? newTags : ['all']
    })

  return (
    <main className="blog bg-nspeach">
      <div className="flex flex-column justify-center">
        <HighlightCard article={first} />
        <div className="button-tags-container mt4 flex ph13">
          <Tags
            tags={allTags.map(tag => {
              const normTag = tag.toLowerCase()
              return {
                label: normTag,
                onClick: () => handleTagClick(normTag),
              }
            })}
          />
          {/* current tags: {filters} */}
        </div>
        <PaginatedItems items={currentArticles} itemsPerPage={9} />
      </div>
    </main>
  )
}

export default Blog
