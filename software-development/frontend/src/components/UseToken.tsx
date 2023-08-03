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
