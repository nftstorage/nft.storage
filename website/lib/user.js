import { createContext, useContext, useState, useEffect } from 'react'
import { isLoggedIn } from './magic.js'
const UserContext = createContext()

export function AppWrapper({ children }) {
  const [user, setUser] = useState()
  const [isLoading, setLoading] = useState(true)
  useEffect(async () => {
    const user = await isLoggedIn()
    setUser(user)
    setLoading(false)
  }, [])

  return (
    <UserContext.Provider value={[user, setUser, isLoading]}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
