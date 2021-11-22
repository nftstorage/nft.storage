import Link from 'next/link'
import React from 'react'
import Button from '../button'
import Tags from '../tags'

// custom styles from /styles/blog.css

/**
 * Blog Card Component
 *
 * @param {Object} props
 * @param {import('../types').PostMeta} props.post
 * @param {() => void} props.onClick
 * @returns {JSX.Element}
 */
export const Card = ({ post, onClick }) => (
  <Link href={`/blog/post/${post.slug}`}>
    {/* 👇 because next/link won't accept onClick */}
    <a
      onClick={onClick}
      className="blog-card grow shadow ba flex flex-column relative pointer bg-nsltblue ma5 mr3 h-card w-card"
    >
      <div className="ba absolute top-2 right-2 bg-white w-100 h-100">
        <img
          src={post.thumbnail}
          className="w-100 object-cover object-center"
          style={{ height: '50%' }}
        />
        <div className="pa5 flex flex-column justify-evenly">
          <div className="mb4">{post.tags && <Tags tags={post.tags} />}</div>
          <div className="mb2 overflow-hidden">
            <h1 className="chivo-bold f3 line-clamp-1">{post.title}</h1>
          </div>
          <p className="line-clamp-2 mb2 f5">{post.description}</p>
          <div className="flex">
            <span className="dark-gray f6 mr2">{post.author}</span>
            <span className="dark-gray f6">{post.date}</span>
          </div>
        </div>
      </div>
    </a>
  </Link>
)

/**
 * Blog Highlighted Card Component
 *
 * @param {Object} props
 * @param {import('../types').PostMeta} props.post
 * @param {() => void} props.onClick
 * @returns {JSX.Element}
 */
export const HighlightCard = ({ post, onClick }) => (
  <div className="blog-highlight-card flex h-card w-100 relative">
    <div className="highlight-info flex flex-column justify-between bg-nsltblue w-50 pa13">
      <div>
        <div className="mb4">{post.tags && <Tags tags={post.tags} />}</div>
        <h1 className="chivo-bold f1 line-clamp-1">{post.title}</h1>
        <p className="line-clamp-2 mw6 f3 mb2">{post.description}</p>
        <div className="flex">
          <span className="dark-gray f6 mr2">{post.author}</span>
          <span className="dark-gray f6">{post.date}</span>
        </div>
      </div>
      <Button
        href={{
          pathname: `/blog/post/${post.slug}`,
        }}
        wrapperClassName="mw4"
        className="mw4 pv3"
        id="upload"
        onClick={onClick}
        // tracking={{
        //   ui: countly.ui.FILES,
        //   action: 'Upload File',
        // }}
      >
        Read More
      </Button>
    </div>
    <img
      src={post.thumbnail}
      className="h-card highlight-img w-50 object-cover object-center"
    />
  </div>
)
