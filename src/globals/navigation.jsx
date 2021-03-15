import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavPanel, NavSection } from '../styles/globals.styled';

export default function Navigation() {
  const loc = useLocation();

  return (
    <NavPanel>
      <NavigationLink to="/visualization">Visualization</NavigationLink> 
      <NavigationLink to="/clipboard">Clipboard</NavigationLink> 
      <NavigationLink to="/camera">Camera</NavigationLink> 
    </NavPanel>
  )
}

function NavigationLink(props) {
  const loc = useLocation();
  const highlight = loc.pathname.split("/")[1] === props.to.split("/")[1];

  return (
    <NavSection highlight={highlight}>
      <NavLink {...props} activeClassName="is-active" />
    </NavSection>
  );
}
