import { shallow } from "enzyme";
import { createBrowserHistory } from "history";
import * as React from "react";
import { Router } from "react-router-dom";
import DogImage from "./dog-image";

describe("<DogImage/>", () => {
  const setUp = () => {
    const component = shallow(
      <Router history={createBrowserHistory()}>
        <DogImage
          url={"http://placehold.it/100x100"}
          linkToSearch={`?category=husky&id=0`}
        />
      </Router>
    );
    return component;
  };

  it("renders img", () => {
    const wrapper = setUp();
    expect(
      wrapper
        .render()
        .find("img")
        .attr("src")
    ).toEqual("http://placehold.it/100x100");
  });

  it("renders link", () => {
    const wrapper = setUp();
    expect(wrapper.render().find("a").length).toBe(1);
    expect(
      wrapper
        .render()
        .find("a")
        .attr("href")
    ).toBe(`/feed?category=husky&id=0`);
  });
});
