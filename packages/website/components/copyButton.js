import Copy from '../icons/copy'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

/**
 * @typedef {Object} CopyButtonProps
 * @prop {string | undefined} [text]
 * @prop {string} [title]
 * @prop {boolean} [asLink]
 * @prop {string} [popupContent]
 * @prop {JSX.Element} [children]
 */

/**
 * @param {CopyButtonProps} props
 */
function CopyButton({
  text,
  title,
  asLink = false,
  popupContent,
  children,
  ...props
}) {
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
    if (text) {
      navigator.clipboard.writeText(text)
    }
    handlePopup()
  }

  const btnHtml = asLink ? (
    <button onClick={handleCopy} title={title} {...props}>
      {popup ? popupContent : children}
    </button>
  ) : (
    <>
      {children}
      <button
        onClick={handleCopy}
        title={title}
        className="icon-button transparent align-middle"
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
        <Copy tab-index={-1} className="ml-1" />
      </button>
    </>
  )

  return btnHtml
}

export default CopyButton
