import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {Card, CardContent, Grid2 as Grid, Button, TextField, CardHeader} from '@mui/material'
import { LoginContext } from '../context/LoginContext';

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('')
  const {loginState, setLoginState} = useContext(LoginContext)

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
        setLoginState(!loginState)
        location.state? navigate(location.state.from) : navigate("/")
      }      
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        margin: 'auto',
      }}
    >
      <Card
      sx={{
        width: 220, // Set the width
        height: 300, // Set the height
        padding: 1, // Optional padding
        boxShadow: 3, // Optional shadow for aesthetics
      }}
      >
        <CardHeader title="LOGIN" titleTypographyProps={{ align: 'center' }}/>
        <CardContent>
          <form onSubmit={handleLogin}>
            <TextField
                required
                id="outlined-required"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  mb: 2, // Optional padding
                }}
              />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2, // Optional padding
              }}
            />
            <Button fullWidth variant="contained" type="submit">Login</Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Login