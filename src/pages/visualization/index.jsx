import React, { useEffect, useState } from "react";
import { searchMovies, getMovies } from "../../globals/network";
import { Container, InputWrapper, InputControl, Label, Input } from './visualization.styled';

// Return date in YYYY-MM-DD Format
function currentDate(_date) {
  let currDate = _date ? _date : new Date();
  let currMonth = currDate.getMonth() + 1;
  if (currMonth < 10) {
    currMonth = `0${currMonth}`;
  }
  
  return currDate.getFullYear() + "-" + currMonth + "-" + currDate.getDate();
}

export default function Visualization() {
  const [params, setParams] = useState({
    fromdate: currentDate(),
    todate: currentDate(),
    pagesize: 100,
    page: 1,
  });

  useEffect(function () {
    getMovies({}, function (response) {
      // debugger;
      console.log(response.results);
      // updateMovieList(function (currState) {
      //   debugger;
      //   const newState = {
      //     ...currState,
      //     fullList: currState.fullList.concat(response.results)
      //   };
      //   return newState;
      // });
    });
  }, []);

  function onDateChange(ev) {
    let vad = ev.target.valueAsDate;
    vad.setHours(0,0,0,0);
    if (params.hasOwnProperty(ev.target.name)) {
      setParams({
        ...params,
        [ev.target.name]: currentDate(vad)
      });
    }
  }

  function onPageChange(ev) {
    debugger;
    if (params.hasOwnProperty(ev.target.name)) {
      setParams({
        ...params,
        [ev.target.name]: parseInt(ev.target.value)
      });
    }
  }
  console.log(params.pagesize, params.page);
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
      </InputWrapper>
    </Container>
  );
}
