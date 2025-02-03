import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    error: "",
    token: null,
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        signupSuccess: (state, action) => {
            state.user = action.payload;
        },
        signupFailed: (state, action) => {
            state.error = action.payload;
        },
        signinSuccess: (state, action) => {
            state.user = action.payload;
        },
        signinFailed: (state, action) => {
            state.error = action.payload;
        },
        logout: () => {
            return {
                isLoading: false,
                user: null,
            }
        },
    },
});

export const { signupSuccess, signupFailed, signinSuccess, signinFailed, logout } = AuthSlice.actions;
export default AuthSlice.reducer;