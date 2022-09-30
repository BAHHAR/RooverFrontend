import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import {  MarqueRes,AddMarqueReq} from "./type";
import {queryBuilder} from '../../../util/queryBuilder'

export const marqueVehiculeApi = createApi({
    reducerPath: "marque-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}car/`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Marque"],
    endpoints: (builder) => ({
      getMarque:builder.query<MarqueRes, void>({
        query: () => ({
          url: `make`,
          method: "GET",
          providesTags: [{type:"Marque",id:"List"}]
        }),
      }),

      addMarque:builder.mutation<MarqueRes,AddMarqueReq >({
        query: (body) => ({
          url: `make`,
          method: "POST",
          body:body,
          providesTags: [{type:"Marque",id:"List"}]
        }),
      }),
    }),
  });