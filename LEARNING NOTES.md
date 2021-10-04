# Learning Notes
- navigator.mediaDevices.getUserMedia vs navigator.getUserMedia
  - The former one is the new API standard and W3 recommends its usage. Whereas the latter one was still being supported for legacy implementations.
  - The latter one supports callback based success and error response. Whereas the former one returns a promise response.
  - However, some browsers do return a Promise for the latter one, but it aint a standard implementation. Like more of a convenience.
https://www.w3.org/TR/mediacapture-streams/#mediadevices-interface-extensions


# To DO
- Content is tiny in high resolution displays
- Fix the nav CSS to support small resolutions
- Fix the nav design; accommodate icons in mobile devices
- Wasted re-renders in index.jsx (~6). Figure out why it is rendering so many times
- Use loadable or suspense for async loading
- codesplit and chunk all the assets
- Cache the chunked assets in the UI
- styledcomponent component architecture; make use of SC patterns, 'transient props, showForwardProps config'
- architect your CSS (SMACS, S-C etc...)

# Temp
- [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "development": true,
        "importSource": "@welldone-software/why-did-you-render"
      }
    ]