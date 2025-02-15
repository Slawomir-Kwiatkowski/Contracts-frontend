import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react"
import { LoginProvider } from "../context/LoginContext";

function MainLayout() {
  const theme = createTheme({
      palette: {
        primary: {
          main: '#1b5e20',
        },
        secondary: {
          main: '#7b1fa2',
        },
      },
  });
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <NavBar/> 
        <Outlet/>
      </LoginProvider>
    </ThemeProvider>
  )
}

export default MainLayout