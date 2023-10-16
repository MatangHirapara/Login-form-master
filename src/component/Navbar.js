import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
const Navbar = ({props}) => {
  const navigate = useNavigate()
  const logout = () => {
    navigate('/')
    props.removeDatas();
    localStorage.removeItem("select_tab"); 
  };
  return (
    <>
      <Box sx={{flexGrow: 1}} >
        <AppBar position='static' color="secondary" >
          <Toolbar>
            <Typography variant='h5' component="div" sx={{flexGrow: 1}} >Octras-Shop</Typography>
            <Button component={NavLink} style={({isActive}) => { return{ backgroundColor: isActive ? '#6d1b7b' : '' }}} sx={{color: 'white', textTransform: 'none'}} to="/" >Home</Button>
            <Button component={NavLink} style={({isActive}) => { return{ backgroundColor: isActive ? '#6d1b7b' : '' }}} sx={{color: 'white', textTransform: 'none'}} to="contact" >Contact</Button>
            <Button component={NavLink} onClick={logout} style={({isActive}) => { return{ backgroundColor: isActive ? '#6d1b7b' : '' }}} sx={{color: 'white', textTransform: 'none'}} to="/login" >Login/Registration</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Navbar