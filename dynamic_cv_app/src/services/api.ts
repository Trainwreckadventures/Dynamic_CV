import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catchUrl } from "../services/apiConstants";
import { User, CV } from "../utils/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: catchUrl,
  }),
  tagTypes: ["Users", "CVs"],
  endpoints: (builder) => ({
    // User endpoints
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, { id: string; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `users/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    // CV endpoints
    getCvs: builder.query<CV[], void>({
      query: () => "cvs",
      providesTags: ["CVs"],
    }),
    addCv: builder.mutation<CV, Partial<CV>>({
      query: (cv) => ({
        url: "cvs",
        method: "POST",
        body: cv,
      }),
      invalidatesTags: ["CVs"],
    }),
    updateCv: builder.mutation<CV, { id: string; cv: Partial<CV> }>({
      query: ({ id, cv }) => ({
        url: `cvs/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: cv,
      }),
      invalidatesTags: ["CVs"],
    }),
    deleteCv: builder.mutation<void, string>({
      query: (id) => ({
        url: `cvs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CVs"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCvsQuery,
  useAddCvMutation,
  useUpdateCvMutation,
  useDeleteCvMutation,
} = api;
