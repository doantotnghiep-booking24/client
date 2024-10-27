import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
const initialState = {
    _id: null,
    Email: "",
    Name: "",
    photoUrl: "",
    AccessToken: "",
    RefeshToken: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuth: (state, action) => {
            state._id = action.payload._id
            state.Email = action.payload.Email
            state.Name = action.payload.Name
            state.photoUrl = action.payload.photoUrl
            state.AccessToken = action.payload.AccessToken
            state.RefeshToken = action.payload.RefeshToken

            Cookies.set("auth", JSON.stringify(action.payload), { sameSite: 'Strict', expires: 1 })
        },
        logoutAuth: (state) => {
            // Xóa thông tin trong state
            state._id = null;
            state.Email = "";
            state.Name = "";
            state.photoUrl = "";
            state.AccessToken = "";
            state.RefeshToken = "";

            // Xóa cookie chứa thông tin đăng nhập
            Cookies.remove("auth");
        }
    },
});

export const { addAuth, logoutAuth } = authSlice.actions;



export default authSlice.reducer;
