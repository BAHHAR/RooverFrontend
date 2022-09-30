import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import { miscellaneousRes } from "./type";
import {queryBuilder} from '../../../util/queryBuilder'


export const MiscellaneousApi = createApi({
    reducerPath: "Miscellaneous-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Miscellaneous"],
    endpoints: (builder) => ({
      getAll: builder.query<miscellaneousRes, void>({
        query: () => ({
          url: `/miscellaneous`,
          method: "GET",
          providesTags: [{ type: "Miscellaneous", id: "List" }]
        }),
      }),
      
    }),
  });