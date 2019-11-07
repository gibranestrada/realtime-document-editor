import { combineReducers } from "redux";
import logInReducer from "./login/logInReducers";
import websocketReducer from "./websocket/websocketReducers";
import clientReducer from "./client/clientReducers";
import {
  userActivityReducer,
  currentUsersReducer,
  textReducer
} from "./serverdata/serverDataReducers";

const rootReducer = combineReducers({
  logInReducer,
  clientReducer,
  websocketReducer,
  userActivityReducer,
  currentUsersReducer,
  textReducer
});

export default rootReducer;
