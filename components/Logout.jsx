import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext } from '../context/LoginContext';
function Logout() {
  const navigate = useNavigate()  
  const {loginState, setLoginState} = useContext(LoginContext)
  
  useEffect(() => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setLoginState(!loginState)
    navigate("/")
  }, []);
  return (
    <>
    </>
  )
}

export default Logout