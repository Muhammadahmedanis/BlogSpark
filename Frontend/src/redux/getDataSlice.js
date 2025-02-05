import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    blog: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,   
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getBlog: (state, action) => {
            state.blog = action.payload;
        }
    }
});

export const { getUser, getBlog } = userSlice.actions;
export default userSlice.reducer; 