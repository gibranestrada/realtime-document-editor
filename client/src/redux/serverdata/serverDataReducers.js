import { UPDATE_CURRENT_USERS } from "../serverdata/serverDataTypes";
import { UPDATE_USER_ACTIVITY } from "../serverdata/serverDataTypes";
import { UPDATE_TEXT } from "../serverdata/serverDataTypes";

const initialState = {
  text: ""
};
const initState = {
  currentUsers: {}
};
const activityState = {
  userActivity: {}
};

export const currentUsersReducer = (state = initState, action) => {
  if (action.payload === undefined) return state;

  switch (action.type) {
    case UPDATE_CURRENT_USERS:
      return {
        ...state,
        currentUsers: action.payload
      };
    default:
      return state;
  }
};

export const userActivityReducer = (state = activityState, action) => {
  if (action.payload === undefined) return state;
  switch (action.type) {
    case UPDATE_USER_ACTIVITY:
      return {
        ...state,
        userActivity: action.payload
      };
    default:
      return state;
  }
};

export const textReducer = (state = initialState.text, action) => {
  if (action.payload === undefined) return state;
  switch (action.type) {
    case UPDATE_TEXT:
      return action.payload;
    default:
      return state;
  }
};
