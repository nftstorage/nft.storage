export default function Step({ wrapperClassName, className, children }) {
  wrapperClassName = `dib bg-white ba b--black ${wrapperClassName ?? ''}`.trim()
  className = `dib relative w-100 pv1 ph3 chicagoflf f3 white bg-black ${
    className ?? ''
  }`.trim()
  return (
    <div className={wrapperClassName}>
      <div className={className} style={{ top: 3, right: 3 }}>
        Step {children}
      </div>
    </div>
  )
}
