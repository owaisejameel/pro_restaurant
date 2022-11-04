import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

import NoAddress from "../../assets/no-address.png";

const SavedAddress = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Saved Address</Typography>
      <Grid container className={classes.rightDivStyle}>
        <Grid
          container
          direction="column"
          style={{ gap: "16px", padding: "40px 0px" }}
          alignItems="center"
        >
          <Box
            component="img"
            style={{ width: 250, height: 250 }}
            src={NoAddress}
          />
          <Typography variant="h4" color="primary">
            No addresses saved !
          </Typography>
          <Typography>
            No addresses have been saved to the address list yet !
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  rightDivStyle: {
    marginTop: "20px",
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
}));

export default SavedAddress;
