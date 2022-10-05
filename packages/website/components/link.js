import React from 'react'
import Link from 'next/link'

/**
 * @param {Object} props
 * @param {any} props.href
 * @param {string} [props.className]
 * @param {number} [props.tabIndex]
 * @param {string} [props.id]
 * @param {string} [props.target]
 * @param {React.MouseEventHandler} [props.onClick]
 * @param {React.ReactNode | string} props.children
 * @returns {JSX.Element}
 */
const WrappedLink = ({
  tabIndex = 0,
  href = '',
  children,
  target,
  ...otherProps
}) => (
  <Link href={href} {...otherProps} passHref={target === '_blank'}>
    <a
      href={href.pathname || href}
      {...otherProps}
      target={target}
      tabIndex={tabIndex}
      onClick={otherProps.onClick}
    >
      {children}
    </a>
  </Link>
)

export default WrappedLink
