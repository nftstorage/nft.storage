import Link from 'next/link'

export default function Button({
  wrapperClassName,
  className,
  onClick,
  href,
  type = 'button',
  children,
  disable = false,
}) {
  wrapperClassName = `dib bg-nsgray ba b--black grow ${
    wrapperClassName ?? ''
  }`.trim()
  const wrapperStyle = { minWidth: '8rem' }
  className = `button-reset relative w-100 ba b--black pv2 ph3 chicagoflf f5 pointer bg-white ${
    className ?? ''
  }`.trim()
  const btnStyle = { top: 3, left: 3 }
  const btn = (
    <button
      type={type}
      className={className}
      style={btnStyle}
      onClick={onClick}
      disabled={disable}
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
