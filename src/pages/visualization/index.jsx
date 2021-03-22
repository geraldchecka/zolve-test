import React, { useEffect, useState } from "react";
import { getResults } from "../../globals/network";
import { Container, InputWrapper, InputControl, Label, Input } from './visualization.styled';
import ChartWrapper from "./chartWrapper";

// Return date in YYYY-MM-DD Format
function currentDate(_date) {
  let currDateObj = _date ? _date : new Date();
  let currMonth = currDateObj.getMonth() + 1;
  let currDate = currDateObj.getDate();

  if (currMonth < 10) {
    currMonth = `0${currMonth}`;
  }
  if (currDate < 10) {
    currDate = `0${currDate}`;
  }

  return currDateObj.getFullYear() + "-" + currMonth + "-" + currDate;
}

function makeURLParams(params) {
  return {
    ...params,
    fromdate: new Date(params.fromdate).getTime() / 1000,
    todate: new Date(params.todate).getTime() / 1000
  };
}

export default function Visualization() {
  const [params, setParams] = useState({
    fromdate: "2021-03-01",
    todate: currentDate(),
    pagesize: 100,
    page: 1,
  });
  const [results, updateResults] = useState();

  useEffect(function () {
    getResults(makeURLParams(params), function (response) {
      console.log(response);
      updateResults(response.items);
    });
  }, []);

  function onDateChange(ev) {
    let vad = ev.target.valueAsDate;
    if (vad) {
      vad.setHours(0,0,0,0);
      if (params.hasOwnProperty(ev.target.name)) {
        setParams({
          ...params,
          [ev.target.name]: currentDate(vad)
        });
      }
    }
  }

  function onPageChange(ev) {
    if (params.hasOwnProperty(ev.target.name)) {
      setParams({
        ...params,
        [ev.target.name]: parseInt(ev.target.value)
      });
    }
  }

  function fetchData() {
    getResults(makeURLParams(params), function(response) {
      updateResults(response.items);
    })
    
  }

  return (
    <Container>
      <InputWrapper>
        <InputControl>
          <Label>From</Label>
          <Input value={params.fromdate} type="date" name="fromdate" onChange={onDateChange} />
        </InputControl>
        <InputControl>
          <Label>To</Label>
          <Input value={params.todate} type="date" name="todate" onChange={onDateChange} />
        </InputControl>
        <InputControl>
          <Label>Page Size</Label>
          <Input value={params.pagesize} type="number" name="pagesize" min="1" onChange={onPageChange} />
        </InputControl>
        <InputControl>
          <Label>Page</Label>
          <Input value={params.page} type="number" name="page" min="1" onChange={onPageChange} />
        </InputControl>
        <InputControl>
          <button onClick={fetchData}>Run Query</button>
        </InputControl>
      </InputWrapper>
      { results === undefined ? null : <ChartWrapper data={results} />}
    </Container>
  );
}
