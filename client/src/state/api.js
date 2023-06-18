import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* createApi is a function that generates an API slice, 
    which includes reducers and actions that handles all the data fetching logic. */
export const api = createApi({

  /* baseQuery handles making the actual HTTP requests, fetchBaseQuery is a basic fetch implementation
      with sensible defaults for things like headers. */
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),

  /* reducerPath is the key in the Redux store where the API slice reducer will be mounted. */
  reducerPath: "adminApi",
  
  /* tagTypes is an array of tag types that can be invalidated or refetched as part of the cache handling behavior. */
  tagTypes: [
    "User",
    "Shipments",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/shipments",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Shipments"],
    }),
    getChainOfShipments: build.query({
      query: (chainId) => ({
        url: "client/chainOfShipments",
        method: "GET",
        params: {chainId},
      }),
      providesTags: ['chainOfShipments'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetChainOfShipmentsQuery,
} = api;
