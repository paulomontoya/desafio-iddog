import "./dog-list.scss";

import React, { Component } from "react";
import DogImage from "./dog-image";

export interface IProps {
  list: [];
}

class DogList extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className="dog-list">
        {this.props.list &&
          this.props.list.map(item => {
            return <DogImage url={item} key={item} />;
          })}
      </div>
    );
  }
}
export default DogList;
