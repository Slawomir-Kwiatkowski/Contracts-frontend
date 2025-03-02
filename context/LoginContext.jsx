import { useState, createContext } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({children}) => {
  const [loginState, setLoginState] = useState(true)
  
  return (
    <LoginContext.Provider value={{loginState, setLoginState}}>
      {children}
    </LoginContext.Provider>
  ) 
}