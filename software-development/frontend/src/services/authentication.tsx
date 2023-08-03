import axios, { AxiosInstance } from 'axios';
import { userAuthenticated } from '../api/authenticationSlice';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
});

export const SignUp = async (dispatch: any, credentials: any): Promise<void> => {
    try {
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
};

export const SignIn = async (dispatch: any, credentials: any): Promise<void> => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        console.log('Error!');
    }
};
