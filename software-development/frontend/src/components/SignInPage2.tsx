import React, { useState } from 'react';
import axios from 'axios';
import UseToken from './UseToken';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';




function SignInPage2() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { saveToken } = UseToken();

    //to keep state for modal message
  const [errorMessage, setErrorMessage] = useState('');

  const sessionStorage = window.sessionStorage;

  const handleSignIn = async () => {
    try {
      const response = await axios.post('https://localhost:7032/Authentication/signin', {
        username,
        password
      });
    //   does not go pass here if it fails
      console.log("hi")
      if (response.status === 200) {
        // Authentication successful
        const token = response.data.token;
        saveToken(token);
        sessionStorage.setItem('token', token); // Store the token in session storage
        console.log(sessionStorage)
        // Refresh the page
        window.location.reload();

      
      // Authentication successful
      // Set the user as logged in or store the authentication token in local storage
      console.log("success")
      }

    } catch (error) {
        console.log("login failed")
        setErrorMessage("ERROR")
        return (
            <div>
                <Dialog open={!!errorMessage} onClose={() => setErrorMessage('')}>
                    <DialogTitle>Error</DialogTitle>
                        <DialogContent>
                            <DialogContentText>{errorMessage}</DialogContentText>
                        </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setErrorMessage('')} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                </Dialog>
            </div>

        )
      // Authentication failed
      // Handle the error, e.g., show an error message to the user
    }
  }

  return (
    <div >
        <Typography variant="h6" className="center-align">Client Login</Typography>
    
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
    </div>
  );
}

export default SignInPage2;
