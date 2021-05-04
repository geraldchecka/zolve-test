import React from 'react';
import { SelectContainer } from "./camera.styled";

// TODO: memoize here or in index.jsx?

export default function Select({ sources, value, onChangeHandler }) {
  return (
    <SelectContainer value={value || ""} onChange={onChangeHandler}>
      <option disabled value="default" key="default">Select a device</option>
      {
        sources.map(function(device) {
          return (
            <option value={device.id} key={device.id}>{device.label || "Default"}</option>
          );
        })
      }
    </SelectContainer>
  );
}