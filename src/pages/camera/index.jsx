import React, { useEffect, useRef } from "react";
import { Container, Button } from './camera.styled';
import useCamera from "./useCamera";

export default function Camera() {
  const cameraRef = useCamera({});

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
