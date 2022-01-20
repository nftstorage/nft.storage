import copyToClipboard from 'copy-to-clipboard'
import Copy from '../icons/copy'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

/**
 * @typedef {Object} CopyButtonProps
 * @prop {string | undefined} [text]
 * @prop {string} [title]
 * @prop {string} [popupContent]
 * @prop {JSX.Element} [children]
 */

/**
 * @param {CopyButtonProps} props
 */
function CopyButton({ text, title, popupContent, children, ...props }) {
  const [popup, setPopupActive] = useState(false)
  /** @type [any, null | any] */
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    return () => {
      timer && clearTimeout(timer)
    }
  }, [timer])

  function handlePopup() {
    setPopupActive(true)
    const newTimer = setTimeout(() => {
      setPopupActive(false)
    }, 1500)

    setTimer(newTimer)
  }

  function handleCopy() {
    text && copyToClipboard(text)
    handlePopup()
  }

  return (
    <>
      {children}
      <button
        onClick={handleCopy}
        title={title}
        className="icon-button transparent v-mid mr2"
        {...props}
      >
        <span
          data-content={popupContent}
          className={clsx('popup', { active: popup })}
        />
        {popup && (
          <span className="sr-only" aria-live="assertive">
            {popupContent}
          </span>
        )}
        <Copy tab-index={-1} />
      </button>
    </>
  )
}

export default CopyButton
