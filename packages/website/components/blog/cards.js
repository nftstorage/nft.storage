import Button from '../button'
import Link from 'next/link'
import React from 'react'
import Tags from '../tags'
import countly from '../../lib/countly'

// custom styles from /styles/blog.css

/**
 * Blog Card Component
 *
 * @param {Object} props
 * @param {import('../types').PostMeta} props.post
 * @returns {JSX.Element}
 */

export const Card = ({ post }) => (
  <Link href={`/blog/post/${post.slug}`}>
    <a className="bg-white blog-card w-card hologram card right interactive pointer">
      <img
        src={post.thumbnail}
        alt={`Banner for ${post.title}`}
        className="object-cover object-center w-100 card-thumb"
      />
      <div className="pa5 flex flex-column flex-auto">
        <div className="mb2">{post.tags && <Tags tags={post.tags} />}</div>
        <div className="overflow-hidden mb2">
          <h1 className="chicagoflf f4" title={post.title}>
            {post.title}
          </h1>
        </div>
        <p className="line-clamp-2 mb2 f5" title={post.description}>
          {post.description}
        </p>
        <div className="flex">
          <span className="darker-gray f6 mr2">{post.author}</span>
          <span className="darker-gray f6">{post.date}</span>
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
 * @returns {JSX.Element}
 */
export const HighlightCard = ({ post }) => (
  <div className="flex justify-center blog-highlight-card h-card w-100">
    <div className="relative flex w-100 mw9 blog-highlight-info-container">
      <div className="flex justify-between highlight-info flex-column w-50">
        <div className="highlight-card-container">
          <div className="highlight-card-text">
            <div className="mb3">{post.tags && <Tags tags={post.tags} />}</div>
            <h1
              className="chicagoflf f1 title"
              title={`Read More about"${post.title}"`}
            >
              <Link
                href={{
                  pathname: `/blog/post/${post.slug}`,
                }}
              >
                <a>{post.title}</a>
              </Link>
            </h1>
            <p className="mw6 f3 mb2 description" title={post.description}>
              {post.description}
            </p>
            <div className="flex">
              <span className="darker-gray f6 mr2">{post.author}</span>
              <span className="darker-gray f6">{post.date}</span>
            </div>
          </div>
          <div className="flex highlight-card-buttons ml2">
            <Button
              href={{
                pathname: `/blog/post/${post.slug}`,
              }}
              className="mw4 pv3 ph3 cta"
              id="read-more"
            >
              Read More
            </Button>
            <Button
              href={{
                pathname: '/blog/subscribe',
              }}
              className="mw4 ml4 pv3 cta"
              id="card-subscribe"
              tracking={{
                ui: countly.ui.BLOG_CARD,
                action: 'Subcribe',
              }}
            >
              Subscribe
            </Button>
          </div>
        </div>
        <img
          src={post.thumbnail}
          alt={`Banner for ${post.title}`}
          className="object-cover object-center h-card highlight-img w-50"
        />
      </div>
    </div>
  </div>
)
