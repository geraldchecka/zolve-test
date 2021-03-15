import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav, NavLink1 } from '../styles/globals.styled';

export default function Navigation() {
  const loc = useLocation();

  return (
    <Nav>
      <NavigationLink to="/visualization">Visualization</NavigationLink> 
      <NavigationLink to="/clipboard">Clipboard</NavigationLink> 
      <NavigationLink to="/camera">Camera</NavigationLink> 
    </Nav>
  )
}

function NavigationLink(props) {
  const loc = useLocation();
  const highlight = loc.pathname.split("/")[1] === props.to.split("/")[1];

  return (
    <NavLink1 highlight={highlight}>
      <NavLink {...props} activeClassName="is-active" />
    </NavLink1>
  );
}
