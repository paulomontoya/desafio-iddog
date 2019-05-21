import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import "./not-found.scss";

class NotFoundPage extends Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
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
