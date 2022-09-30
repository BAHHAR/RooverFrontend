import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import { IAuth } from "../../../interfaces/IAuth";
import {
  loginReq,
  loginRes,
  createUserRes,
  createUserReq,
  getALlUsersRes,
  successRes,
  updateUserReq,
  changePassword,
  SendEmail,
  updatePassword,
  UserTypeRes,
  ActivateUserReq
} from "./types";

// user = auth
export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL!}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.tokens.access.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }) as MyBaseQueryFn,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<loginRes, loginReq>({
      query: (body) => ({
        url: "auth/login",
        body,
        method: "POST",
      }),
    }),
    createUser: builder.mutation<createUserRes, createUserReq>({
      query: (body) => ({
        url: "auth/signup",
        body,
        method: "POST", 
      }),
      invalidatesTags: [{ type: "Auth", id: "List" }],
    }),
    activateUser: builder.mutation<successRes, ActivateUserReq>({
      query: ({id}) => ({
        url: `auth/activate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Auth", id: "List" }],
    }),
    
    changePassword: builder.mutation<successRes, SendEmail>({
      query: (body) => ({
        url: "auth/forget-password-bo",
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Auth", id: "List" }],
    }),
    updatePassword: builder.mutation<successRes, changePassword>({
      query: (body) => ({
        url: "auth/update/password",
        body,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Auth", id: "List" }],
    }),
    updatePasswordForgetPassword: builder.mutation<successRes, updatePassword>({
      query: (body) => ({
        url: "auth/update/password-bo",
        body,
        method: "PUT",
        headers:{authorization:`bearer ${body?.token}`}
      }),
      invalidatesTags: [{ type: "Auth", id: "List" }],
    }),
    getAllUsers: builder.query<getALlUsersRes, void>({
      query: () => ({
        url: "auth/list",
        method: "GET",
      }),
      providesTags: [{ type: "Auth", id: "List" }],
    }),
    getUserType: builder.query<UserTypeRes[], void>({
      query: () => ({
        url: "/usertype",
        method: "GET",
      }),
      providesTags: [{ type: "Auth", id: "List" }],
    }),
    UpdateGaragiste:builder.mutation<IAuth, IAuth>({
      query: (body) => ({
        url: "auth/updateGaragiste",
        method: "PUT",
        body
      }),
    }),
  }),
});
