import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

/**
 * @typedef {Object} ButtonProps
 * @prop {string} [id]
 * @prop {string} [wrapperClassName]
 * @prop {string} [className]
 * @prop { React.MouseEventHandler<HTMLButtonElement> } [onClick]
 * @prop {string | any} [href]
 * @prop {React.ButtonHTMLAttributes<HTMLButtonElement>["type"]} [type]
 * @prop {React.ReactChildren | string | React.ReactElement} children
 * @prop {boolean} [disabled]
 * @prop {boolean} [small]
 */

/**
 *
 * @param {ButtonProps} param0
 * @returns
 */
export default function Button({
  id,
  wrapperClassName,
  className,
  onClick,
  href,
  type = 'button',
  children,
  disabled = false,
  small = false,
}) {
  wrapperClassName = clsx(
    'dib',
    'bg-nsgray',
    'ba',
    'b-black',
    { grow: !disabled, 'o-50': disabled },
    wrapperClassName
  )
  const wrapperStyle = { minWidth: small ? '0' : '8rem' }
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
        { pointer: !disabled },
        'bg-white',
        className
      )}
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
      id={id}
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
