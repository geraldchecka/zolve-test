import React, { useEffect, useRef, useState } from 'react';
import { getUserMedia, getAllDevices } from './mediaWrapper';

// write a custom eslint rule to throw error if anyone uses navigator.getUserMedia apart from mediaWrapper.js

// Apart from allowed or blocked lookup, also find out if we are in a limbo state (user neither ignore access dialog)
function checkForPermission() {}

export default function useCamera(...otherOptions) {
  // console.log(patchMediaDevices, hasBrowserSupport);
  // Do all necessary check and only then initiate ref
  
  const cameraRef = useRef(null);
  // const mediaState = useState(function() {
    // debugger;
    // const availability = checkForAvailability();
    // const permission = checkForPermission();
  // });
  // const devices = useState(function() {
  //   const devices = getAllCameraDevices();
  // });

  // Also called as constraints by the browser
  const options = {
    video: {
      width: {
        min: 640,
        max: 1280,
        ideal: 640,
      },
      height: {
        min: 480,
        max: 720,
        ideal: 480,
      },
      facingMode: "user"
    },
    audio: true,
    ...options,
  };

  // check if the user has enabled accessing media devices. If yes, what all devices
  // check if webcam is given a permission access
  // What all cameras or audio can be accessed?

  useEffect(function() {
    // console.log(
      // getAllDevices()
      //   .then(res => {
      //     debugger;
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     debugger;
      //     console.log(err);
      //   })
    // );
    getUserMedia(options)
      .then(stream => {
        debugger;
        cameraRef.current.srcObject = stream;
        console.log("I have been invoked");
      })
      .catch(function(err) {
        console.log(err);
      });
    }, []);

  return cameraRef;
}