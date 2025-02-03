import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/userSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})