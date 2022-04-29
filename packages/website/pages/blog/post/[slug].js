import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import Img from '../../../components/cloudflareImage'
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
    <div className="blog grow pb-24">
      <div className="post pb-24 flex flex-col w-full items-center">
        <Img
          src={post.meta.thumbnail}
          alt={`Banner for ${post.meta.title}`}
          className="max-h-auto h-[400px] md:max-h-[400px] object-cover object-center"
        />
        <div className="mt-14 max-w-2xl px-8">
          <div className="mb-8">
            <div className="flex flex-col mb-8 justify-between items-center">
              <div className="flex justify-between items-end w-full">
                <div className="flex">
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
                  className="items-center h-8"
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
            <h1 className="chicagoflf text-4xl mb-16 mt-2">
              {post.meta.title}
            </h1>
            {post.meta?.tags ? (
              <div className="mb-4">
                <Tags tags={post.meta.tags} />
              </div>
            ) : (
              <div></div>
            )}
            <p className="mb-2">{post.meta.description}</p>
            <div className="flex mb-16">
              <span className="darker-gray text-sm mr-2">
                {post.meta.author}
              </span>
              <span className="darker-gray text-sm">{post.meta.date}</span>
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
