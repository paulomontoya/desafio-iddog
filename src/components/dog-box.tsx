import "./dog-box.scss";

import React, { Component } from "react";
import { history } from "../history-creator";

export interface IProps {
  list?: [];
  selected?: {
    category: string;
    index: number;
  };
}

class DogBox extends Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  private closeBox = () => {
    history.push(`/feed?category=${this.props.selected!.category}`);
  };

  render() {
    let aditionalClassName = "";
    if (this.props.list && this.props.selected) {
      aditionalClassName = "active";
    }
    return (
      <div className={`dog-box ${aditionalClassName}`} onClick={this.closeBox}>
        {this.props.list && this.props.selected && (
          <figure>
            <img src={this.props.list[this.props.selected.index]} />
          </figure>
        )}
      </div>
    );
  }
}
export default DogBox;
