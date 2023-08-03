import React, { useState } from 'react';
import axios from 'axios';
import UseToken from './UseToken';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';




function SignInPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { saveToken } = UseToken();

    //to keep state for modal message
  const [showError, setShowError] = useState(false);
  const sessionStorage = window.sessionStorage;

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://localhost:7032/Authentication/signin', {
        username,
        password
      });
    //   does not go pass here if it fails
      
      if (response.status === 200) {
        // Authentication successful
        const token = response.data.token;
        saveToken(token);
        sessionStorage.setItem('token', token); // Store the token in session storage
        console.log(sessionStorage)
        // Refresh the page
        window.location.reload();

      

      console.log("success")
      }

    } catch (error) {
        console.log("login failed")
        setShowError(true);
    }
  }

  return (
    <div >
        <Typography variant="h6" className="center-align">Client Login</Typography>
        <br/>
    <div >
      
      <TextField
      size="small"
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        
      />
      </div>
      <br />
      <div >
      <TextField
      size="small"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        
      />
      </div>
      <br />
      <div className="center-align">
      <Button variant="contained"  className='standardButton'  onClick={handleSignIn} >
        Sign in
      </Button>
      </div>
      <br/>
      {showError && <Typography variant="body1" className="center-align" style={{ color: 'red' }}>Login failed</Typography>}


    </div>
  );
}

export default SignInPage2;
