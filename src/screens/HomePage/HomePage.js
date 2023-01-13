import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { makeStyles } from "@mui/styles";
import useCustomDispatch from "../../hooks/useDispatch";
import DATA from "../../DATA.json";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToCart, cartData } from "../../redux/actions/cartActions";

const HomePage = ({}) => {
  const cartProducts = useSelector((state) => state.cartReducer.cartProducts);
  const user_id = useSelector(
    (state) => state?.userReducer?.userProfileData?.data?.data?.id
  );
  const [btnDisplay, setBtnDisplay] = useState("none");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [foodData, setFoodData] = useState([]);

  const foodList = async () => {
    console.log("Food List....");
    const userId = JSON.parse(localStorage.getItem("userId"));
    try {
      const data = await axios.get(
        `https://gentle-dusk-70757.herokuapp.com/api/v1/items?direction=asc&search=&user_id=${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data);
      setFoodData(data.data);
      // console.log("====================================");

      // console.log("====================================");
      // if (foodData.data) {
      //   dispatch({ type: "PRODUCTS", products: foodData.data });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // let id = useSelector((state) => state.userReducer.userId);

  useEffect(() => {
    foodList();
    // dispatch({ type: "PRODUCTS", products: foodData.data });
  }, [user_id]);

  foodData.data && dispatch({ type: "PRODUCTS", products: foodData.data });

  useCustomDispatch("USER_PROFILE_SAGA");

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
        style={{ display: btnDisplay === "none" ? "none" : "block" }}
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
    bottom: 50,
    right: 80,
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
    "@media (max-width:600px)": {
      "&.MuiButtonBase-root": {
        minWidth: "30px",
        // width: "30px",
      },
      bottom: 20,
      right: 20,
      "& .MuiButton-startIcon": {
        margin: 0,
        padding: 0,
      },
      "&& .MuiSvgIcon-root": {
        fontSize: 20,
      },
    },
  },

  // blockbtn: {
  //   display: "block",
  // },
}));

export default HomePage;
