import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./Header.scss";

class Header extends Component {
  public dom: any;
  constructor(props: any) {
    super(props);
    this.dom = {};
  }
  componentDidMount() {
    this.dom.root = ReactDOM.findDOMNode(this);
  }
  render() {
    return (
      <header className="header">
        <h1>
          The <span>IDDog</span>
        </h1>
      </header>
    );
  }
}
export default Header;
