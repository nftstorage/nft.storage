import Link from 'next/link'
import Button from '../button'
import Tags from '../tags'

// custom styles from /styles/blog.css

/**
 * Blog Card Component
 *
 * @param {Object} props
 * @param {import('../types').ArticleMeta} props.article
 * @returns {JSX.Element}
 */
export const Card = ({ article }) => (
  <Link href={`/article/${article.slug}`}>
    <div className="blog-card ba flex flex-column relative pointer bg-nsltblue ma5 h-card w-card">
      <div className="ba absolute top-2 right-2 bg-white w-100 h-100">
        <img
          src={article.thumbnail}
          className="w-100 object-cover object-center"
          style={{ height: '50%' }}
        />
        <div className="pa5 flex flex-column justify-evenly">
          <div className="mb4">
            {article.tags && <Tags tags={article.tags} />}
          </div>
          <div className="mb2 overflow-hidden">
            <h1 className="chivo-bold f3 line-clamp-1">{article.title}</h1>
          </div>
          <p className="line-clamp-2 mb2 f5">{article.description}</p>
          <div className="flex">
            <span className="dark-gray f6 mr2">{article.author}</span>
            <span className="dark-gray f6">{article.date}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
)

/**
 * Blog Highlighted Card Component
 *
 * @param {Object} props
 * @param {import('../types').ArticleMeta} props.article
 * @returns {JSX.Element}
 */
export const HighlightCard = ({ article }) => (
  <div className="blog-highlight-card flex h-card w-100 bt bb">
    <div className="flex flex-column justify-between bg-nsltblue w-50 pa8">
      <div>
        <div className="mb4">
          {article.tags && <Tags tags={article.tags} />}
        </div>
        <h1 className="chivo-bold f1 line-clamp-1">{article.title}</h1>
        <p className="line-clamp-2 mw6 f3 mb2">{article.description}</p>
        <div className="flex">
          <span className="dark-gray f6 mr2">{article.author}</span>
          <span className="dark-gray f6">{article.date}</span>
        </div>
      </div>
      <Button
        href={{
          pathname: `/article/${article.slug}`,
        }}
        wrapperClassName="mw4"
        className="mw4 pv3"
        id="upload"
        // tracking={{
        //   ui: countly.ui.FILES,
        //   action: 'Upload File',
        // }}
      >
        Read More
      </Button>
    </div>
    <img
      src={article.thumbnail}
      className="h-card w-50 object-cover object-center"
    />
  </div>
)
