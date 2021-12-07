import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import SocialLink from '../../../components/social-link'
import Tags from '../../../components/tags'
import fs from 'fs'
import matter from 'gray-matter'
import Button from '../../../components/button'
import countly from '../../../lib/countly'

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params

  const fileText = fs.readFileSync(`posts/${slug}.mdx`).toString()

  const { data, content } = matter(fileText)

  const post = {
    meta: {
      ...data,
      slug,
    },
    content: await serialize(content),
  }

  return {
    props: {
      post: post,
      title: data.title,
      image: data.thumbnail,
      description: data.description,
      navBgColor: 'bg-nsltblue',
      altLogo: true,
      needsUser: false,
    },
  }
}

/**
 * Blog Post Page
 *
 * @param {Object} props
 * @param {import('../../../components/types').Post} props.post
 * @returns {JSX.Element}
 */
const Post = ({ post }) => {
  const SHARE_TEXT = 'Store NFTs for free!'
  // localhost will not work as currentUrl with fb or linkedin
  const [currentUrl, setCurrentUrl] = useState('')
  useEffect(() => setCurrentUrl(window.location.href), [])
  const twitterShareLink = new URL(`https://twitter.com/intent/tweet`)
  const twitterParams = {
    url: currentUrl,
    text: SHARE_TEXT,
    hashtags: 'NFTs,web3',
  }
  const facebookShareLink = new URL(
    `https://www.facebook.com/sharer/sharer.php`
  )
  const facebookParams = {
    u: currentUrl,
    quote: SHARE_TEXT,
    hashtag: '#NFTs',
  }
  const linkedinShareLink = new URL(
    'https://www.linkedin.com/sharing/share-offsite'
  )
  const linkedinParams = { url: currentUrl }

  return (
    <div className="blog min-vh-100 pb24">
      <div className="post pb24 flex flex-column w-100 items-center">
        <img
          src={post.meta.thumbnail}
          alt={`Banner for ${post.meta.title}`}
          className="h-card w-100 object-cover object-top"
        />
        <div className="mt14 mw7 ph8">
          <div className="post-meta mb4">
            <div className="flex flex-column mb5 justify-between items-center">
              <div className="flex justify-between items-end w-100">
                <div className="social-links flex">
                  <SocialLink
                    url={twitterShareLink}
                    params={twitterParams}
                    Icon={FiTwitter}
                  />
                  <SocialLink
                    url={facebookShareLink}
                    Icon={FiFacebook}
                    params={facebookParams}
                  />
                  <SocialLink
                    url={linkedinShareLink}
                    params={linkedinParams}
                    Icon={FiLinkedin}
                  />
                </div>
                <Button
                  href={{
                    pathname: '/blog/subscribe',
                  }}
                  unstyled
                  className="mw4 ph3 interactive hologram bg-white chicagoflf post-subscribe-button items-center"
                  id="post-subscribe"
                  tracking={{
                    ui: countly.ui.BLOG_POST,
                    action: 'Subcribe',
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <h1 className="chicagoflf f2 mb7 mt2">{post.meta.title}</h1>
            {post.meta?.tags ? (
              <div className="mb3">
                <Tags tags={post.meta.tags} />
              </div>
            ) : (
              <div></div>
            )}
            <p className="mb2">{post.meta.description}</p>
            <div className="flex mb7">
              <span className="darker-gray f6 mr2">{post.meta.author}</span>
              <span className="darker-gray f6">{post.meta.date}</span>
            </div>
          </div>
          <MDXRemote {...post.content} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts')
  const paths = files.map((file) => ({
    params: {
      slug: file.split('.')[0],
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Post
