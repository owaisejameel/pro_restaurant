import React, { useEffect } from "react";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import useCustomDispatch from "../../hooks/useDispatch";

// import renderHTML from "react-render-html";

const TermsCondition = () => {
  const classes = useStyles();

  const [data, setData] = useState("");

  const successcallback = (res) => {
    console.log("successcall back", res);
    setData(res.data);
  };

  let para = data[1]?.description;
  para = para?.replace("<p>", "");
  para = para?.replace("</p>", "");

  //dispatching action using custom hook
  useCustomDispatch("TERMS_N_CONDITION_SAGA", successcallback);

  // const dispatch = useDispatch();
  // const data = useSelector(
  //   (state) => state.userReducer.termAndConditionData.data
  // );

  // useEffect(() => {
  //   dispatch({ type: "TERMS_N_CONDITION_SAGA" });
  // }, []);

  return (
    <Grid className={classes.helpCenterBox}>
      <Typography variant="h4">{data[1]?.title}</Typography>
      {/* <Typography>{data[1]?.description}</Typography> */}
      <Typography>{para}</Typography>
      {/* renderHTML(para) */}
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

export default TermsCondition;
