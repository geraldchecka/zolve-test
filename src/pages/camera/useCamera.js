import React, { useEffect, useRef, useState } from 'react';
import { getUserMedia, getConstraints, getSupportedConstraints } from './mediaWrapper';

// write a custom eslint rule to throw error if anyone uses navigator.getUserMedia apart from mediaWrapper.js

export default function useCamera(videoSource, facingMode) {
  const cameraRef = useRef(null);
  const [ supportedConstraints ] = useState(function() {
    return getSupportedConstraints();
  });

  useEffect(function() {
    let constraints = getConstraints();
    constraints.video.deviceId.exact = videoSource;
    constraints.video.facingMode = facingMode;
    console.log("Inside usermera useEffect", videoSource, facingMode);

    if (videoSource !== null) {
      getUserMedia(constraints)
        .then(stream => {
          cameraRef.current.srcObject = stream;
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  }, [videoSource, facingMode]);

  return cameraRef;
}