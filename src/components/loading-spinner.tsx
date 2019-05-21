import "./loading-spinner.scss";

import React, { Component, CSSProperties } from "react";

export interface IProps {
  style?: CSSProperties;
}

class LoadingSpinner extends Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div className="loading-spinner" style={this.props.style} />;
  }
}
export default LoadingSpinner;
