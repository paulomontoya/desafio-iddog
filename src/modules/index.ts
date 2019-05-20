import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import user from "./user";
import { history } from "../history-creator";

export default combineReducers({
  router: connectRouter(history),
  user
});
