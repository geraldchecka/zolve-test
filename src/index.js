import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './globals/app';

function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

ReactDOM.render(<Root />, document.getElementById("app-root"));