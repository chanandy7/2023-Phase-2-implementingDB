import {configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';



export default configureStore({
    reducer: {
        authenticationSlice: authenticationSlice
    }
});