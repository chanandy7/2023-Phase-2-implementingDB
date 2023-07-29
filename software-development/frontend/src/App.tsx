import React from 'react';
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





function App() {
    const { data, isLoading, isError } = useGetAllTodoListsQuery();

    if (isLoading) return <CircularProgress />;
    if (isError) return <p>Oops, Something went wrong!</p>;

    return (
        //TODO: Hook theming up to redux so that it selects
        <ThemeProvider theme={lightTheme}>
            <div className="App">
                <MyDropzone />
                <Table />
                <div style={{ marginTop: '50px' }}>
                    <ViewTable/>
                </div>
                <div style={{ marginTop: '50px', marginRight: '25px'  }}>
                    <InputButton label = {"Deck to delete..."} endpoint= {"https://localhost:7032/Cards"} method={"DELETE"} buttonLabel ={"Delete"}/>
                </div>


                    
                {/* {data!.length === 0 && <p>No Todo Lists!</p>} */}
                {data!.map(tdl => <TodoList todoListItems={tdl.todoItemList} key={tdl.id} />)}



            </div>
        </ThemeProvider>
    );
}





export default App;
