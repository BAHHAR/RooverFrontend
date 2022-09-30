import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import {  UserRes,deleteReq,addUser,addUserRes } from "./type";
import {queryBuilder} from '../../../util/queryBuilder'

export const userApi = createApi({
    reducerPath: "user-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["User"],
    endpoints: (builder) => ({
      getAll: builder.query<UserRes, void>({
        query: () => ({
          url: `user/list`,
          method: "GET",
          providesTags: [{type:"User",id:"LIST"}]
        }),
      }),
      addUser:builder.mutation<addUserRes,addUser>({
          query:(body)=>({
            url: `user`,
          method: "POST",
          body:body,
        }),
        invalidatesTags:[{type:"User",id:"LIST"}]
      }),
      deleteUser: builder.mutation<UserRes, deleteReq>({
        query: ({id}) => ({
          url: `/user/user-delete/${id}`,
          method: "DELETE",
          
        }),
        invalidatesTags: [{type:"User",id:"List"}],
      }),
    }),
  });