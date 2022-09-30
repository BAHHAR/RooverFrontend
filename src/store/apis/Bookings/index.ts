import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import {  BookingAdminRes,BookingUpdateReq,addBooking} from "./type";
import {queryBuilder} from '../../../util/queryBuilder'
import { IBookingAdmin } from "../../../interfaces/IBooking";

export const BookingApi = createApi({
    reducerPath: "booking-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}booking`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Booking"],
    endpoints: (builder) => ({
      getAll:builder.query<BookingAdminRes, void>({
        query: () => ({
          url: `/list`,
          method: "GET",
          providesTags: [{type:"Booking",id:"List"}]
        }),
      }),
      updateStatus:builder.mutation<IBookingAdmin, BookingUpdateReq>({
        query: (body) => ({
          url: `/updateStatus`,
          body,
          method: "POST",
        }),
        invalidatesTags:[{type:"Booking",id:"List"}]
      }),
     createBooking:builder.mutation<IBookingAdmin, addBooking>({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body:body
      }),
      invalidatesTags:[{type:"Booking",id:"List"}]
    }),
    }),
  });