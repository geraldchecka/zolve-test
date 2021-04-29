# Learning Notes
- navigator.mediaDevices.getUserMedia vs navigator.getUserMedia
  - The former one is the new API standard and W3 recommends its usage. Whereas the latter one was still being supported for legacy implementations.
  - The latter one supports callback based success and error response. Whereas the former one returns a promise response.
  - However, some browsers do return a Promise for the latter one, but it aint a standard implementation. Like more of a convenience.
https://www.w3.org/TR/mediacapture-streams/#mediadevices-interface-extensions