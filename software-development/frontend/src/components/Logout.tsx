

import React from 'react';
import Button from '@mui/material/Button';
import useToken from './UseToken';

function Logout() {
  const { clearToken  } = useToken();

  const handleLogout = () => {
    
    clearToken();
    window.location.reload();
  };

  return (
    <div className = "logOut">
      <Button variant="contained" className='standardButton' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
