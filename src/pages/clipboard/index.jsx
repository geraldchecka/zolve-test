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

  function copyToClipboard() {
    const clipID = document.getElementById("clip-value");
    const el = document.createElement('textarea');
    el.value = clipID.textContent;
    document.body.appendChild(el);
    el.select();
    el.focus();
    try {
      let status = document.execCommand("copy");
      document.body.removeChild(el);
     }
     catch(e) {
       console.error("Error clipping content", e);
     }
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
          <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
        </InputControl>
        <DisplayValue>
          <Label>q:</Label>
          <ClipValue id="clip-value">
            {urlResult && urlResult.join(" ")}
          </ClipValue>
        </DisplayValue>
      </InputWrapper>
    </Container>
  )
}
