import "./index.scss";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { store, persistor } from "./store";
import { history } from "./history-creator";
import { PersistGate } from "redux-persist/integration/react";
import { Route, Switch } from "react-router-dom";
import LoadingSpinner from "./components/loading-spinner";
import SignupPage from "./containers/signup";
import NotFoundPage from "./containers/not-found";

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={SignupPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.querySelector("#root")
);
