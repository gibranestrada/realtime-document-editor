import { CONNECT_WEBSOCKET } from "./websocketTypes";

export const websocket = payload => {
  return {
    type: CONNECT_WEBSOCKET,
    payload: payload
  };
};
