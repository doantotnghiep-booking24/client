import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    _id: null,
    Email: "",
    Name: "",
    photoUrl: "",
    AccessToken: "",
    RefreshToken: ""
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuth: (state, action) => {
            state._id = action.payload._id;
            state.Email = action.payload.Email;
            state.Name = action.payload.Name;
            state.photoUrl = action.payload.photoUrl;
            state.AccessToken = action.payload.AccessToken;
            state.RefreshToken = action.payload.RefreshToken;

            Cookies.set("auth", JSON.stringify(action.payload), {
                sameSite: "none",
                expires: 3,
                path: '/',
                domain: 'frontend-booking-ovf1.onrender.com',
                secure: true,
            });
        },
        logoutAuth: (state) => {
            state._id = null;
            state.Email = "";
            state.Name = "";
            state.photoUrl = "";
            state.AccessToken = "";
            state.RefreshToken = "";

            Cookies.remove("auth", {
    sameSite: "none",
    path: '/',
    domain: 'frontend-booking-ovf1.onrender.com',
    secure: true,
});
        },
        updateUser: (state, action) => {
            const updatedData = action.payload;
            if (updatedData.Name !== undefined) {
                state.Name = updatedData.Name;
            }
            if (updatedData.Email !== undefined) {
                state.Email = updatedData.Email;
            }
            if (updatedData.photoUrl !== undefined) {
                state.photoUrl = updatedData.photoUrl;
            }

            // Cập nhật cookie với thông tin mới
            const currentAuth = JSON.parse(Cookies.get("auth") || "{}");
            Cookies.set("auth", JSON.stringify({ ...currentAuth, ...updatedData }), { sameSite: 'Strict', expires: 3 });
        }
    },
});

export const { addAuth, logoutAuth, updateUser } = authSlice.actions;

export default authSlice.reducer;
