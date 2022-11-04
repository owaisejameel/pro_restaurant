import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

const PrivacyPolicy = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.userReducer.termAndConditionData.data
  );

  console.log("data........", data);
  useEffect(() => {
    dispatch({ type: "TERMS_N_CONDITION_SAGA" });
  }, []);

  console.log("terms data", data);
  return (
    <Grid className={classes.helpCenterBox}>
      <Typography variant="h4">{data[0]?.title}</Typography>
      <Typography>{data[0]?.description}</Typography>
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
