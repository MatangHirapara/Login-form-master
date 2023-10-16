import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const Layout = ({props}) => {

  return (
    <>
      <CssBaseline />
      <Navbar props={props}/>
      <Outlet /> 
    </>
  )
}

export default Layout