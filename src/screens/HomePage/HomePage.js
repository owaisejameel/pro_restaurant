import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

const HomePage = () => {
  const [btnDisplay, setBtnDisplay] = useState("none");
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_PROFILE_SAGA" });
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setBtnDisplay("block");
      } else {
        setBtnDisplay("none");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Outlet />
      <Footer />
      <Button
        className={classes.arrowBtn}
        style={{ display: btnDisplay == "none" ? "none" : "block" }}
        // className={`${classes.arrowBtn} ${
        //   btnDisplay == "block" ? classes.blockbtn : ""
        // }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        startIcon={<ArrowUpwardIcon />}
      ></Button>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  arrowBtn: {
    // display: "none",
    position: "fixed",
    bottom: 80,
    right: 100,
    zIndex: 10,
    backgroundColor: "#fff",
    boxShadow: 0,
    paddingBottom: 0,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "8px",

    "& .MuiButton-startIcon": {
      margin: "4px auto",
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: 0,
    },
    "&& .MuiSvgIcon-root": {
      fontSize: 30,
      color: theme.palette.primary.main,
    },
    "@media (max-width:600px)": {},
  },

  // blockbtn: {
  //   display: "block",
  // },
}));

export default HomePage;
