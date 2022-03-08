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
    <a className="bg-white blog-card w-card hologram card right interactive cursor-pointer">
      <img
        src={post.thumbnail}
        alt={`Banner for ${post.title}`}
        className="object-cover object-center w-full card-thumb"
      />
      <div className="p-16 flex flex-col flex-auto">
        <div className="mb-2">{post.tags && <Tags tags={post.tags} />}</div>
        <div className="overflow-hidden mb-2">
          <h1 className="chicagoflf text-xl" title={post.title}>
            {post.title}
          </h1>
        </div>
        <p className="line-clamp-2 mb-2 text-base" title={post.description}>
          {post.description}
        </p>
        <div className="blog-card-meta">
          <span className="darker-gray text-sm mr-2">{post.author}</span>
          <span className="darker-gray text-sm">{post.date}</span>
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
  <div className="flex justify-center blog-highlight-card w-full">
    <div className="relative flex w-full max-w-7xl blog-highlight-info-container">
      <div className="flex justify-between highlight-info flex-col w-50">
        <div className="highlight-card-container">
          <div className="highlight-card-text">
            <div className="mb-4">{post.tags && <Tags tags={post.tags} />}</div>
            <h1
              className="chicagoflf text-5xl title"
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
            <p
              className="max-w-lg text-base sm:text-xl mb-2 description"
              title={post.description}
            >
              {post.description}
            </p>
            <div className="flex">
              <span className="darker-gray text-sm mr-2">{post.author}</span>
              <span className="darker-gray text-sm">{post.date}</span>
            </div>
          </div>
          <div className="flex highlight-card-buttons ml-2 mt-4">
            <Button
              href={{
                pathname: `/blog/post/${post.slug}`,
              }}
              className="mw4 py-4 px-4 cta"
              id="blog-highlight-read-more"
            >
              Read More
            </Button>
            <Button
              href={{
                pathname: '/blog/subscribe',
              }}
              className="mw4 ml-8 py-4 cta"
              id="blog-highlight-subscribe"
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
          className="object-cover object-center highlight-img w-50"
        />
      </div>
    </div>
  </div>
)
