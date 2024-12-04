import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catchUrl } from "../services/apiConstants"; //henter inn url + apinøkkel her
import { User } from "../utils/types";
//må kanskje hente inn cv/ cvs også

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: catchUrl,
  }),
  endpoints: (builder) => ({
    // User endpoints her:
    getUsers: builder.query<User[], void>({
      query: () => "users",
    }),
    addUser: builder.mutation<User, User>({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation<User, { id: string; user: User }>({
      query: ({ id, user }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    //cv endepunkt her:
    getCvs: builder.query<any[], void>({
      query: () => "cvs",
    }),
    addCv: builder.mutation<any, any>({
      query: (cv) => ({
        url: "cvs",
        method: "POST",
        body: cv,
      }),
    }),
    updateCv: builder.mutation<any, { id: string; cv: any }>({
      query: ({ id, cv }) => ({
        url: `cvs/${id}`,
        method: "PUT",
        body: cv,
      }),
    }),
    deleteCv: builder.mutation<void, string>({
      query: (id) => ({
        url: `cvs/${id}`,
        method: "DELETE",
      }),
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
