import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/userSlice.js";
import userReducer from "../redux/getDataSlice.js"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    }
})