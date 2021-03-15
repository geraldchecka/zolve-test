import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export const Global = styled.div`
  position: relative;
  width: 70%;
  // This 70% width is only for large screens. For smaller devices, use full width
  margin: 0 auto;
`;

export const Nav = styled.div`
  font-size: 16px;
  margin: 0 0 25px 0;
  background-color: rgba(128,128,128,0.39);
  line-height: 3rem;
`;

export const NavLink1 = styled.div`
  width: calc(100%/3);
  display: inline-block;
  text-align: center;
  background-color: ${({ highlight = false }) => { debugger; return highlight === true ? "red": null }};
  :hover {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;