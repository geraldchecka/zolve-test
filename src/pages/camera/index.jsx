import React, { useEffect, useRef } from "react";
import Select from "./select";
import FacingMode from "./facingMode";
import useCamera from "./useCamera";
import useControls from "./useControls";
import { Container, ControlContainer, Button, Video } from "./camera.styled";

export default function Camera() {
  const [
    videoDevices,
    videoSource,
    refreshDeviceList,
    setVideoSource,
    facingMode,
    setFacingMode,
  ] = useControls();
  const cameraRef = useCamera(videoSource, facingMode);
  console.log("camera ref", cameraRef);
  console.log(videoDevices, videoSource);
  // Load a spinner until all the components have finished loading
  // Probaly a pipiline to detect loading state of all components in the tree.

  function videoSourceChangeHandler(event) {
    setVideoSource(event.target.value);
  }

  function facingModeChangeHandler(event) {
    setFacingMode(event.target.value);
  }

  // Run the code within an iframe with security permissions
  return (
    <Container>
      <ControlContainer>
        <Select sources={videoDevices} value={videoSource} onChangeHandler={videoSourceChangeHandler} />
        <FacingMode value={facingMode} onChangeHandler={facingModeChangeHandler} />
      </ControlContainer>
      {/* Move the video component into a separate component */}
      <Video>
        <video
          id="player"
          controls
          autoPlay
          playsInline 
          muted
          ref={cameraRef}
        />
      </Video>
    </Container>
  );
}
