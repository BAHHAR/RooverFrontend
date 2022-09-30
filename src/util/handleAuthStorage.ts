import { loginRes } from "../store/apis/auth/types";

const KEY = "auth";
export const getToken = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY)!) as loginRes;
    return data.tokens.access.token;
  } catch (error) {
    return "";
  }
};

export const getAuth = () => {
  try {
    const data = JSON.parse(localStorage.getItem(KEY)!) as loginRes;
    return data;
  } catch (error) {
    return "";
  }
};
export const storeAuth = (data: loginRes) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAuth = () => {
  try {
    localStorage.removeItem(KEY);
    return true;
  } catch (error) {
    return false;
  }
};
