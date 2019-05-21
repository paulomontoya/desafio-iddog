import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { history } from "../history-creator";
import user from "./user";
import dogs from "./dogs";

export default combineReducers({
  router: connectRouter(history),
  user,
  dogs
});
