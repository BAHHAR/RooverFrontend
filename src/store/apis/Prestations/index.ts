import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import {  PrestationReq } from "./type";
import {queryBuilder} from '../../../util/queryBuilder'
import { IPrestations, IPrestationsCategory,IDeletePrest } from "../../../interfaces/IPrestation";

export const PrestationApi = createApi({
    reducerPath: "prestation-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Prestations"],
    endpoints: (builder) => ({
      getAll: builder.query<PrestationReq, void>({
        query: () => ({
          url: `/prestation`,
          method: "GET",
          providesTags: [{type:"Prestations",id:"List"}]
        }),
      }),
      getCategories:builder.query<PrestationReq, void>({
        query: () => ({
          url: `/prescategory`,
          method: "GET",
        }),
      }),
      addPrestation:builder.mutation<IPrestations, IPrestations>({
        query: (body) => ({
          url: `/prestation`,
          method: "POST",
          body,
        }),
        invalidatesTags: [{type:"Prestations",id:"List"}]
      }),
      deletePrest:builder.mutation<void, IDeletePrest>({
        query: ({id}) => ({
          url: `/prestation/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [{type:"Prestations",id:"List"}]
      }),
      addPrestationCategorie:builder.mutation<IPrestationsCategory, IPrestationsCategory>({
        query: (body) => ({
          url: `/prescategory`,
          method: "POST",
          body,
        }),
        invalidatesTags: [{type:"Prestations",id:"List"}]
      }),
    }),
  });