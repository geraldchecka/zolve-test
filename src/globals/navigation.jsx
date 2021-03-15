import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <NavLink to="/visualization">Visualization</NavLink> 
      <NavLink to="/clipboard">Clipboard</NavLink> 
      <NavLink to="/camera">Camera</NavLink> 
    </div>
  )
}

function NavLink(props) {
  return <Link {...props} />;
}