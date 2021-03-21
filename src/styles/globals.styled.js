import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  :root {
    // write media queries here
  }
`;

export const Global = styled.div`
  width: 100%;
  // This 70% width is only for large screens. For smaller devices, use full width
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const NavPanel = styled.ul`
  font-size: 16px;
  margin: 0 auto;
  background-color: #cccccc;
  line-height: 3rem;
  padding: 0;
  list-style-type: none;
  @media (max-width: 768px) {
    background-color: green;
  }
`;

export const NavWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  // overflow: hidden;
`;

export const NavSection = styled.li`
  width: calc(100%/3);
  display: inline-block;
  text-align: center;
  background-color: ${({ highlight = false }) => { return highlight === true ? "red": null }};
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .is-active {
    :hover {
      cursor: pointer;
    }
  }
`;

export const CustomLink = styled.a`
  width: calc(100%/3);
  display: inline-block;
  text-align: center;
  background-color: ${({ highlight = false }) => { return highlight === true ? "red": null }};
  text-decoration: none;
  color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  .is-active {
    :hover {
      cursor: pointer;
    }
  }
`;

export const Page = styled.div`
  margin: 4rem auto 0 auto;
  padding: 0 2rem;
`;