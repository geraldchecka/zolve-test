/** @module mediaWrapper Contains helper functions that help run camera application */
import { generateError } from '../../globals/utils';

/**
 * @namespace {object} supports
 * @property {boolean} status - Denotes whether the corresponding 'type' is supported or not
 * @property {string} type    - What type of API is supported
 */
const supports = {
  getUserMedia: {
    status: false,
    type: "",
  },
  enumerateDevices: {
    status: false,
    type: "modern",
  },
  getSupportedConstraints: {
    status: false,
    type: "modern",
  }
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
  // Check for getUserMedia
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    supports.getUserMedia.status = true;
    supports.getUserMedia.type = "modern";
  }
  else if ('getUserMedia' in navigator) {
    supports.getUserMedia.status = true;
    supports.getUserMedia.type = "legacy";
  }

  // Check for enumerateDevices
  if ('mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices) {
    supports.enumerateDevices.status = true;
    supports.enumerateDevices.type = "modern";
  }

  // Check for getSupportedConstraints
  if ('mediaDevices' in navigator && 'getSupportedConstraints' in navigator.mediaDevices) {
    supports.getSupportedConstraints.status = true;
    supports.getSupportedConstraints.type = "modern";
  }
}

/**
 * Method to check if an API is supported by the browser. Only getUserMedia dn enumerateDevices are supported by this public method.
 * @param {String} query Parameter to be searched on
 * @return {Array[Boolean, String]} Returns an array containing two values. boolean on the query. On an unsuccessful query, undefined and query are returned.
 */
const isSupported = function(query = "") {
  if (query === "getUserMedia") {
    return [supports.getUserMedia.status, supports.getUserMedia.type];
  }
  else if (query === "enumerateDevices") {
    return [supports.enumerateDevices.status, supports.enumerateDevices.type];
  }
  else if (query === "getSupportedConstraints") {
    return [supports.getSupportedConstraints.status, supports.getSupportedConstraints.type];
  }
  return [undefined, query];
}

/**
 * An object containing basic constraints supported by all popular browsers.
 * @returns {Object} Contains the necessary constraints
 */
 export const getConstraints = function() {
  return {
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
      facingMode: {
        exact: "environment"
      },
      deviceId: {
        exact: null
      },
    },
    audio: true,
  };
}

/**
 * List of all supported webcam devices
 * @returns {Object} Contains list of devices segregated as audio or video.
 */
export const getAllDevices = async function() {
  const [status, type] = isSupported("enumerateDevices");
  let devices = [];
  
  function getTemplate(id, groupId, label) {
    return {
      id,
      groupId,
      label,
    };
  }

  try {
    devices = await navigator.mediaDevices.enumerateDevices();
  }
  catch(e) {
    devices = [];
    console.error(generateError(e));
  }

  return devices.reduce((acc, { deviceId, groupId, kind, label }, _idx, items) => {
    if (kind === "audioinput") {
      acc.audio.input.push(getTemplate(deviceId, groupId, label));
    }
    else if (kind === "audiooutput") {
      acc.audio.output.push(getTemplate(deviceId, groupId, label));
    }
    else if (kind === "videoinput") {
      acc.video.input.push(getTemplate(deviceId, groupId, label));
    }
    acc.deviceCount = items.length;

    return acc;
  }, {
    audio: {
      input: [],
      output: []
    },
    video: {
      input: [],
    },
    deviceCount: 0,
  });
}

/**
 * 
 * @returns {Object} Contains the properties of all supported constraints as supported by the browser
 */
export const getSupportedConstraints = function() {
  const [status, type] = isSupported("getSupportedConstraints");
  let constraints = {};
  try {
    constraints = navigator.mediaDevices.getSupportedConstraints();
  }
  catch(error) {
    console.error(generateError(error));
  }
  return constraints;
}

/**
 * This function is an abstraction for getUserMedia, to support both modern and legacy browsers.
 * @param {Object} constraints Contains all the constraints that will be supported
 * @returns {Object} Promise
 */
export const getUserMedia = async function (constraints) {
  let returnPromise;
  
  returnPromise = new Promise((resolve, reject) => {
    const [status, type] = isSupported("getUserMedia");

    function successCB(response) {
      console.log(response);
      resolve(response);
    }

    function failureCB(error) {
      console.error(error);
      reject(generateError(error));
    }

    try {
      if (type === "legacy" && status === true) {
        navigator.getUserMedia(constraints, successCB, failureCB);
      }
      else if (type === "modern" && status === true) {
        navigator.mediaDevices.getUserMedia(constraints)
          .then(successCB)
          .catch(failureCB);
      }
    }
    catch(e) {
      reject(generateError(e));
    }
  });

  return returnPromise;
}

// Do this immediately on as soon as the module loads
patchMediaDevices();
checkBrowserSupport();