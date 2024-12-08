import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			// Save token to localStorage
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
			if (action.payload.token) {
				localStorage.setItem("token", action.payload.token); // Save the token separately
			}
		},
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo");
			localStorage.removeItem("token"); // Remove token on logout
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
