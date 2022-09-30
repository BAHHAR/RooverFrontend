import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { deleteAuth } from "../../util/handleAuthStorage";
import { resetStateAction } from "../actions/resetState";

export const unauthenticatedMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      deleteAuth();
      dispatch(resetStateAction());
    }
    return next(action);
  };
