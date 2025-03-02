import {Outlet} from "react-router-dom"
import NavBar from "../components/NavBar"
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react"
import { LoginProvider } from "../context/LoginContext";
import { CssBaseline } from "@mui/material";

function MainLayout() {
  const theme = createTheme({
      palette: {
        background: {
          default: "#E8F5E9",
        },
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
      <CssBaseline/>
      <LoginProvider>
        <NavBar/> 
        <Outlet/>
      </LoginProvider>
    </ThemeProvider>
  )
}

export default MainLayout