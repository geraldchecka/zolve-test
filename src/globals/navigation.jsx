import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavPanel, NavSection, NavWrapper, CustomLink } from '../styles/globals.styled';

export default function Navigation() {
  const loc = useLocation();

  return (
    <NavWrapper>
      <NavPanel>
        <NavigationLink to="/visualization">Visualization</NavigationLink> 
        <NavigationLink to="/clipboard">Clipboard</NavigationLink> 
        <NavigationLink to="/camera">Camera</NavigationLink> 
      </NavPanel>
    </NavWrapper>
  )
}

function NavigationLink(props) {
  const loc = useLocation();
  const highlight = loc.pathname.split("/")[1] === props.to.split("/")[1];

  return (
    <CustomLink href={props.to} highlight={highlight}>
      {props.children}
    </CustomLink>
  );
}
