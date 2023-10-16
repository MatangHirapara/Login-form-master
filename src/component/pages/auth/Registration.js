import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from 'react-router-dom';
import { Alert, Checkbox, FormControlLabel } from '@mui/material';

const Registration = () => {
  const navigate = useNavigate();

  const [user, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: ""
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
    const { name, email, password, password_confirm } = user
    const res = fetch("https://loginform-92fae-default-rtdb.firebaseio.com/userDataRecord.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, password, password_confirm
        })
      }
    );
    if (res) {
      setUsers({
        name, email, password, password_confirm
      })
      alert("Data Stored")
    } else {
      alert("plz fill the data")
    }
    const data = new FormData(e.currentTarget)
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirm: data.get("password_confirm")
    }
    if (actualData.name && actualData.email && actualData.password && actualData.tc !== null) {
      if (actualData.password === actualData.password_confirm) {
        console.log(actualData);
        document.getElementById('registration-form').reset();
        setError({ status: true, msg: "Registration Successful", type: "success" })
        navigate("/")
      } else {
        setError({ status: true, msg: "Password doesn't match", type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }} id="registration-form" onSubmit={handleSubmit} >
        <TextField margin='normal' onChange={onhandlechange} value={user.name} required fullWidth id='name' name='name' label="Name" />
        <TextField margin='normal' onChange={onhandlechange} value={user.email} required fullWidth id='email' name='email' label="Email Address" />
        <TextField margin='normal' onChange={onhandlechange} value={user.password} required fullWidth id='password' name='password' label="Password" type="password" />
        <TextField margin='normal' onChange={onhandlechange} value={user.password_confirm} required fullWidth id='password_confirm' name='password_confirm' label="Confirm Password" type="password" />
        <FormControlLabel control={<Checkbox value="agree" color='primary' name='tc' id='tc' />} label="I agree to term and condition" />
        <Box textAlign="center" >
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} >Join</Button>
        </Box>
        <NavLink to='/' >Forgot Password ?</NavLink>
        {error.status ? <Alert severity={error.type} >{error.msg}</Alert> : ""}
      </Box>
    </>
  )
}

export default Registration