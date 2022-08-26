import React, { useCallback } from 'react'

import Link from './link'
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
 * @prop {string} [className]
 * @prop {string} [label]
 * @prop { React.MouseEventHandler<HTMLButtonElement> } [onClick]
 * @prop {string | any} [href]
 * @prop {React.ButtonHTMLAttributes<HTMLButtonElement>["type"]} [type]
 * @prop {React.ReactChildren | string | React.ReactElement} children
 * @prop {boolean} [disabled]
 * @prop {boolean} [small]
 * @prop {boolean} [hologram]
 * @prop {string} [id]
 * @prop {string} [title]
 * @prop {'dark' | 'light' | 'caution' | 'tag' } [variant] Extend the visuals in button.css
 * @prop {TrackingProp} [tracking] Tracking data to send to countly on button click
 * @prop {boolean} [unstyled]
 */

/**
 *
 * @param {ButtonProps} param0
 * @returns
 */
export default function Button({
  id,
  className,
  onClick,
  href,
  type = 'button',
  children,
  disabled = false,
  small = false,
  variant = 'light',
  hologram = true,
  tracking,
  unstyled,
  ...props
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

  let btnClasses = clsx('btn button-reset select-none text-black', className)

  if (!unstyled) {
    btnClasses = clsx(
      btnClasses,
      'py-2 px-3',
      variant !== 'tag' && hologram && 'hologram chicagoflf',
      small && 'small',
      disabled ? 'o-60' : 'interactive',
      variant
    )
  }

  const btnProps = {
    id,
    className: btnClasses,
    onClick: onClickHandler,
    disabled: !!disabled,
  }

  const optionalProps = {}
  optionalProps.role = href ? 'link' : 'button'

  let btn = null

  if (typeof children === 'string') {
    optionalProps.type = type
    btn = (
      <button {...btnProps} {...optionalProps} {...props}>
        {children}
      </button>
    )
  } else {
    btn = (
      <div {...btnProps} {...optionalProps} {...props}>
        {children}
      </div>
    )
  }

  return href ? <Link href={href}>{btn}</Link> : btn
}
