export default function Button ({ wrapperClassName, className, href, children }) {
  wrapperClassName = `dib bg-nsgray ba b--black grow ${wrapperClassName ?? ''}`.trim()
  className = `button-reset relative w-100 ba b--black pv2 ph3 chicagoflf f5 pointer bg-white ${className ?? ''}`.trim()
  return (
    <a href={href ?? '#'} className={wrapperClassName} style={{ minWidth: '12rem' }}>
      <button className={className} style={{ top: 3, left: 3 }}>{children}</button>
    </a>
  )
}
