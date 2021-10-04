import React from "react";
import { SelectContainer } from "./camera.styled";

export default function FacingMode({ value, onChangeHandler, supoprtedConstraints }) {
  console.log(supoprtedConstraints);
  return (
    <SelectContainer value={value} onChange={onChangeHandler}>
      <option disabled value="select">Select</option>
      <option value="user">Front Camera</option>
      <option value="environment" disabled>Rear Camera</option>
    </SelectContainer>
  );
}