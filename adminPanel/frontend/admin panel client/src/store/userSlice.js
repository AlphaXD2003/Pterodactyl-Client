import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    userId: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userData = action.payload
        },
        logout: state => {
            state.status = false,
            state.userData = null
        },

        setUserId: (state, action) => {
            state.userId = action.payload
        },
        removeUserId: state => {
            state.userId = null
        }

    }
});

export const {login, logout, setUserId, removeUserId} = userSlice.actions;

export default userSlice.reducer;