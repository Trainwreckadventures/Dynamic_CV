import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//Base api url here:
import { catchUrl } from "../services/apiConstants";
//pulling in types here:
import { User, CV } from "../utils/types";

// RTK Query API setup here:
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: catchUrl,
  }),
  tagTypes: ["Users", "CVs"],
  endpoints: (builder) => ({
    // User endpoints:
    //GET users:
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    //POST user:
    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    //PUT user
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
    //DELETE user:
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // CV endpoints:
    //GET CV:
    getCvs: builder.query<CV[], void>({
      query: () => "cvs",
      providesTags: ["CVs"],
    }),
    //POST CV:
    addCv: builder.mutation<CV, Omit<CV, "_id">>({
      query: (cv) => ({
        url: "cvs",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cv,
      }),
      invalidatesTags: ["CVs"],
    }),
    //PUT CV:
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
    //DELETE CV:
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
