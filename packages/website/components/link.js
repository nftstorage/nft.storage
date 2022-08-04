import React from 'react'
import Link from 'next/link'

/**
 * @param {Object} props
 * @param {object | string} props.href
 * @param {string} [props.className]
 * @param {number} [props.tabIndex]
 * @param {string} [props.id]
 * @param {React.MouseEventHandler} [props.onClick]
 * @param {React.ReactNode | string} props.children
 * @returns {JSX.Element}
 */
const WrappedLink = ({ tabIndex = 0, href = '', children, ...otherProps }) => (
  <Link href={href} {...otherProps}>
    <a
      href="replace"
      {...otherProps}
      tabIndex={tabIndex}
      onClick={otherProps.onClick}
    >
      {children}
    </a>
  </Link>
)

export default WrappedLink
