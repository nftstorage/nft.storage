import ReactMarkdown from 'react-markdown'
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

/**
 * Tag Component
 *
 * @param {Object} props
 * @param {string} props.content
 * @returns {JSX.Element}
 */
const Markdown = ({ content }) => {
  const components = {
    /**
     * @param {any} props
     * todo FIX PROP TYPES
     */
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')

      return !inline && match ? (
        <SyntaxHighlighter
          style={materialLight}
          PreTag="div"
          language={match[1]}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}

export default Markdown
