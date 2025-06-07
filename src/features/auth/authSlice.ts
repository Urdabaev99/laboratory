import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types";

const initialState: AuthState = {
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
