import { createReducer } from '@reduxjs/toolkit';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import {
    decodeToken,
    removeUserTokens,
    setUserTokens,
} from '../../utils/token';

export const initialState = {
    credentials: {
        email: '',
        password: '',
    },
    userData: JSON.parse(localStorage.getItem('user')),
    loginErrorMessage: '',
};

export const updateCredentials = createAction('user/updateCredential');
export const updateLoginErrorMessage = createAction(
    'user/updateLoginErrorMessage'
);

export const login = createAsyncThunk('user/login', async (_, thunkAPI) => {
    const { email, password } = thunkAPI.getState().user.credentials;
    const { data } = await axiosInstance.post('/login', { email, password });

    // api return {error:string} when user failed to login so we reject the action
    if (Object.prototype.hasOwnProperty.call(data, 'error')) {
        return thunkAPI.rejectWithValue(data);
    }

    // get values from token and create new object after decode
    const userData = decodeToken(data.token);

    //store user data in local storage
    setUserTokens(userData, data.token);

    return userData;
});

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(updateCredentials, (state, action) => {
            const { name, value } = action.payload;
            state.credentials[name] = value;
            state.loginErrorMessage = '';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.userData = action.payload;
            state.credentials = { email: '', password: '' };
            state.loginErrorMessage = initialState.loginErrorMessage;
        })
        .addCase(login.rejected, (state, action) => {
            if (action.payload) {
                state.loginErrorMessage = action.payload.error;
            } else {
                state.loginErrorMessage = 'An unexpected error occured';
            }
        })
        .addCase(updateLoginErrorMessage, (state, action) => {
            state.loginErrorMessage = action.payload;
        })
        .addCase(logout, (state) => {
            state.userData = null;
            removeUserTokens();
        });
});

export default userReducer;
