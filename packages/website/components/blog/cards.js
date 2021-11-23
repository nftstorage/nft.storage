import Button from '../button'
import Link from 'next/link'
import React from 'react'
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
      className="blog-card h-card w-card bg-white hologram card right interactive"
    >
      <img
        src={post.thumbnail}
        alt={`Banner for ${post.title}`}
        className="w-100 object-cover object-center"
        style={{ height: '50%' }}
      />
      <div className="pa5 flex flex-column justify-evenly">
        <div className="mb4">{post.tags && <Tags tags={post.tags} />}</div>
        <div className="mb2 overflow-hidden">
          <h1 className="f3 line-clamp-1 chicagoflf">{post.title}</h1>
        </div>
        <p className="line-clamp-2 mb2 f5">{post.description}</p>
        <div className="flex">
          <span className="dark-gray f6 mr2">{post.author}</span>
          <span className="dark-gray f6">{post.date}</span>
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
  <div className="blog-highlight-card flex w-100 relative">
    <div className="highlight-info bg-nsltblue w-50 pa13">
      <div className="highlight-info-content">
        <div className="mb4">
          {post.tags && <Tags tags={post.tags} />}&nbsp;
        </div>
        <h1 className="f1 line-clamp-1 chicagoflf">{post.title}</h1>
        <p className="line-clamp-2 mw6 f3 mb2">{post.description}</p>
        <div className="flex mb2">
          <span className="dark-gray f6 mr2">{post.author}</span>
          <span className="dark-gray f6">{post.date}</span>
        </div>
        <Button
          href={{
            pathname: `/blog/post/${post.slug}`,
          }}
          unstyled
          wrapperClassName="relative mw4"
          className="hologram bg-white interactive ph4 pv3 chicagoflf mt5"
          id="upload"
          onClick={onClick}
        >
          Read More
        </Button>
      </div>
    </div>
    <img
      src={post.thumbnail}
      alt={`Banner for ${post.title}`}
      className="h-card highlight-img w-50 object-cover object-center"
    />
  </div>
)
