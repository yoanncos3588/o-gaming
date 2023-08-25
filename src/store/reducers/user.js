import { createReducer } from '@reduxjs/toolkit';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { decodeToken } from '../../utils/jwt-decode';

export const initialState = {
    credentials: {
        email: '',
        password: '',
    },
    userId: undefined,
    username: undefined,
    role: undefined,
    loginErrorMessage: '',
};

export const updateCredentials = createAction('user/updateCredential');
export const updateLoginErrorMessage = createAction(
    'user/updateLoginErrorMessage'
);

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    const { email, password } = thunkAPI.getState().user.credentials;
    const { data } = await axiosInstance.post('/login', { email, password });

    const userData = decodeToken(data.token);

    //store token in local storage
    // TODO use token in same-site cookie
    localStorage.setItem('user', JSON.stringify(data));

    return userData;
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
                //TODO add username when availabe
                //state.username = action.payload.username;
                state.userId = action.payload.userId;
                state.role = action.payload.role;
                state.credentials = { email: '', password: '' };
                state.loginErrorMessage = initialState.loginErrorMessage;
            }
        })
        .addCase(login.rejected, (state, action) => {
            // probably not usefull since api send only fulfilled but just in case
            console.log(action);
            state.loginErrorMessage = 'An unexpected error occured';
        })
        .addCase(updateLoginErrorMessage, (state, action) => {
            state.loginErrorMessage = action.payload;
        });
});

export default userReducer;
