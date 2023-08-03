import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from './themes';
import { useGetAllTodoListsQuery } from './api/apiSlice';
import { CircularProgress } from '@mui/material';
import { TodoList } from './stories/TodoList/TodoList';

import MyDropzone from './components/MyDropzone';

import Table from './components/Table';
import ViewTable from './components/ViewTable';
import InputButton from './components/InputButton';



import SignInPage2 from './components/SignInPage2';
import Logout from './components/Logout';


import {BrowserRouter, Route, Routes, useNavigate, Outlet} from 'react-router-dom';




function App() {
    //const { data, isLoading, isError } = useGetAllTodoListsQuery();

    //if (isLoading) return <CircularProgress />;
    //if (isError) return <p>Oops, Something went wrong!</p>;

    const token = sessionStorage.getItem('token');
    return (
        <BrowserRouter>
        
            <Routes>
            <Route path ="/" element={token ?  <>
            <div className="App"  >
                <Logout/>
                <MyDropzone />
                &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Table />
                <div style={{ marginTop: '50px' }}>
                    <ViewTable/>
                </div>
                <div style={{ marginTop: '20px', marginRight: '25px'  }}>
                    <InputButton label = {"Deck to delete..."} endpoint= {"https://localhost:7032/Cards"} method={"DELETE"} buttonLabel ={"Delete"} />
                </div>


                    
                {/* {data!.length === 0 && <p>No Todo Lists!</p>} */}
                {/* {data!.map(tdl => <TodoList todoListItems={tdl.todoItemList} key={tdl.id} />)} */}



            </div>
        </> 
        :
        <div className="center-container"  >
            <SignInPage2 /> 
        </div>
          
        }/>
            </Routes>
           
        </BrowserRouter>
    )
}





export default App;
