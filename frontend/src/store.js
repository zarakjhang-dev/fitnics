import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
	reducer: {
		auth: authReducer, // Add the auth slice reducer
		[apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware), // Add the API middleware to handle caching, pagination, etc.
	devTools: true, // Enable Redux DevTools in development mode
});

export default store;
