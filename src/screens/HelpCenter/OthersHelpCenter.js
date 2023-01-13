import React from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const OthersHelpCenter = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.helpCenterBox}>
        <Typography variant="h4">Content Policy</Typography>
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
