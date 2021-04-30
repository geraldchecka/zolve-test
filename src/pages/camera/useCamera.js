import React, { useEffect, useRef, useState } from 'react';
import { getUserMedia, getAllDevices } from './mediaWrapper';

// write a custom eslint rule to throw error if anyone uses navigator.getUserMedia apart from mediaWrapper.js

export default function useCamera() {
  const cameraRef = useRef(null);
  // What all cameras or audio can be accessed?

  useEffect(function() {
    // console.log(
    //   getAllDevices()
    //     .then(res => {
    //       debugger;
    //       // response.deviceCount
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       debugger;
    //       console.log(err);
    //     })
    // );
    getUserMedia()
      .then(stream => {
        setTimeout(function() {
          cameraRef.current.srcObject = stream;
          console.log("I have been invoked");
        }, 2000);
      })
      .catch(function(err) {
        console.error(err);
      });
    }, []);

  return cameraRef;
}