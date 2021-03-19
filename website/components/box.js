export default function Box({
  bgColor = 'white',
  borderColor = 'nsgray',
  wrapperClassName,
  className,
  children,
}) {
  wrapperClassName = `bg-${borderColor} ba b--black ${
    wrapperClassName ?? ''
  }`.trim()
  className = `relative w-100 h-100 pa3 bg-${bgColor} ba b--black ${
    className ?? ''
  }`.trim()
  return (
    <div className={wrapperClassName}>
      <div className={className} style={{ top: 10, right: 8 }}>
        {children}
      </div>
    </div>
  )
}
