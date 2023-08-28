import { createReducer } from '@reduxjs/toolkit';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { decodeToken } from '../../utils/jwt-decode';

export const initialState = {
    credentials: {
        email: '',
        password: '',
    },
    userId: 1,
    username: null,
    role: 'developer',
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
            //TODO add username when availabe
            //state.username = action.payload.username;
            state.userId = action.payload.userId;
            if (state.role === '') state.role = action.payload.role;
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
        });
});

export default userReducer;
