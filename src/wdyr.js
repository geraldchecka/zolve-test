import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const useControls = require("./pages/camera/useControls");
  const useCamera = require("./pages/camera/useCamera");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
      [useControls, 'useControls'],
      [useCamera, 'useCamera']
    ]
  });
}