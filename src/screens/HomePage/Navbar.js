import React from "react";
import { Grid, Box, Typography, TextField, Badge, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";
import ShoppingCart from "../../assets/shoppingCart.png";
import { NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

const Navbar = () => {
  const classes = useStyles();
  const cartCount = useSelector((state) => state.cartReducer.cartCount);
  const whishListCount = useSelector(
    (state) => state.cartReducer.whishListCount
  );
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [isFavourite, setIsFavourite] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  // const [drawerPosition, setDrawerPosition] = {({
  //   top :
  // })
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        className={classes.navbar}
      >
        <Grid item xs={4}>
          <Grid container justifyContent="flex-start">
            <NavLink to="/home">
              <Box
                component="img"
                src={logo}
                alt="login"
                style={{
                  width: "12.5rem",
                  height: "2.5rem",
                }}
              />
            </NavLink>
            {!matches && (
              <Grid
                item
                xs={4}
                container
                justifyContent="space-evenly"
                alignItems="center"
              >
                <NavLink
                  className={classes.nav}
                  style={({ isActive }) =>
                    isActive ? { color: "blue" } : undefined
                  }
                  to="shops"
                >
                  <Typography>Shops</Typography>
                </NavLink>

                <NavLink className={classes.nav} to="new-arrivals">
                  <Typography>New Arivals</Typography>
                </NavLink>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* {!matches && <Box style={{ flexGrow: 1 }} />} */}
        {matches && (
          <>
            <MenuIcon
              onClick={() => setOpenMenu(true)}
              className={classes.menu}
            />
          </>
        )}

        <Grid item xs={5}>
          <Grid container justifyContent="flex-end">
            <Grid
              item
              xs={7}
              container
              justifyContent="space-between"
              alignItems="center"
              wrap="nowrap"
              style={{
                border: "1px solid #d7d9db",
                // ml: "auto",
                borderRadius: "8px",
                padding: "4px 0px",
              }}
            >
              <TextField
                placeholder="Search..."
                style={{
                  paddingLeft: "16px",
                }}
                value={searchItem}
                variant="standard"
                onChange={(e) => setSearchItem(e.target.value)}
                InputProps={{ disableUnderline: true }}
              />

              <SearchIcon
                style={{
                  marginRight: "8px",
                  fontSize: 20,
                  color: "gray",
                }}
              />
            </Grid>

            {!matches && (
              <Grid
                item
                xs={4}
                container
                alignItems="center"
                // justifyContent="space-evenly"
                style={{
                  paddingLeft: "30px",
                  // width: "180px",
                  gap: "30px",
                  // background: "khaki",
                }}
              >
                <NavLink to="/home/profile/wish-list">
                  <Badge
                    className={classes.badgeStyle}
                    badgeContent={whishListCount}
                  >
                    <FavoriteBorderIcon
                      style={{
                        color: "black",
                        fontSize: 30,
                      }}
                    />
                  </Badge>
                </NavLink>

                <NavLink to="cart">
                  <Badge
                    className={classes.badgeStyle}
                    badgeContent={cartCount}
                  >
                    <Box
                      component="img"
                      src={ShoppingCart}
                      alt="login"
                      style={{ width: "30px" }}
                    />
                  </Badge>
                </NavLink>

                <NavLink
                  className={classes.nav}
                  to="profile"
                  style={{ marginLeft: "8px" }}
                >
                  {/* <TypographyTextNormal>Login/Logout</TypographyTextNormal> */}
                  <Avatar className={classes.avatar}>
                    {/* {() => {
                // let name = userDetails.full_name.split(" ")
                let myName = "Owais Khan";
                let firstTwo = myName.split(" ");
                firstTwo = firstTwo[0].charAt(0) + firstTwo[1].charAt(0);
                return firstTwo;
              }} */}
                    MO
                    {/* {userDetails?.full_name} */}
                  </Avatar>
                </NavLink>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Drawer
          className={classes.drawerLayout}
          anchor={"top"}
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          hello
        </Drawer>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: "65px",
    // minHeight: "65px",
    boxShadow: "0px 0px 4px #000",
    zIndex: 10,
    padding: "0px 5%",
  },
  badgeStyle: {
    "& .MuiBadge-badge": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
  },
  nav: {
    textDecoration: "none",
    color: "#000",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  menu: {
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
    cursor: "pointer",
    order: -1,
  },
  drawerLayout: {
    "& .MuiPaper-root": {
      minHeight: "50vh",
      width: "100%",
    },
  },
}));

export default Navbar;
