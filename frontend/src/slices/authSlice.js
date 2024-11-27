import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if it exists, otherwise default to null
const initialState = {
	userInfo: localStorage.getItem("userInfo")
		? JSON.parse(localStorage.getItem("userInfo"))
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		// Action to set user credentials in the state and localStorage
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		// Action to handle user logout: clear state and remove from localStorage
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem("userInfo"); // Remove userInfo from localStorage
			localStorage.removeItem("profileData"); // Optional: Remove other app data
			localStorage.removeItem("mealPlan"); // Optional: Remove other app data
			localStorage.removeItem("waterIntake"); // Optional: Remove other app data
		},
	},
});

// Export actions so they can be dispatched in other parts of the app
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer to be combined in the store
export default authSlice.reducer;
