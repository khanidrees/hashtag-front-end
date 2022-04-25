import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/Common';
import { 
  Button,
  Container,
  Grid,
  Paper,
  TextField
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { width } from "@mui/system";


const Login = (props) => {
  let navigate = useNavigate();
  const [formValue , setFormValue] = useState({
    email: '',
    password :''
  });
  const handleChange = (e)=>{
    setFormValue({...formValue, [e.target.id]: e.target.value });
  }
  const handleLogin = () => {
    // setError(null);
    // setLoading(true);
    axios.post('http://localhost:8000/login', formValue).then(response => {
      console.log(response);
      // setLoading(false);
      setUserSession(response.data.token, response.data.user);
      navigate('/dashboard');
    }).catch(error => {
      // setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else setError("Something went wrong. Please try again later.");
    });
  }
  
  return (
    <div >
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
          >
        <Paper elevation={3} style={{
          width:400,
          height: '60vh',
          }}>
          <Grid container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{height : '100%'}}
          >
            
            <h1>Login Page</h1>
            <TextField 
            id='email'
            type='text'
            label='email'
            variant="outlined"
            style={{marginTop: 20}}
            value={formValue.email}
            onChange={(e)=> handleChange(e)}
            />
            <TextField 
            id='password'
            type='password'
            label='password'
            variant="outlined"
            style={{marginTop: 20}}
            onChange={(e)=> handleChange(e)}
            value={formValue.password}
            />
            <Button
            variant="contained"
            style={{marginTop: 20}}
            onClick={()=>handleLogin()}>
              Login
            </Button>
            
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}

export default Login