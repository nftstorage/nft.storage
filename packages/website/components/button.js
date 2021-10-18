import React, { useCallback } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import countly from '../lib/countly'

/**
 * @typedef {Object} TrackingProp
 * @prop {string} ui UI section id. One of countly.ui.
 * @prop {string} [action] Action id. used to uniquely identify an action within a ui section.
 * @prop {string} [event] Custom event name to be used instead of the default CTA_LINK_CLICK.
 * @prop {Object} [data] Extra data to send to countly.
 *
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
 * @prop {string} [id]
 * @prop {TrackingProp} [tracking] Tracking data to send to countly on button click
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
  tracking,
}) {
  const onClickHandler = useCallback(
    (event) => {
      tracking &&
        countly.trackEvent(tracking.event || countly.events.CTA_LINK_CLICK, {
          ui: tracking.ui,
          action: tracking.action,
          link:
            typeof href === 'string'
              ? href
              : (href?.pathname || '') + (href?.hash || ''),
          ...(tracking.data || {}),
        })
      onClick && onClick(event)
    },
    [tracking, onClick, href]
  )

  wrapperClassName = clsx(
    'dib',
    'bg-nsgray',
    'ba',
    'b--black',
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
      onClick={onClickHandler}
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
