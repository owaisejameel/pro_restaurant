import React from "react";
import { useState } from "react";
import { Grid, Box, Divider, Typography, Badge } from "@mui/material";
import WishList from "../../assets/wishList.png";
import OrderFood from "../../assets/orderFood.png";
import Address from "../../assets/address.png";
import Notifications from "../../assets/notification.png";
import HelpCenter from "../../assets/helpcenter.png";
import LogOut from "../../assets/logout.png";
import User from "../../assets/user.png";

import { Outlet } from "react-router-dom";
import AlertDialog from "../../components/Dialogue/AlertDialog";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

const Profile = () => {
  const classes = useStyles();
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data.data
  );
  const avatar = useSelector(
    (state) => state.userReducer.userProfileData.data.avatar
  );
  // const dispatch = useDispatch()

  // useEffect( ()=>{
  //   dispatch({type : "USER_PROFILE_SAGA"})
  // },[])

  const [open, setOpen] = useState(false);
  // const myFun = (stat) =>{
  //   console.log("m y jfun ....")
  //   setOpen(stat)
  // }
  return (
    <Grid container className={classes.mainDivMiddle} justifyContent="center">
      <Grid
        item
        xs={9}
        style={{ paddingLeft: "24px", paddingTop: "16px" }}
        container
      >
        <NavLink className={classes.nav} to="/home">
          <Typography>Home</Typography>
        </NavLink>
      </Grid>
      <Grid item xs={9}>
        <Grid
          container
          style={{ padding: "24px", gap: "24px" }}
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <Grid container style={{ gap: "16px" }}>
              <NavLink
                className={classes.nav}
                style={{ width: "100%" }}
                to="/home/profile"
              >
                <Grid
                  container
                  // columnGap={2}
                  style={{
                    padding: "24px",
                    background: "#fff",
                    border: "1px solid #e6e6e6",
                    borderRadius: "8px",
                    gap: "16px",
                  }}
                >
                  <Box
                    component="img"
                    src={User}
                    style={{ width: 100, height: 100 }}
                  />
                  {/* <StyledAvatar sx={{ width: 99, height: 99 }}>MO</StyledAvatar> */}

                  <Grid item>
                    <Typography>{userDetails?.full_name}</Typography>
                    <Grid container>
                      <Typography>{userDetails?.email}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </NavLink>

              <Grid
                container
                direction="column"
                style={{
                  padding: "24px",
                  background: "#fff",
                  border: "1px solid #e6e6e6",
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <NavLink className={classes.nav} to="wish-list">
                  <Grid
                    className={classes.profileItemsbox}
                    container

                    // style={{ padding: "24px 0px" }}
                  >
                    <Badge className={classes.badgeStyle} badgeContent={9}>
                      <Box component="img" src={WishList} />
                    </Badge>
                    <Typography>Favourites</Typography>
                  </Grid>
                </NavLink>

                <Divider />

                <NavLink className={classes.nav} to="my-order">
                  <Grid className={classes.profileItemsbox} container>
                    <Badge className={classes.badgeStyle} badgeContent={3}>
                      <Box component="img" src={OrderFood} />
                    </Badge>
                    <Typography>My Orders</Typography>
                  </Grid>
                </NavLink>

                <Divider />

                <NavLink className={classes.nav} to="addressess">
                  <Grid className={classes.profileItemsbox} container>
                    <Badge className={classes.badgeStyle} badgeContent={3}>
                      <Box component="img" src={Address} />
                    </Badge>
                    <Typography>Saved Adressess</Typography>
                  </Grid>
                </NavLink>

                <Divider />

                <NavLink className={classes.nav} to="notification">
                  <Grid className={classes.profileItemsbox} container>
                    <Badge className={classes.badgeStyle} badgeContent={3}>
                      <Box component="img" src={Notifications} />
                    </Badge>

                    <Typography>Notifications</Typography>
                  </Grid>
                </NavLink>

                <Divider />

                <NavLink className={classes.nav} to="/home/help-center">
                  <Grid className={classes.profileItemsbox} container>
                    <Box component="img" src={HelpCenter} />
                    <Typography>Help Center</Typography>
                  </Grid>
                </NavLink>

                <Divider />
                <Grid className={classes.profileItemsbox} container>
                  <Box component="img" src={LogOut} />
                  <Typography
                    onClick={() => setOpen(!open)}
                    sx={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Typography>
                </Grid>
                {open && (
                  <AlertDialog
                    dialogState={open}
                    // dialogFun={myFun}
                    dialogFun={() => setOpen(false)}
                    title="Log out"
                    description=" Are you sure you want to logout from Pro Restaurant ?"
                    actionCancel="Cancel"
                    actionLogOut="LogOut"
                  />
                )}

                {/* <pre>{JSON.stringify(open)}</pre> */}

                <Divider />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={7} container>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  mainDivMiddle: {
    // minHeight: "100vh",
    minHeight: "calc(100vh - 320px)",
    backgroundColor: "#FCFCFC",
    padding: 5,
    zIndex: -1,
    marginTop: "4px",
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
  profileItemsbox: {
    alignItems: "center",
    padding: "30px 0px 20px 0px",
    //  "& .MuiBadge-badge":{
    //   color :"#fff",
    //   backgroundColor : theme.palette.primary.light,
    //   },
    "& p": {
      paddingLeft: "20px",
    },
    "& img": {
      width: "30px",
      height: "30px",
      paddingLeft: "20px",
    },
  },
}));
export default Profile;
