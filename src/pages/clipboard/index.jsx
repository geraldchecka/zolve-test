import React, { useState } from "react";
import { validUrl } from "../../globals/utils";
import { Container, InputWrapper, InputControl, Label, Input, Button, DisplayValue, ClipValue } from './clipboard.styled';

function formatQueryValue(url) {
  // check only if its valid URL
  if (validUrl(url)) {
    return new URL(url).searchParams.getAll("q");
  }
  return null;
}

export default function Clipboard() {
  const [url, setURL] = useState();

  function onItemChange(ev) {
    console.log(ev.target.value);
    setURL(ev.target.value);
    ev.preventDefault();
  }

  var urlResult = url ? formatQueryValue(url) : null;

  return (
    <Container>
      <InputWrapper>
        <InputControl>
          <Label>Input</Label>
          <Input defaultValue={url} type="text" name="clipboardvalue" onChange={onItemChange} />
        </InputControl>
        <InputControl>
          <Button onClick={() => {}}>Copy to Clipboard</Button>
        </InputControl>
        <DisplayValue>
          <Label>q:</Label>
          <ClipValue>
            {urlResult && urlResult.map((item, i) => {
              return <span key={i} style={{ marginRight: "10px" }}>{item}</span>;
            })}
          </ClipValue>
        </DisplayValue>
      </InputWrapper>
    </Container>
  )
}
