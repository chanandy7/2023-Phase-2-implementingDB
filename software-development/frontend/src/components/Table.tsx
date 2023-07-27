import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Button from '@mui/material/Button';
import axios, { AxiosResponse } from 'axios';

// const axiosInstance = axios.create({
//     baseURL:'https://localhost:7032/Cards',
// })


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






    // added to connect to DB
    const handleSendData = () => {
        const tableData = data.map((row) => {
            return {
                id: row.id,
                idSecond: row.idSecond,
                front: row.front,
                back: row.back,

                // Add other properties as needed
            };
        });

        axios
            .post<any, AxiosResponse>('https://localhost:7032/Cards', tableData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Error sending data to API');
                }
            })
            .catch((error) => {
                console.error('Error sending data to API', error);
            });
    };



    const handleAddRow = () => {
        setData((prevData) => [...prevData, newRow]);
        setNewRow({ id: 0, idSecond: 0, front: '', back: '', height: 0, isEditing: false });
    };

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
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>IdSecond</th>
                        <th>Front</th>
                        <th>Back</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{ height: `${row.height}px` }}>
                            <td>
                                {row.isEditing ? (
                                    <textarea
                                        value={row.id}
                                        onChange={(e) =>
                                            handleChange(index, 'id', e.target.value)
                                        }
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
                                    <Button variant="text" onClick={() => handleSaveRow(index)}>Save</Button>
                                ) : (
                                    <Button variant="text" onClick={() => handleUpdateRow(index)}>Edit</Button>
                                )}
                                <Button variant="text" onClick={() => handleDeleteRow(index)}>Delete</Button>
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
                            <Button variant="text" onClick={handleAddRow}>Add</Button>
                        </td>
                    </tr>
                </tbody>

            </table>
            <button onClick={handleSendData}>Send Data</button>
        </div>
    );
};

export default Table;
