import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { history } from "../history-creator";
import dogs from "./dogs";
import user from "./user";

export default combineReducers({
  router: connectRouter(history),
  dogs,
  user
});
