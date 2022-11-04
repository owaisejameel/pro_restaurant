import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";

const OthersHelpCenter = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.helpCenterBox}>
        <Typography variant="h4">Others</Typography>
      </Grid>
    </>
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

export default OthersHelpCenter;
