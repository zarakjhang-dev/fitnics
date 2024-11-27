import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:8888/.netlify/functions"
		: "/.netlify/functions";

const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.userInfo?.token; // Assuming token is part of userInfo
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});

export { apiSlice };
