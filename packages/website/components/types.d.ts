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

interface RequestFormItem {
  label: string
  value: string
}

export type RequestForm = Array<RequestFormItem>
export interface Tags {
  tags: Tag[] | string[]
  className?: string
}

interface Logo {
  src: string
  alt: string
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
  logos?: Logo[]
}

export interface MagicUser {
  issuer: string | null
  publicAddress: string | null
  email: string | null
}

export interface UserTag {
  HasAccountRestriction?: boolean
  HasPsaAccess?: boolean
}

export interface TagProposal {
  HasPsaAccess?: boolean
}

export interface User extends MagicUser {
  tags: UserTag
  pendingTagProposals: TagProposal
}

export interface LayoutChildrenProps {
  user?: User | null
}
