import React, { useEffect } from "react";
import { useState } from "react";
import { TypographyTextLarge } from "../StyledComponents/StyledComponents ";
import {  Grid } from "@mui/material";
import { useDispatch } from "react-redux";

const Timer = () => {
  // console.log("timer");
  const dispatch = useDispatch();
   
  const initialMin = 2;
  const initialSec = 0;
  const [min, setMin] = useState(initialMin);
  const [sec, setSec] = useState(initialSec);

  useEffect(() => {
    let intervalId;
    // console.log("timer...");
    intervalId = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(intervalId);
          dispatch({ type: "ENABLE_RESEND" });
       } else {
          setMin(min - 1);
          setSec(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <>
      <Grid container>
        {min === 0 && sec === 0 ? null : (
          <TypographyTextLarge align="center">
            0{min} : {sec < 10 ? `0${sec}` : sec}
          </TypographyTextLarge>
        )}
       </Grid>
    </>
  );
};

export default Timer;
