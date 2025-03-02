import Hero from "../components/Hero"
import { Typography } from "@mui/material"
function MainPage() {
  return (
    <>
        <Hero />
        <Typography variant="h6" sx={{margin: 1}}>Main Page content here (Announcements and News)</Typography>
    </>
  )
}

export default MainPage