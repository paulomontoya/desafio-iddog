import React from "react";
import ReactDOM from "react-dom";
import SignupPage from "./signup";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignupPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
