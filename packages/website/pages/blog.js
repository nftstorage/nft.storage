import { useEffect, useState } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import ReactPaginate from 'react-paginate'
import { Card, HighlightCard } from '../components/blog/cards'

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
      articles: articles,
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
 * @param {import('../components/types').ArticleMeta[]} props.items
 * @param {number} props.itemsPerPage
 * @returns {JSX.Element}
 */
const PaginatedItems = ({ items, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    // @ts-ignore - TODO fix type
    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  /**
   * @param {Record<string, any>} event
   */
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
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
 * @param {import('../components/types').ArticleMeta[]} props.currentItems
 */
const Items = ({ currentItems }) => (
  <div className="flex justify-evenly flex-wrap pt4">
    {currentItems.map((article, i) => (
      <Card key={i} article={article} />
    ))}
  </div>
)

/**
 * Blog Page
 *
 * @param {Object} props
 * @param {import('../components/types').ArticleMeta[]} props.articles
 */
const Blog = ({ articles }) => {
  const first = articles[0]
  const [, ...rest] = articles
  return (
    <main className="blog bg-nspeach">
      <div className="flex flex-column justify-center">
        <HighlightCard article={first} />
        <PaginatedItems items={rest} itemsPerPage={9} />
      </div>
    </main>
  )
}

export default Blog
