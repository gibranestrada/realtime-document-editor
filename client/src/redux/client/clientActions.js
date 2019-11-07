import { UPDATE_CLIENT } from "./clientTypes";

export const client = payload => {
  return {
    type: UPDATE_CLIENT,
    payload: payload
  };
};
