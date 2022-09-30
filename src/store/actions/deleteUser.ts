import { createAction } from "@reduxjs/toolkit";

export const DELETE_USER_ACTION_TYPE = "deleteUser";
export const deleteUserAction = createAction(DELETE_USER_ACTION_TYPE, () => {
  return { payload: null };
});