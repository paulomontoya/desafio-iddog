import "./header.scss";

import React, { Component } from "react";

class Header extends Component {
  constructor(props: any) {
    super(props);
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
