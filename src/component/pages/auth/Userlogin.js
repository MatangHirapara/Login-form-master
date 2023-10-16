import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const Userlogin = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const [user, setUsers] = useState({
    email: "",
    password: ""
  })

  let name, value;
  const onhandlechange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUsers({ ...user, [name]: value })
  }

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password} = user
    const res = fetch("https://loginform-92fae-default-rtdb.firebaseio.com/userDataRecord.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password
        })
      }
    );
    const data = new FormData(e.currentTarget)
    const actualData = {
      email : data.get("email"),
      password : data.get("password")
    }
    if(actualData.email && actualData.password){
      console.log(actualData);
      document.getElementById('login-form').reset();
      setError({status: true, msg: "Login Success", type: "success"})
      navigate("/")
    }else{
      setError({status: true, msg: "All Fields are Required", type: 'error'})
    }
  }
  return (
    <>
      <Box component="form" noValidate sx={{mt: 1}} id="login-form" onSubmit={handleSubmit} >
        <TextField margin='normal' value={user.email} onChange={onhandlechange} required fullWidth id='email' name='email' label="Email Address" />
        <TextField margin='normal' value={user.password} onChange={onhandlechange} required fullWidth id='password' name='password' label="password" type="password" />
        <Box textAlign="center" >
          <Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px: 5}} >Login</Button>
        </Box>
        <NavLink to='/' >Forgot Password ?</NavLink>
        {error.status ? <Alert severity={error.type} >{error.msg}</Alert> : ""}
      </Box>
    </>
  )
}
Userlogin.propTypes = {
  setToken: PropTypes.func.isRequired
}
export default Userlogin