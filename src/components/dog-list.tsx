import "./dog-list.scss";

import React, { Component } from "react";
import DogImage from "./dog-image";

export interface IProps {
  category: string;
  list: string[];
}

class DogList extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <div className="dog-list">
        {this.props.list &&
          this.props.list.map((item, index) => {
            return (
              <DogImage
                url={item}
                key={item}
                linkToSearch={`?category=${this.props.category}&id=${index}`}
              />
            );
          })}
      </div>
    );
  }
}
export default DogList;
