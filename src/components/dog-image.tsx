import "./dog-image.scss";

import React, { Component } from "react";
import { Link } from "react-router-dom";

export interface IProps {
  url: string;
  linkToSearch: string;
}
export interface IState {
  aditionalClassName: string;
}

class DogImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      aditionalClassName: ""
    };
  }

  render() {
    return (
      <div className={`dog-image ${this.state.aditionalClassName}`}>
        <Link
          to={{
            pathname: "/feed",
            search: this.props.linkToSearch
          }}
        >
          <figure>
            <img src={this.props.url} onLoad={this.onImageLoad} />
          </figure>
        </Link>
      </div>
    );
  }

  private onImageLoad = () => {
    this.setState({
      aditionalClassName: "loaded"
    });
  };
}
export default DogImage;
