import { useState } from "react"
import {Card, CardContent, Grid2 as Grid, Button, TextField, CardHeader, Select, MenuItem, FormControl, InputLabel, OutlinedInput} from '@mui/material'

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [profile, setProfile] = useState("client")

    const [errorUsername, setErrorUsername] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")


    const handleRegister = async (e) => {
        e.preventDefault()

        setErrorUsername("")
        setErrorPassword("")
        setErrorEmail("")
        
        try {
            const res = await fetch('/api/user/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                    "profile": profile
                })
            })
            const data = await res.json()
            if (!res.ok) {
                data.username && setErrorUsername(data.username[0])
                data.password && setErrorPassword(data.password[0])
                data.email && setErrorEmail(data.email[0])
              } else {
                console.log("Account created. Activation message was sent on your email.")
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
        width: 250, // Set the width
        height: 450, // Set the height
        padding: 1, // Optional padding
        boxShadow: 3, // Optional shadow for aesthetics
      }}
      >
        <CardHeader title="Register" titleTypographyProps={{ align: 'center' }}/>
        <CardContent>
          <form onSubmit={handleRegister} margin="normal">
            <TextField
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  mb: 2, // Optional padding
                }}
              />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2, // Optional padding
              }}
            />
            <TextField
                required
                label="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 2, // Optional padding
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="my-select-label">Choose your profile</InputLabel>
                <Select
                  id="select"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  labelId="my-select-label"
                  input={<OutlinedInput notched label="Choose your profile!" />}
                  sx={{
                    mb: 2, // Optional padding
                  }}
                >
                  <MenuItem value="client" selected>Client</MenuItem>
                  <MenuItem value="contractor">Contractor</MenuItem>
                </Select>
              </FormControl>

            <Button fullWidth variant="contained" type="submit">Register</Button>
          </form>
        </CardContent>
      </Card>
    </Grid>



    // <form onSubmit={handleRegister}>
    //   <div>
    //     <label>Username:</label>
    //     <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     <label>{errorUsername}</label>
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     <label>{errorPassword}</label>
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     <label>{errorEmail}</label>
    //   </div>
    //   <div>
    //     <label id="profile-label">Choose your profile:</label>
    //     <select id="profile-select" 
    //       onChange={(e) => setProfile(e.target.value)}>
    //     <option value="client" selected>Client</option>
    //     <option value="contractor">Contractor</option>
    //     </select> 
    //   </div>
    //   <button type="submit">Register</button>
    // </form>
  )
}

export default Register