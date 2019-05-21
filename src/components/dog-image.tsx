import "./dog-image.scss";

import React, { Component } from "react";

export interface IProps {
  url: string;
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
        <img src={this.props.url} onLoad={this.onImageLoad} />
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
