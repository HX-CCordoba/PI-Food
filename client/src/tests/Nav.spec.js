import React from "react";
import { Link } from "react-router-dom";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Nav from "../src/components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
  let nav;
  beforeEach(() => {
    nav(<Nav />);
    expect(isReact.classComponent(Nav)).toBeTruthy();
  });

  it('Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/products/create"', () => {
    // Podes importar el componente Link de react-router-dom.
    expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
    expect(nav.find(Link).at(0).prop("to")).toEqual("/");
    expect(nav.find(Link).at(1).prop("to")).toEqual("/products/create");
  });

  it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/"', () => {
    // El orden en el que se declaran los Links es importante!
    expect(nav.find(Link).at(0).prop("to")).toEqual("/");
    expect(nav.find(Link).at(0).text()).toEqual("Home");
  });

  it('Debería tener un segundo Link, con texto "Create Product" y que cambie la ruta hacia "/product/create"', () => {
    expect(nav.find(Link).at(1).prop("to")).toEqual("/products/create");
    expect(nav.find(Link).at(1).text()).toEqual("Create Product");
  });
});
