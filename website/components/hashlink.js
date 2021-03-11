export default function HashLink ({ id, children }) {
  return (
    <a name={id} href={`#${id}`} className='relative hide-child no-underline color-inherit'>
      <span className='absolute child' style={{ left: '-0.85em' }}>#</span>
      {children}
    </a>
  )
}
