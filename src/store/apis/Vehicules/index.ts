import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import {  VehiculeRes,VehiculeFuel,VehiculeModel,addModel,IDeleteVehic} from "./type";
import {queryBuilder} from '../../../util/queryBuilder'
import { IVehicule } from "../../../interfaces/IVehicule";

export const vehiculeApi = createApi({
    reducerPath: "vehicule-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}car/`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Vehicule"],
    endpoints: (builder) => ({
      getAll: builder.query<VehiculeRes, void>({
        query: () => ({
          url: `engine`,
          method: "GET",
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      addVehicule:builder.mutation<VehiculeRes, IVehicule>({
        query: (body) => ({
          url: `engine`,
          method: "POST",
          body,
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      deleteVehicule:builder.mutation<void, IDeleteVehic>({
        query: ({id}) => ({
          url: `engine/${id}`,
          method: "DELETE",
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      getFuel:builder.query<VehiculeFuel[], void>({
        query: () => ({
          url: `fuel`,
          method: "GET",
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      getMarque:builder.query<VehiculeFuel[], void>({
        query: () => ({
          url: `make`,
          method: "GET",
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      getModel:builder.query<VehiculeModel[], void>({
        query: () => ({
          url: `model`,
          method: "GET",
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
      addModel:builder.mutation<VehiculeModel, addModel>({
        query: (body) => ({
          url: `model`,
          method: "POST",
          body,
          providesTags: [{type:"Vehicule",id:"List"}]
        }),
      }),
    }),
  });