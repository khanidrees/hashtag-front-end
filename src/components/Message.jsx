import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Message = () => {
  let params = useParams();
  const [message, setMessage] = useState({});
  useEffect(()=>{
    let url = 'http://localhost:8000/message?messageId='+params?.id;
    axios.get(url)
    .then((result)=>{
      console.log(result);
      setMessage(result?.data?.m);
    })
    .catch(e=> console.log(e));
  },[setMessage])
  return (
    <>
      <div>Message : {message?.message}</div>
      <div>From : {message?.sentBy?.email}</div>
      <div>To: {message?.to?.[0]?.email}</div>
    </>
    
  )
};

export default Message