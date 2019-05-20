import "./not-found.scss";
import React, { Component } from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";

class NotFoundPage extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <section className="not-found-page">
        <Header />
        <p>Nothing to see here.</p>
        <p>
          <Link to="/">Take me back home!</Link>
        </p>
      </section>
    );
  }
}

export default NotFoundPage;
