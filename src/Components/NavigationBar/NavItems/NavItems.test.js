import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it("Should render two <NavItems/> element if user is not authenticated", () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
  it("Should render three <NavItems/> element if user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });
  it("Should render logout link if user is authenticated", () => {
    // wrapper = shallow(<NavItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavItem link={"/logout"}>Logout</NavItem>));
  });
});
