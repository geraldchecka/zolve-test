/** @module mediaWrapper Contains helper functions that help run camera application */
import { generateError } from '../../globals/utils';

/**
 * @namespace {object} supports
 * @property {boolean} status - Denotes whether the corresponding 'type' is supported or not
 * @property {string} type    - What type of API is supported
 */
let supports = {
  status: false,
  type: ""
};

/**
 * As part of feature detection, generalize the cross-browser mediaDevices API.
 * @function patchMediaDevices
 * @return {undefined} Doesn't return anything. Primarily used to patch the default mediaDevices API
 */
const patchMediaDevices = function() {
  navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
}

 /**
  * Check if the current browser supports mediaDevices and the relevant API.
  * @returns {undefined} Updates the supports namespace object
  */
const checkBrowserSupport = function() {
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    supports.status = true;
    supports.type = "modern";
  }
  else if ('getUserMedia' in navigator) {
    supports.status = true;
    supports.type = "legacy";
  }
}

/**
 * List of all supported webcam devices
 * @returns {Object} Contains list of devices segregated as audio or video.
 */
export const getAllDevices = async function() {
  let devices = await navigator.mediaDevices.enumerateDevices();

  function getTemplate(id, groupId, label) {
    return {
      id,
      groupId,
      label,
    };
  }

  return devices.reduce((acc, { deviceId, groupId, kind, label }, _idx, items) => {
    if (kind === "audioinput") {
      acc.audio.input[deviceId] = getTemplate(deviceId, groupId, label);
    }
    else if (kind === "audiooutput") {
      acc.audio.output[deviceId] = getTemplate(deviceId, groupId, label);
    }
    else if (kind === "videoinput") {
      acc.video.input[deviceId] = getTemplate(deviceId, groupId, label);
    }
    acc.deviceCount = items.length;

    return acc;
  }, {
    audio: {
      input: {},
      output: {}
    },
    video: {
      input: {},
    },
    deviceCount: 0,
  });
}

export const getUserMedia = async function (constraints) {
  let returnPromise;
  
  returnPromise = new Promise((resolve, reject) => {
    function successCB(response) {
      resolve(response);
    }

    function failureCB(error) {
      console.log(error);
      reject(generateError(error));
    }

    if (supports.type === "legacy" && supports.status === true) {
      navigator.getUserMedia(constraints, successCB, failureCB);
    }
    else if (supports.type === "modern" && supports.status === true) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(successCB)
        .catch(failureCB);
    }
  });

  return returnPromise;
}

checkBrowserSupport();

patchMediaDevices();