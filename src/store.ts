import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import { history } from "./history-creator";
import rootReducer from "./modules";

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const windowEl: any = window;
  const devToolsExtension = windowEl.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export let store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers
);
export let persistor = persistStore(store);
