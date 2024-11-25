import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.detail)
      } else{
        localStorage.setItem("refreshToken", data["refresh"])
        localStorage.setItem("accessToken", data["access"])
        location.state? navigate(location.state.from) : navigate("/")
      }      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
      </div>
      <div>
        <label>Password:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login