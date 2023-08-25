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
export const updateLoginErrorMessage = createAction(
    'user/updateLoginErrorMessage'
);

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    const { email, password } = thunkAPI.getState().user.credentials;
    const { data } = await axiosInstance.post('/login', { email, password });

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
            state.loginErrorMessage = '';
        })
        .addCase(login.fulfilled, (state, action) => {
            if (Object.prototype.hasOwnProperty.call(action.payload, 'error')) {
                // api send object {error: string} when user failed to login
                state.loginErrorMessage = action.payload.error;
            } else {
                //login is good
                state.username = action.payload.username;
                state.credentials = { email: '', password: '' };
                state.loginErrorMessage = initialState.loginErrorMessage;
            }
        })
        .addCase(login.rejected, (state) => {
            // probably not usefull since api send only fulfilled but just in case
            state.loginErrorMessage = 'An unexpected error occured';
        })
        .addCase(updateLoginErrorMessage, (state, action) => {
            state.loginErrorMessage = action.payload;
        });
});

export default userReducer;
