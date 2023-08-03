


import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import axios from 'axios';

import Button from '@mui/material/Button';

function MyDropzone() {

    const [responseData, setResponseData] = useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {

        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        axios.post('https://localhost:7032/api/home', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // console.log(response.data.text)
                setResponseData(response.data.text)

            })
            .catch(error => {
                setResponseData("This is an invalid file. Please upload a mp4, mp3, or wav file")
                console.error(error);
            });
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <section className="dropzone">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files to upload</p>
                    )}
                </div>

            </section>

            <div>{responseData}</div>
        </>

    );

}


export default MyDropzone;