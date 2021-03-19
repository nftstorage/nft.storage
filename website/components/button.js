export default function Button({
  wrapperClassName,
  className,
  href,
  type = 'button',
  children,
}) {
  wrapperClassName = `dib bg-nsgray ba b--black grow ${
    wrapperClassName ?? ''
  }`.trim()
  const wrapperStyle = { minWidth: '12rem' }
  className = `button-reset relative w-100 ba b--black pv2 ph3 chicagoflf f5 pointer bg-white ${
    className ?? ''
  }`.trim()
  const btnStyle = { top: 3, left: 3 }
  const btn = (
    <button type={type} className={className} style={btnStyle}>
      {children}
    </button>
  )
  return href ? (
    <a href={href} className={wrapperClassName} style={wrapperStyle}>
      {btn}
    </a>
  ) : (
    <div className={wrapperClassName} style={wrapperStyle}>
      {btn}
    </div>
  )
}
