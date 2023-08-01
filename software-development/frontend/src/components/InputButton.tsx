import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import axios, { AxiosResponse, AxiosError, Method } from 'axios';



interface InputButtonProps {
  label: string;
  endpoint: string;
  method: Method;
  buttonLabel: string;
  parameter?: number; // Optional number parameter for delete API call
}

const InputButton: React.FC<InputButtonProps> = ({ label, endpoint, method, buttonLabel }) => {

  const [parameter, setParameter] = useState<number | undefined>(undefined);
  const [data, setData] = useState<any>(null);

  const handleButtonClick = () => {
    let url = endpoint;
    if (method === 'DELETE' && parameter !== undefined) {
      url += `?id=${parameter}`;
    }
    if (method === 'GET' && parameter !== undefined) {
      url += `/${parameter}`;
    }
    console.log(url)

    axios({
      method: method,
      url: url,
    })
      .then((response: AxiosResponse) => {
        // Handle successful response
        setData(response.data)
        setParameter(undefined)
      })
      .catch((error: AxiosError) => {
        // Handle error
        console.error('API call error:', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);
    setParameter(isNaN(parsedValue) ? undefined : parsedValue);
  };


  return (
    <div>
      <TextField label={label} variant="outlined" value={parameter || ''} onChange={handleInputChange}/>
      &nbsp;
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};

export default InputButton;