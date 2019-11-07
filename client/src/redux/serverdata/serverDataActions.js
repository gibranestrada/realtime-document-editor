import { UPDATE_CURRENT_USERS } from "./serverDataTypes";
import { UPDATE_USER_ACTIVITY } from "./serverDataTypes";
import { UPDATE_TEXT } from "./serverDataTypes";

export const currentUsers = payload => {
  return {
    type: UPDATE_CURRENT_USERS,
    payload: payload
  };
};

export const userActivity = payload => {
  return {
    type: UPDATE_USER_ACTIVITY,
    payload: payload
  };
};

export const text = payload => {
  return {
    type: UPDATE_TEXT,
    payload: payload[0]
  };
};
