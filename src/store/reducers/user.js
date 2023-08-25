import { createReducer } from '@reduxjs/toolkit';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';

export const initialState = {
    credentials: {
        email: '',
        password: '',
    },
    username: undefined,
    loginErrorMessage: '',
};

export const updateCredentials = createAction('user/updateCredential');

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    const { email, password } = thunkAPI.getState().user.credentials;
    const { data } = await axiosInstance.post('/login', { email, password });

    //console.log(data);
    //store token in local storage
    // TODO use token in same-site cookie
    localStorage.setItem('user', JSON.stringify(data));
    return data;
});

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateCredentials, (state, action) => {
            const { name, value } = action.payload;
            state.credentials[name] = value;
        })
        .addCase(login.fulfilled, (state, action) => {
            // api send object {error: string} when user failed to login
            if (Object.prototype.hasOwnProperty.call(action.payload, 'error')) {
                state.loginErrorMessage = action.payload.error;
            } else {
                state.username = action.payload.username;
                state.credentials = { email: '', password: '' };
            }
        })
        .addCase(login.rejected, (state) => {
            state.loginErrorMessage = 'An unexpected error occured';
        });
});

export default userReducer;
