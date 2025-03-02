import {Link } from 'react-router-dom'
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import logo from '../assets/logo.png'
import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react';

function NavBar() {
  const {loginState} = useContext(LoginContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
              sx={{borderBottomLeftRadius: "15px",
                  borderBottomRightRadius: "15px"
              }}>
        <Toolbar>
          <Link>
            <img src={logo} style={{ width: 32, height: 32, paddingRight: 10 }}/>
          </Link>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Contracts */}
          </Typography>
          <Link to='/contracts' style={{color: '#FFFFFF'}}>
            <Button color="inherit">Contracts</Button>
          </Link>
          <Link to='/warehouses' style={{color: '#FFFFFF'}}>
            <Button color="inherit">Warehouses</Button>
          </Link>
          {loginState ? 
            <div>
              <Link to='/register' style={{color: '#FFFFFF'}}>
                <Button color="inherit">Sign Up</Button>
              </Link>
              <Link to='/login' style={{color: '#FFFFFF'}}>
                <Button color="inherit">Login</Button>
              </Link>
            </div> :
            <Link to='/logout' style={{color: '#FFFFFF'}}>
            <Button color="inherit">Logout</Button>
          </Link>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar