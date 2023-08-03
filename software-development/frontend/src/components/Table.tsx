import React, { useState, useRef } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button , Typography} from '@material-ui/core';


interface Row {
    id: number;
    idSecond: number;
    front: string;
    back: string;
    height: number;
    isEditing: boolean;
}

const Table: React.FC = () => {
    const [data, setData] = useState<Row[]>([]);

    const [newRow, setNewRow] = useState<Row>({
        id: 0,
        idSecond: 0,
        front: '',
        back: '',
        height: 0,
        isEditing: false,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const user = {
        "username":'',
        "password": ''
      };
    // added to connect to DB
    const handleSendData = () => {
        const tableData = data.map((row) => {
            return {
                id: row.id,
                idSecond: row.idSecond,
                front: row.front,
                back: row.back,
                user: user
            };
        });
        console.log(tableData[0])

        for (let i = 0; i < tableData.length; i++ ){
            axios
            .post<any, AxiosResponse>('https://localhost:7032/Cards', tableData[i], {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    console.log('Data sent successfully');
                    console.log(response.data)

                } else {
                    console.error('Error sending data to API');
                    console.error(response.data)
                }
            })
            .catch((error) => {
                console.error('Error sending data to API', error);
            });

        }
        setNewRow((prevRow) => ({
            ...prevRow,
            id: prevRow.id + 1,
          }));
        setData([]);
    };

    //to get a list of JSON then to create rows based on each of the data
    const handleUpdate = () => {
      console.log("handle update");
      const updatedRow = {
        id: newRow.id,
        idSecond: newRow.idSecond,
        front: newRow.front,
        back: newRow.back,
      };
    
      axios
        .put<any, AxiosResponse>('https://localhost:7032/Cards', updatedRow, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            console.log('Data updated successfully');
            setNewRow({
                id: 0,
                idSecond: 0,
                front: '',
                back: '',
                height: 0,
                isEditing: false,
              });
          } else {
            console.error('Error updating data');
          }
        })
        .catch((error) => {
          console.error('Error updating data', error);
        });
    };
    

    // const handleAddRow = () => {
    //     setData((prevData) => [...prevData, newRow]);
    //     setNewRow({ id: 0, idSecond: 0, front: '', back: '', height: 0, isEditing: false });
    // };


    // const handleAddRow2 = () => {
    //     // send data in the new row, before adding, if error, modal to say card already exists
        

    //     setData((prevData) => [
    //       ...prevData,
    //       { ...newRow, id: newRow.id },
    //     ]);
    //     setNewRow((prevRow) => ({
    //       ...prevRow,
    //       id: prevRow.id,
    //       idSecond: prevRow.idSecond + 1,
    //       front: "",
    //       back: ""

    //     }));
    //   };


    //necessary part of the headers

      const token = sessionStorage.getItem('token');
// revised "add"
      const handleAddRow = () => {
        const newData = {
          ...newRow,
          user: user
        };
        axios
          .get<any, AxiosResponse>('https://localhost:7032/Cards', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: newData
          }) 
          .then((response) => {
            console.log(response.data);
            if (response.data.length > 0) {
              const cardExists = response.data.some(
                (card: any) => card.id === newData.id && card.idSecond === newData.idSecond
              );
              if (cardExists) {
                setErrorMessage(
                  "Card with same 'id' and 'idSecond' exists already, please update or change 'id' or 'idSecond'."
                );
                return;
              }
            }
            if (response.status === 200 || response.status === 201) {
              console.log('Data retrieved successfully');
              console.log(data)
              //need to check if the card exists in the about to send lot
              for (const toSendCard of data){
                console.log(newRow)
                console.log(toSendCard)
                if (newRow.id === toSendCard.id && newRow.idSecond === toSendCard.idSecond){
                    console.log("entered")
                    setErrorMessage(
                        "Card with same 'id' and 'idSecond' exists already, please update or change 'id' or 'idSecond'."
                      );
                      return;

                }
              }
              setData((prevData) => [...prevData, newRow]);
              setNewRow({
                id: newRow.id,
                idSecond: newRow.idSecond + 1,
                front: '',
                back: '',
                height: 0,
                isEditing: false,
              });
            } else {
              console.error('Error retrieving data from API!');
              // Handle error message from the backend
              if (response.data && response.data.error) {
                console.error('Backend error message:', response.data.error);
              }
            }
          })
          .catch((error) => {
            console.error('Error retrieving data from API!', error);
            setErrorMessage(
              "Please make sure fields 'id' and 'idSecond' are numbers."
            );
          });
      };
      

    //   const handleAddRow = () => {
    //       const newData = {
    //         ...newRow,
    //         user: user
    //       };
    //     axios
    //       .get<any, AxiosResponse>('https://localhost:7032/Cards', {
    //         headers: {
              
    //           Authorization: `Bearer ${token}`
    //         },
    //         params: newData
    //       })
    //       .then((response) => {
    //         //doesnt enter here
    //         console.log(response.data)
    //         if (response.data.id == -1) {
                
    //             setErrorMessage("Card with same Id and IdSecond exists already, please update or change Id or IdSecond");
    //             return
    //         }
    //         if (response.status === 200 || response.status === 201) {
    //           console.log('Data sent successfully');
    //           setData((prevData) => [...prevData, newRow]);
    //           setNewRow({
    //             id: newRow.id + 1,
    //             idSecond: newRow.idSecond + 1,
    //             front: '',
    //             back: '',
    //             height: 0,
    //             isEditing: false,
    //           });
    //         } else {
    //           console.error('Error sending data to API!!!!!!!!!!!!!!!!!!');
    //           // Handle error message from the backend
    //           if (response.data && response.data.error) {
    //             console.error('Backend error message:', response.data.error);
                
    //           }
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error sending data to API2', error);
    //         setErrorMessage("Please make sure fields 'Id' and 'IdSecond' are numbers");
    //       });
    //   };


    const handleDeleteRow = (index: number) => {
        setData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleUpdateRow = (index: number) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].isEditing = true;
            return updatedData;
        });
    };

    const handleSaveRow = (index: number) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].isEditing = false;
            return updatedData;
        });
    };

    const handleChange = (index: number, field: keyof Row, value: any) => {
        setData((prevData) =>
            prevData.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        );
    };


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
            <table>
                <thead>
                    <tr>
                        <th><Typography variant="subtitle1">Id</Typography></th>
                        <th><Typography variant="subtitle1">IdSecond</Typography></th>
                        <th><Typography variant="subtitle1">Front</Typography></th>
                        <th><Typography variant="subtitle1">Back</Typography></th>
                        <th><Typography variant="subtitle1">Actions</Typography></th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ height: `${row.height}px`}}>
                            <td>
                                {row.isEditing ? (
                                    <textarea
                                        value={row.id}
                                        onChange={(e) =>
                                            handleChange(index, 'id', e.target.value)
                                        }
                                        style={{ outlineColor: '#002349' }}
                                    />
                                ) : (
                                    <span>{row.id}</span>
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <textarea
                                        value={row.idSecond}
                                        onChange={(e) => handleChange(index, 'idSecond', e.target.value)}
                                    />
                                ) : (
                                    <span>{row.idSecond}</span>
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <textarea
                                        value={row.front}
                                        onChange={(e) =>
                                            handleChange(index, 'front', e.target.value)
                                        }
                                    />
                                ) : (
                                    <span>{row.front}</span>
                                )}
                            </td>
                            <td>
                                {row.isEditing ? (
                                    <textarea
                                        value={row.back}
                                        onChange={(e) =>
                                            handleChange(index, 'back', e.target.value)
                                        }
                                    />
                                ) : (
                                    <span>{row.back}</span>
                                )}
                            </td>

                            <td>
                                {row.isEditing ? (
                                    <Button variant="contained" color="primary" onClick={() => handleSaveRow(index)} >Save</Button>
                                ) : ( 
                                    <Button variant="contained" color="primary" onClick={() => handleUpdateRow(index)} style={{ marginRight: '10px' }} >Edit</Button>
                                )}
                                <Button variant="contained" color="primary" onClick={() => handleDeleteRow(index)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>

                        <td>
                            <textarea
                                value={newRow.id}
                                onChange={(e) =>
                                    setNewRow((prevRow) => ({ ...prevRow, id: Number(e.target.value) }))
                                }
                            />
                        </td>
                        <td>
                            <textarea
                                value={newRow.idSecond}
                                onChange={(e) =>
                                    setNewRow((prevRow) => ({
                                        ...prevRow,
                                        idSecond: Number(e.target.value),
                                    }))
                                }
                            />
                        </td>
                        <td>
                            <textarea
                                value={newRow.front}
                                onChange={(e) =>
                                    setNewRow((prevRow) => ({
                                        ...prevRow,
                                        front: e.target.value,
                                    }))
                                }
                            />
                        </td>
                        <td>
                            <textarea
                                value={newRow.back}
                                onChange={(e) =>
                                    setNewRow((prevRow) => ({
                                        ...prevRow,
                                        back: e.target.value,
                                    }))
                                }
                            />
                        </td>
                        <td>
                        &nbsp;
                            <Button variant="contained" className='standardButton' onClick={handleAddRow}>Add</Button>
                            &nbsp;&nbsp;
                            <Button variant="contained" className='standardButton'  onClick={handleUpdate}>Update</Button><br/>
                        </td>
                    </tr>
                </tbody>

            </table>
            <Button variant="contained" color="primary" onClick={handleSendData}>Send Data</Button><br/>
            
            
        </div>
    );
};

export default Table;
