import { Grid, Box, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import { NavLink, Outlet } from "react-router-dom";

import React from "react";

const Header = () => {
  // const classes = useStyles();
  return (
    <>
      <Grid
        container
        alignItems="center"
        sx={{
          height: 65,
          boxShadow: 2,
        }}
      >
        <NavLink to="/header">
          <Box
            component="img"
            src={logo}
            alt="login"
            sx={{
              width: 200,
              height: 50,
              border: 1,
              pl: 1.5,
            }}
          />
        </NavLink>

        <Box>
          <NavLink
            style={{
              textDecoration: "none",
            }}
            to="cart/123"
          >
            <Typography>Carts</Typography>
          </NavLink>

          <NavLink
            style={{
              textDecoration: "none",
            }}
            to="cart/124"
          >
            <Typography>Carts2</Typography>
          </NavLink>
        </Box>
      </Grid>
      <Outlet />
    </>
  );
};

export default Header;
