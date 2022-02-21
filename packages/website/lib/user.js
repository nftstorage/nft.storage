import { createContext, useContext } from 'react'

/**  @type {any} **/
export const UserContext = createContext(null)

/**  @type {any} **/
export const useUser = () => {
  return useContext(UserContext)
}
