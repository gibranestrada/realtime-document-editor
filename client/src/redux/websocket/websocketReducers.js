import { CONNECT_WEBSOCKET } from "../websocket/websocketTypes";

const initialState = { websocketConnected: false };

const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      return {
        ...state,
        websocketConnected: action.payload.websocketConnected
      };
    default:
      return state;
  }
};

export default websocketReducer;
