// import './wdyr';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './globals/app';
import { GlobalStyle } from './styles/globals.styled';

function Root() {
  return (
    <StrictMode>
      <GlobalStyle />
      <App />
    </StrictMode>
  )
}

ReactDOM.render(<Root />, document.getElementById("app-root"));