import { Grid,
List,
ListItem,
ListItemText,
IconButton,
Paper,
TextField,
Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/Common';

const Dashboard = () => {
  const[formValue, setFormValue] = useState({});
  const [messages, setMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [forwardEmail, setforwardEmail] = useState('');

  const handleChange = (e)=>{
    setFormValue({...formValue, [e.target.id]: e.target.value });
  }
  const handleSend = () => {
    // setError(null);
    // setLoading(true);
    let body = {
      ...formValue,
      sentBy:getUser().email,
    }
    axios.post('http://localhost:8000/message', body).then(response => {
      console.log(response);
      // setLoading(false)
    }).catch(error => {
      // setLoading(false);
      // if (error.response.status === 401) setError(error.response.data.message);
      // else setError("Something went wrong. Please try again later.");
    });
  }

  const forwardHandler = (messageId)=>{
    axios.put('http://localhost:8000/forward', {messageId, forwardedTo : forwardEmail }).then(response => {
      console.log(response);
      
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(()=>{

    let url = 'http://localhost:8000/messages?emailId=' + getUser().email;
    axios.get(url)
    .then((result)=>{
      console.log(result);
      setMessages(result?.data?.inbox);
      setSentMessages(result?.data?.sent);
    })
    .catch((err=>{
      console.log(err);
    }))
  },[setMessages, setSentMessages])
  return (
    <>
    <Grid
    item
    container
    spacing={0}
    direction="row"
    alignItems="center"
    justifyContent="center">
      <Grid
      item
      xs={6}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      >
        <div>Inbox</div>
        <List 
        style={{ width : '100%'}}
        >   
        {messages.map((m)=>
        (<ListItem
          key={m._id}
          style={{ width : '100%'}}
          secondaryAction={
          <IconButton edge="end" aria-label="forward"
          onClick={()=>forwardHandler(m._id)}>
            <TextField 
            id='to'
            type='text'
            label='to'
            variant="outlined"
            style={{marginTop: 20}}
            onChange={(e)=> setforwardEmail(e.target.value)}
            value={forwardEmail}
            />
            <ArrowForwardIcon />
          </IconButton>}
          >
            <Link to={'/message/'+m._id}>
            <ListItemText
            primary={m.message}
            
            />
            </Link>
        </ListItem>)
        )}
        </List>
      </Grid>
      <Grid
      item
      xs={6}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      >
        <div>Sent</div>
        {sentMessages.map((m)=>
        (<ListItem
          >
            <ListItemText
            primary={m.message}
            />

        </ListItem>)
        )}
      </Grid>
    </Grid>
    <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
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
            
            <h1>Send Message</h1>
            <TextField 
            id='message'
            type='text'
            label='message'
            variant="outlined"
            style={{marginTop: 20}}
            value={formValue.message}
            onChange={(e)=> handleChange(e)}
            />
            <TextField 
            id='to'
            type='text'
            label='to'
            variant="outlined"
            style={{marginTop: 20}}
            onChange={(e)=> handleChange(e)}
            value={formValue.to}
            />
            <Button
            variant="contained"
            style={{marginTop: 20}}
            onClick={()=>handleSend()}>
              Send
            </Button>
            
          </Grid>
        </Paper>
      </Grid>

    </>
    
    
  )
}

export default Dashboard