export default function HashLink ({ id, children }) {
  return (
    <a name={id} href={`#${id}`} className='relative hide-child no-underline color-inherit'>
      <span className='absolute left--2 child'>#</span>
      {children}
    </a>
  )
}
