// Must be a require 'cause import history/createBrowserHistory will be deprecated
// tslint:disable-next-line:no-var-requires
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();
