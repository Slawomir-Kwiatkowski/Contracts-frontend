import { useState } from "react"

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
    <form onSubmit={handleRegister}>
      <div>
        <label>Username:</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label>{errorUsername}</label>
      </div>
      <div>
        <label>Password:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <label>{errorPassword}</label>
      </div>
      <div>
        <label>Email:</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>{errorEmail}</label>
      </div>
      <div>
        <label for="profile">Choose your profile:</label>
        <select id="profile" 
        onChange={(e) => setProfile(e.target.value)}>
        <option value="client" selected>Client</option>
        <option value="contractor">Contractor</option>
        </select> 
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default Register