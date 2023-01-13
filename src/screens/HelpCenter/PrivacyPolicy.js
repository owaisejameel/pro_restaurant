import React, { useEffect } from "react";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import useCustomDispatch from "../../hooks/useDispatch";

const PrivacyPolicy = () => {
  const classes = useStyles();

  const [data, setData] = useState("");

  const successcallback = (res) => {
    console.log("successcall back", res);
    setData(res.data);
  };

  let para = data[0]?.description;
  para = para?.replace("<p>", "");
  para = para?.replace("</p>", "");

  //custom hook.....
  useCustomDispatch("TERMS_N_CONDITION_SAGA", successcallback);
  // useEffect(() => {
  //   dispatch({ type: "TERMS_N_CONDITION_SAGA" });
  // }, []);

  return (
    <Grid className={classes.helpCenterBox}>
      <Typography variant="h4">{data[0]?.title}</Typography>
      {/* <Typography>{data[0]?.description}</Typography> */}
      <Typography>{para}</Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  helpCenterBox: {
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
    width: "100%",
  },
}));

export default PrivacyPolicy;
