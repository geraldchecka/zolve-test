// Responsiveness
  // camera window should snugly fit into the mobile screen
  // should be able to switch between forward or reverse cameras
  // capture selfie or photo on either of the cameras
  // should be able to crop

// User should be able to take selfie with webcam and crop the photo or select circle area of face and upload
// canvas

// Since this module is conditional on camera permissions etc..., we should conditionally render some part of this component
import React, { useEffect, useState, useRef } from "react";

export default function Selfie(){
  const [snapshot, setSnapshot] = useState(null);
  const videoFeedRef = useRef(null);

  useEffect(() => {
    // TODO: This will succeed only of the camera object is available and running
    // Cases: Still waiting for user to approve camera permissions, blocked, image still loading etc...
    videoFeedRef.current = document.querySelector("#camera");
  }, []);
  
  function snapPicture() {
    const croppedImageCanvas = document.querySelector("#imageCanvas");
    console.log(croppedImageCanvas.getContext("2d").drawImage(videoFeedRef.current, 0, 0, croppedImageCanvas.width, croppedImageCanvas.height));
    setSnapshot(croppedImageCanvas);
  }

  return (
    <>
      <button onClick={snapPicture}>Snap</button>
    </>
  )
}