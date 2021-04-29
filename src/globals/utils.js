/**
 * Serializes all the URL query parameters
 * @param {Object} obj A key-value pair of all URL parameters
 * @returns 
 */
export const serialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

/**
 * Checks a string against a valid URL regex
 * @param {String} str A string to compare against
 * @returns {Boolean} Whether it is a valid URL or not.
 */
export const validUrl = function(str) {
  const urlRegex = /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/;
  return urlRegex.test(str);
}

/**
 * Formats and returns an error object for consumption with UI layer
 * @param {Object} error Contains the error object
 * @returns {Object}
 */
export const generateError = function(error) {
  let errorType = {
    name: "",
    message: ""
  };

  function setErrorType(name = "", msg = "") {
    errorType.name = error.name;
    errorType.message = error.message;
  }

  switch(error.name) {
    case "NotAllowedError":
      console.error(error.message);
      setErrorType(error.name, error.message);
      break;
    case "OverconstrainedError":
      console.error(error.message);
      setErrorType(error.name, error.message);
      break;
    default:
      console.error(
        error.name,
        error.message,
        "https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#exceptions"
      );
      setErrorType(error.name, error.message);
      break;
  }
  return errorType;
}