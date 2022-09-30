import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import type { IApiError } from "../interfaces/IApiError";


import authSlice from "./slices/auth";

import { unauthenticatedMiddleware } from "./middleware/unauthenticated";
import { RESET_STATE_ACTION_TYPE } from "./actions/resetState";
import { authApi } from "./apis/auth";
import { garageApi } from "./apis/garagiste";
import{MiscellaneousApi} from "./apis/miscellaneous"
import { userApi } from "./apis/Users";
import { vehiculeApi } from "./apis/Vehicules";
import { marqueVehiculeApi } from "./apis/Marques";
import { PrestationApi } from "./apis/Prestations";
import { BookingApi } from "./apis/Bookings";
const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [garageApi.reducerPath]:garageApi.reducer,
  [MiscellaneousApi.reducerPath]:MiscellaneousApi.reducer,
  [userApi.reducerPath]:userApi.reducer,
  [vehiculeApi.reducerPath]:vehiculeApi.reducer,
  [marqueVehiculeApi.reducerPath]:marqueVehiculeApi.reducer,
  [PrestationApi.reducerPath]:PrestationApi.reducer,
  [BookingApi.reducerPath]:BookingApi.reducer,
  auth: authSlice.reducer,
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = undefined;
  }
  return reducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      unauthenticatedMiddleware,
      authApi.middleware,
      garageApi.middleware,
      MiscellaneousApi.middleware,
      userApi.middleware,
      vehiculeApi.middleware,
      marqueVehiculeApi.middleware,
      PrestationApi.middleware,
      BookingApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type MyBaseQueryFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  IApiError,
  {},
  FetchBaseQueryMeta
  
>;
