import { UPDATE_CLIENT } from "../client/clientTypes";

const initialState = { client: "" };

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CLIENT:
      return {
        ...state,
        client: action.payload.client
      };
    default:
      return state;
  }
};

export default clientReducer;
