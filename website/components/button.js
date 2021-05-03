import Link from 'next/link'
import clsx from 'clsx'

/**
 * @typedef {Object} ButtonProps
 * @prop {string} [wrapperClassName]
 * @prop {string} [className]
 * @prop { import('react').MouseEventHandler<HTMLButtonElement> } [onClick]
 * @prop {string} [href]
 * @prop {import('react').ButtonHTMLAttributes<HTMLButtonElement>["type"]} [type]
 * @prop {import('react').ReactChildren | string} children
 * @prop {boolean} [disabled]
 */

/**
 *
 * @param {ButtonProps} param0
 * @returns
 */
export default function Button({
  wrapperClassName,
  className,
  onClick,
  href,
  type = 'button',
  children,
  disabled = false,
}) {
  wrapperClassName = clsx(
    'dib',
    'bg-nsgray',
    'ba',
    'b-black',
    'grow',
    wrapperClassName
  )
  const wrapperStyle = { minWidth: '8rem' }
  const btnStyle = { top: 3, left: 3 }
  const btn = (
    <button
      type={type}
      className={clsx(
        'button-reset',
        'relative',
        'w-100',
        'ba',
        'b--black',
        'pv2',
        'ph3',
        'chicagoflf',
        'f5',
        'pointer',
        'bg-white',
        className
      )}
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
  return href ? (
    <Link href={href}>
      <a className={wrapperClassName} style={wrapperStyle}>
        {btn}
      </a>
    </Link>
  ) : (
    <div className={wrapperClassName} style={wrapperStyle}>
      {btn}
    </div>
  )
}
