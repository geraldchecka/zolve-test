import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
// import route specific css here

export default function Clipboard() {
  const hello = useLocation();
  return <div>App Clipboard</div>
}
