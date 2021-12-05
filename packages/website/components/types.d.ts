import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface PostMeta {
  title: string
  slug: string
  description: string
  thumbnail: string
  date: string
  author: string
  tags?: string[]
}

export interface Post {
  meta: PostMeta
  content: MDXRemoteSerializeResult<Record<string, unknown>>
}

export interface Tag {
  label: string
  onClick?: () => void
  selected?: boolean
}

export interface LayoutProps {
  callback?: boolean
  needsUser: boolean
  redirectTo?: string
  redirectIfFound?: boolean
  title?: string
  description?: string
  image?: string
  navBgColor?: string
  altLogo?: boolean
  withSubscribe?: boolean
  posts?: PostMeta[]
  logos?: string[]
}

export interface LayoutChildrenProps {
  user?: {
    issuer: string | null
    publicAddress: string | null
    email: string | null
  }
}
