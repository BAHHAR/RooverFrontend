import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFn, RootState } from "../..";
import { GaragistesRes,GarageIdReq,GarageRes,GaregeDelete,GarageBusinessHour,GaragePrest,ImageDelete,GaragePrestReq,GarageFindReq,GarageFindRes} from "./type";
import {queryBuilder} from '../../../util/queryBuilder'
import { IGaragiste } from "../../../interfaces/IGaragiste";


export const garageApi = createApi({
    reducerPath: "garage-api",
    baseQuery: fetchBaseQuery({
      baseUrl: `${process.env.REACT_APP_BACKEND_URL!}`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.tokens.access.token;
        if (token) headers.set("Authorization", `Bearer ${token}`);
        return headers;
      },
    }) as MyBaseQueryFn,
    tagTypes: ["Garage"],
    endpoints: (builder) => ({
      getAll: builder.query<GaragistesRes, void>({
        query: () => ({
          url: `/garage`,
          method: "GET",
          providesTags: [{ type: "Garage", id: "List" }]
        }),
      }),
      addGarage:builder.mutation<GarageRes,GarageRes>({
          query:(body)=>({
            url: `/garage`,
          method: "POST",
          body:body,
          invalidatesTags: [{ type: "Garage", id: "List" }],
          })
      }),
      getOneByID:builder.query<GarageRes, GarageIdReq>({
        query: ({id}) => ({
          url: `/garage/${id}`,
          method: "GET",
        }),
      }),
      addLogo:builder.mutation<GarageRes,FormData>({
        query:(body)=>({
          url: `/garage/garagelogo`,
        method: "POST",
        body:body,
        invalidatesTags: [{ type: "Garage", id: "List" }],
        })
    }),
    addImage:builder.mutation<GarageRes,FormData>({
      query:(body)=>({
        url: `/garage/garageimage`,
      method: "POST",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    addGaragePrest:builder.mutation<GarageRes,GaragePrest>({
      query:(body)=>({
        url: `/garage/prestation`,
      method: "POST",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    getPrestations:builder.query<GaragePrestReq,void>({
      query:()=>({
        url: `/garage/prestation`,
      method: "GET",
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    addBusinesshour:builder.mutation<GarageRes,GarageBusinessHour>({
      query:(body)=>({
        url: `/businesshour`,
      method: "POST",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    updateGarage:builder.mutation<GarageRes,GarageRes>({
      query:(body)=>({
        url: `/`,
      method: "PUT",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    ImageDelete:builder.mutation<void,ImageDelete>({
      query:(body)=>({
        url: `/deleteImage`,
      method: "DELETE",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    DeleteGarage:builder.mutation<void,GaregeDelete>({
      query:({id})=>({
        url: `/garage/${id}`,
      method: "DELETE",
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    FindGarages:builder.mutation<GarageFindRes[],GarageFindReq>({
      query:(body)=>({
        url: `/findgarages`,
      method: "POST",
      body:body,
      invalidatesTags: [{ type: "Garage", id: "List" }],
      })
    }),
    }),
  });