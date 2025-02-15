import { useState, createContext } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
  const [loginState, setLoginState] = useState(false)
  
  return (
    <LoginContext.Provider value={{loginState, setLoginState}}>
      {children}
    </LoginContext.Provider>
  ) 
}