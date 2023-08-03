// import React from 'react';
// import useToken from './UseToken';

// function Logout() {
//   const { clearToken  } = useToken();

//   const handleLogout = () => {
//     // Perform any additional logout actions, such as clearing user data or redirecting to the login page
//     clearToken();
//   };


//   return (
//     <div>
//       <h2>Logout</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Logout;


import React from 'react';
import Button from '@mui/material/Button';
import useToken from './UseToken';

function Logout() {
  const { clearToken  } = useToken();

  const handleLogout = () => {
    // Perform any additional logout actions, such as clearing user data or redirecting to the login page
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
