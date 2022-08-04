import Link from '../components/link'
import HashLink from '../components/hashlink.js'
import InlineCode from '../components/inline-code.js'
import faqContent from '../lib/faqContent'

/**
 * @param {string} title
 * @returns {string}
 */
const hashify = (title) =>
  title
    .substring(0, title.length - 1)
    .toLowerCase()
    .replace(/\s|\./g, '-')

/**
 * Static Props
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export const getStaticProps = () => ({
  props: {
    title: 'FAQ - NFT Storage',
    description: 'NFT.Storage FAQ',
    navBgColor: 'bg-nsforest',
    needsUser: false,
  },
})

const faqs = [
  {
    question: 'What is the long-term vision for NFT.Storage?',
    content: faqContent.longTermVision,
  },
  {
    question: 'How long will data be stored on NFT.Storage?',
    content: faqContent.dataStorageLength,
  },
  {
    question: 'What are the upload or file size restrictions on NFT.Storage?',
    content: faqContent.nftSizeRestrictions,
  },
  {
    question: 'Where can I learn more about NFT best practices?',
    content: faqContent.nftBestPractices,
  },
  {
    question: 'Who can access the data I store on NFT.Storage?',
    content: faqContent.whoHasAccess,
  },
  {
    question: 'Can I delete my data on NFT.Storage?',
    content: faqContent.dataDeletion,
  },
  {
    question:
      'I tried using an HTTP gateway to retrieve my content from IPFS but am receiving an HTTP error. Does this mean my content was not stored successfully on NFT.Storage?',
    content: faqContent.httpGatewayError,
  },
  {
    question: 'How is NFT.Storage free to use?',
    content: faqContent.howIsNftStorageFree,
  },
  {
    question: 'Is there a limit on numbers of files in a directory?',
    content: faqContent.filesLimit,
  },
  {
    question: 'Why am I seeing syntax error unexpected token?',
    error: `SyntaxError: Unexpected token '.'`,
    content: faqContent.unexpectedToken,
  },
  {
    question:
      'Why am I seeing syntax error cannot use import statement outside a module?',
    error: 'SyntaxError: Cannot use import statement outside a module',
    content: faqContent.importStatementOutsideModule,
  },
  {
    question: `Why don't you support versions of Node prior to v14?`,
    content: faqContent.nodeSupport,
  },
  {
    question: 'How can I upload metadata with an existing HTTP image url?',
    content: faqContent.httpUrls,
  },
  {
    question: 'Skypack issues or Webpack 4 not bundling?',
    content: faqContent.webpack4,
  },
]

const TOC = () => (
  <div className="flex flex-col py-1 max-w-3xl">
    {faqs.map((faq, index) => (
      <Link
        href={`/faq/#${hashify(faq.question)}`}
        key={`faq-item${index}`}
        className="text-white my-2 underline"
      >
        {faq.error ? `Why am I seeing: ${faq.error}` : faq.question}
      </Link>
    ))}
  </div>
)

/**
 * @param {Object} props
 * @param {number} [props.limit]
 */
export const FAQ = ({ limit = faqs.length }) => {
  const items = limit ? faqs.slice(0, limit) : faqs
  return (
    <>
      {items.slice(0, limit).map((faq, index) => (
        <div key={`faq-item${index}`} className="mb-16">
          <h2 className="chicagoflf text-white text-xl sm:text-2xl md:text-3xl">
            <HashLink id={hashify(faq.question)}>
              {faq.error ? (
                <>
                  Why am I seeing:&nbsp;
                  <InlineCode className="text-lg sm:text-xl md:text-2xl">
                    {faq.error}
                  </InlineCode>
                </>
              ) : (
                faq.question
              )}
            </HashLink>
          </h2>
          <div className="prose prose-invert max-w-none text-white my-2">
            {faq.content}
          </div>
        </div>
      ))}
    </>
  )
}

/**
 * FAQ Page
 *
 */
const Faq = () => (
  <main className="bg-nsforest grow">
    <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
      <h1 className="chicagoflf text-white my-8 flex-auto ">FAQ</h1>
      <div className="mb-16">
        <TOC />
      </div>
      <FAQ />
    </div>
  </main>
)

export default Faq
