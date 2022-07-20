import Button from '../button'
import React from 'react'
import Tags from '../tags'
import countly from '../../lib/countly'
import Link from '../link'
import Img from '../cloudflareImage'

// custom styles from /styles/blog.css

/**
 * Blog Card Component
 *
 * @param {Object} props
 * @param {import('../types').PostMeta} props.post
 * @returns {JSX.Element}
 */

export const Card = ({ post }) => (
  <Link
    href={`/blog/post/${post.slug}`}
    className="bg-white justify-self-center w-card hologram card right interactive cursor-pointer"
  >
    <Img
      src={post.thumbnail}
      alt={`Banner for ${post.title}`}
      className="object-cover object-center w-full card-thumb aspect-video"
    />
    <div className="p-5 flex flex-col flex-auto">
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
        <span className="darker-gray text-sm mr-2 block sm:inline-block">
          {post.author}
        </span>
        <span className="darker-gray text-sm block sm:inline-block">
          {post.date}
        </span>
      </div>
    </div>
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
  <div className="flex justify-center bg-ltblue min-h-[400px] w-full">
    <div className="flex relative w-full max-w-7xl px-6 sm:px-16">
      <div className="flex border-y border-black w-full">
        <div className="flex justify-between flex-row flex-1 w-1/2">
          <div className="flex flex-col justify-between h-full z-10 py-7">
            <div className="highlight-card-text">
              <div className="mb-4">
                {post.tags && <Tags tags={post.tags} />}
              </div>
              <h1
                className="chicagoflf text-5xl title"
                title={`Read More about"${post.title}"`}
              >
                <Link
                  href={{
                    pathname: `/blog/post/${post.slug}`,
                  }}
                >
                  <a className="hover:underline">{post.title}</a>
                </Link>
              </h1>
              <p
                className="max-w-lg text-base sm:text-xl line-clamp-2 mt-2 mb-4"
                title={post.description}
              >
                {post.description}
              </p>
              <div className="flex flex-wrap">
                <span className="darker-gray text-sm mr-2">{post.author}</span>
                <span className="darker-gray text-sm">{post.date}</span>
              </div>
            </div>
            <div className="flex ml-2 mt-4">
              <Button
                href={{
                  pathname: `/blog/post/${post.slug}`,
                }}
                className="mw4 py-4 px-4 w-[130px] sm:mt-0"
                id="blog-highlight-read-more"
              >
                Read More
              </Button>
              <Button
                href={{
                  pathname: '/blog/subscribe',
                }}
                className="mw4 ml-8 py-4 w-[130px] mt-4 sm:ml-4 sm:mt-0"
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
            className="object-cover object-center highlight-img w-1/2"
          />
        </div>
      </div>
    </div>
  </div>
)
