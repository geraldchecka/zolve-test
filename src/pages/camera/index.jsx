import React, { useEffect, useRef } from "react";
import { Container, Button } from './camera.styled';
import useCamera from "./useCamera";

export default function Camera() {
  const cameraRef = useCamera();
  // Load a spinner until all the components have finished loading
  // Probaly a pipiline to detect loading state of all components in the tree.

  // Run the code within an iframe with security permissions
  return (
    <Container>
      <video
        id="player"
        controls
        autoPlay
        playsInline 
        muted
        ref={cameraRef} />
    </Container>
  )
}
