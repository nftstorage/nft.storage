export default function Box ({ bg = 'nsgray', wrapperClassName, className, children }) {
  wrapperClassName = `dib bg-${bg} ba b--black ${wrapperClassName ?? ''}`.trim()
  className = `dib relative w-100 pv1 ph3 chicagoflf f3 white bg-nspeach ba b--black ${className ?? ''}`.trim()
  return (
    <div className={wrapperClassName}>
      <div className={className} style={{ top: 3, right: 3 }}>Step {children}</div>
    </div>
  )
}
