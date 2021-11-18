import fs from 'fs'
import matter from 'gray-matter'
import { FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi'
import SocialLink from '../../../components/social-link'
import Tags from '../../../components/tags'
import Markdown from '../../../components/markdown'

/**
 * Blog Article Page
 *
 * @param {Object} props
 * @param {import('../../../components/types').Article} props.article
 * @returns {JSX.Element}
 */
const Article = ({ article }) => {
  return (
    <div className="blog min-h-screen pb24">
      <div className="article pb24 flex flex-column w-100 items-center">
        <img src={article.meta.thumbnail} className="h-card w-100 object-cover object-center" />
        <div className="mt14 mw7 ph8">
          <div className="article-meta mb4">
            <div className="flex mb5 justify-between items-center">
              {article.meta?.tags ? <Tags tags={article.meta.tags} /> : <div></div>}
              <div className="flex">
                <SocialLink href="https://twitter.com/nft_storage" Icon={FiTwitter} />
                <SocialLink href="/" Icon={FiLinkedin} />
                <SocialLink href="/" Icon={FiFacebook} />
              </div>
            </div>
            <h1 className="chivo-bold f2 mb2">{article.meta.title}</h1>
            <p className="mb5">{article.meta.description}</p>
            <div className="flex mb8">
              <span className="dark-gray f6 mr2">{article.meta.author}</span>
              <span className="dark-gray f6">{article.meta.date}</span>
            </div>
          </div>
          <Markdown content={article.content} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params

  const content = fs.readFileSync(`all-blogs/${slug}.md`).toString()

  const info = matter(content)

  const article = {
    meta: {
      ...info.data,
      slug,
    },
    content: info.content,
  }

  return {
    props: {
      article: article,
    },
  }
}

export async function getStaticPaths() {
  const files = fs.readdirSync('all-blogs')
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

export default Article
