import React, { useState } from "react";

import { Grid, Divider, Typography, MenuItem, Menu } from "@mui/material";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import * as CONST from "../../utils/Constants";

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);

  let activeStyle = {
    backgroundColor: "#f8f8ff",
    // borderBottom: "2px solid #66B2FF",
    borderBottom: `2px solid ${CONST.primaryColor}`,
  };

  const helpCenterLinks = [
    {
      link: "Privacy Policy",
      path: "/home/help-center",
    },
    {
      link: "Terms & Conditions",
      path: "/home/help-center/terms-condition",
    },
    // {
    //   link: "Content Policy",
    //   path: "/home/help-center/others",
    // },
  ];

  const handleProfileIconClick = (event) => {
    console.log("click on arrow down icon", event);
    setOpenMenu(event.currentTarget);
  };
  const handleProfileIconClose = () => {
    setOpenMenu(null);
  };

  const handleMenuItemLinks = (event, item) => {
    console.log("handleMenuItemLinks", event, item);
    navigate(item.path);
    setOpenMenu(null);
  };

  return (
    <Grid
      container
      className={classes.mainDivMiddle}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
        lg={9}
        xl={9}
        container
        // style={{ gap: "24px" }}
        alignItems="flex-start"
      >
        <Grid container alignItems="center">
          <Typography variant="h4" className={classes.headingHelpCenter}>
            Help Center
          </Typography>
          {!matches && (
            <>
              <KeyboardArrowDownIcon
                sx={{ pl: 1, fontSize: 30 }}
                onClick={handleProfileIconClick}
                aria-controls="customized-menu"
                aria-haspopup="true"
              />
              <Menu
                id="customized-menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleProfileIconClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {helpCenterLinks.map((item) => (
                  <MenuItem
                    sx={{ px: 3, py: 1 }}
                    onClick={(event) => handleMenuItemLinks(event, item)}
                  >
                    {item.link}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Grid>

        {matches && (
          <Grid item xs={3} className={classes.helpCenterBox}>
            <Grid container direction="column">
              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={classes.nav}
                end
                to="/home/help-center"
              >
                <Grid item className={classes.leftboxNavStyle}>
                  <Typography>Privacy Policy</Typography>
                </Grid>
              </NavLink>
              <Divider />

              <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={classes.nav}
                to="terms-condition"
              >
                <Grid item className={classes.leftboxNavStyle}>
                  <Typography> Terms & Conditons</Typography>
                </Grid>
              </NavLink>

              <Divider />

              {/* <NavLink
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className={classes.nav}
                to="others"
              >
                <Grid item className={classes.leftboxNavStyle}>
                  <Typography>Content Policy</Typography>
                </Grid>
              </NavLink>

              <Divider /> */}
            </Grid>
          </Grid>
        )}

        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
          xl={9}
          container
          alignContent="flex-start"
          alignItems="flex-start"
          className={classes.rightDivHelpCenter}
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
  activated: {
    backgroundColor: "#f8f8ff",
    borderBottom: "2px solid #66B2FF",
    color: "#66B2FF",
  },

  leftboxNavStyle: {
    padding: "30px 0px 20px 20px",
  },
  rightDivHelpCenter: {
    paddingLeft: "24px",
  },
  headingHelpCenter: {
    padding: "16px 0px",
  },
  [theme.breakpoints.down("md")]: {
    rightDivHelpCenter: {
      paddingRight: "24px",
    },
    headingHelpCenter: {
      padding: "16px 24px",
    },
  },
}));

export default HelpCenter;
