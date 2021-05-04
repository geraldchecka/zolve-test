import { useEffect, useRef, useState, useMemo } from 'react';
import { getAllDevices, getSupportedConstraints } from './mediaWrapper';

export default function useControls() {
  const [videoDevices, setVideoDevice] = useState([]);
  const [videoSource, setVideoSource] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  // const [videoOevices, setVideoDevices] = useState({});

  function refreshDeviceList() {
    getAllDevices()
      .then(response => {
        setVideoDevice(response.video.input);
        setVideoSource(response.video.input?.[0]?.id);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function refreshConstraints() {
    let constraints = getSupportedConstraints();
    console.log(constraints);
      // .then(response => {
      //   setVideoDevice(response.video.input);
      //   setVideoSource(response.video.input?.[0]?.id);
      // })
      // .catch(error => {
      //   console.error(error);
      // });
  }

  useEffect(function() {
    refreshDeviceList();
    refreshConstraints();
  }, []);

  return [videoDevices, videoSource, refreshDeviceList, setVideoSource, facingMode, setFacingMode];
}