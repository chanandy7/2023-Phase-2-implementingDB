// import { useState } from 'react';

// type UserToken = {
//   token: string;
// };

// export default function UseToken() {
//   const getToken = (): string | undefined => {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken: UserToken | null = tokenString ? JSON.parse(tokenString) : null;
//     return userToken?.token;
//   };

//   const [token, setToken] = useState<string | undefined>(getToken());

//   const saveToken = (userToken: UserToken): void => {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   return { token, saveToken };
// }


import { useState, useEffect } from 'react';

export default function UseToken() {
  const getToken = (): string | null => {
    return sessionStorage.getItem('token');
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const clearToken = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return { token, saveToken, clearToken };
}
