import {createSlice} from '@reduxjs/toolkit';


export{}
export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState:{
        token: '',
        isLoggedIn: false
    },
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state, ...{
                    token: action.payload.token,
                    isLoggedIn: true,
                }
            }
        }, 
        logout: () => {
            sessionStorage.clear();
        }
    }
});

export const {userAuthenticated, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;

