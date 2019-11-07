import { SET_USERNAME } from "./logInTypes";

export const setUsername = payload => {
  return {
    type: SET_USERNAME,
    payload: payload
  };
};
