import React, { useEffect, useState, useRef } from "react";
import { Container, Button } from './camera.styled';
// import route specific css here

export default function Camera() {
  // const [player, setPlayer] = useState({ videoplayer: null });
  const cameraRef = useRef(null);

  const options = {
    video: {
      width: {
        min: 500
      },
      height: {
        max: 400
      },
      facingMode: "user"
    },
    audio: false
  };

  useEffect(function() {
    cameraRef.current = document.getElementById('player');
    navigator.mediaDevices.getUserMedia(options)
      .then(stream => {
        cameraRef.current.srcObject = stream;
      });
  }, []);

  return (
    <Container>
      <video id="player" controls autoPlay></video>
    </Container>
  )
}
