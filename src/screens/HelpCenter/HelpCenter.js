import React from "react";

import { Grid, Divider, Typography } from "@material-ui/core";

import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Outlet } from "react-router-dom";

const HelpCenter = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.mainDivMiddle}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid
        item
        xs={9}
        container
        style={{ gap: "24px" }}
        alignItems="flex-start"
      >
        <Grid container>
          <Typography variant="h4" style={{ padding: "16px 0px" }}>
            Help Center
          </Typography>
        </Grid>

        <Grid item xs={3} className={classes.helpCenterBox}>
          <Grid container direction="column">
            <NavLink className={classes.nav} to="/home/help-center">
              <Grid item className={classes.leftboxNavStyle}>
                <Typography>Privacy Policy</Typography>
              </Grid>
            </NavLink>
            <Divider />

            <NavLink className={classes.nav} to="terms-condition">
              <Grid item className={classes.leftboxNavStyle}>
                <Typography> Terms & Conditons</Typography>
              </Grid>
            </NavLink>

            <Divider />

            <NavLink className={classes.nav} to="others">
              <Grid item className={classes.leftboxNavStyle}>
                <Typography>Content Policy</Typography>
              </Grid>
            </NavLink>

            <Divider />

            <NavLink className={classes.nav} to="others">
              <Grid item className={classes.leftboxNavStyle}>
                <Typography>Others</Typography>
              </Grid>
            </NavLink>
          </Grid>
        </Grid>

        <Grid
          item
          xs={8}
          container
          alignContent="flex-start"
          alignItems="flex-start"
        >
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  mainDivMiddle: {
    minHeight: "calc(100vh - 320px)",
    backgroundColor: "#FCFCFC",
    padding: 5,
    zIndex: -1,
    marginTop: "4px",
  },
  helpCenterBox: {
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
    width: "100%",
  },
  nav: {
    textDecoration: "none",
    color: "#000",
  },
  leftboxNavStyle: {
    padding: "30px 0px 20px 0px",
  },
}));

export default HelpCenter;
