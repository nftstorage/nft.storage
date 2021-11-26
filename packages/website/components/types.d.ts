export interface LayoutProps {
  callback?: boolean
  needsUser: boolean
  redirectTo?: string
  redirectIfFound?: boolean
  title?: string
  description?: string
  navBgColor?: string
  logos?: string[]
}

export interface LayoutChildrenProps {
  user?: {
    issuer: string | null
    publicAddress: string | null
    email: string | null
  }
}
