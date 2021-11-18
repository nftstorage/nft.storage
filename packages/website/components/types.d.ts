export interface ArticleMeta {
  title: string
  slug: string
  description: string
  thumbnail: string
  date: string
  author: string
  tags?: string[]
}

export interface Article {
  meta: ArticleMeta
  content: string
}

export interface Tag {
  label: string
  onClick?: () => void
}

export interface LayoutProps {
  callback?: boolean
  needsUser: boolean
  redirectTo?: string
  redirectIfFound?: boolean
  title?: string
  description?: string
  navBgColor?: string
  articles?: ArticleMeta[]
}

export interface LayoutChildrenProps {
  user?: {
    issuer: string | null
    publicAddress: string | null
    email: string | null
  }
}
