import { useEffect, useRef, useState, useMemo } from 'react';
import { getAllDevices } from './mediaWrapper';

export default function useControls() {
  const [videoDevices, setVideoDevice] = useState([]);
  const [videoSource, setVideoSource] = useState(null);
  const [facingMode, setFacingMode] = useState("user");

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

  useEffect(function() {
    refreshDeviceList();
  }, []);

  return [videoDevices, videoSource, refreshDeviceList, setVideoSource, facingMode, setFacingMode];
}