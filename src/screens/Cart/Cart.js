import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import NoCartItemIcon from "../../assets/no-cart.png";

import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

const Cart = () => {
  const classes = useStyles();
  const params = useParams();
  console.log("prama", params);
  const cartItem = useSelector((state) => state.cartReducer);
  return (
    <Grid
      className={classes.mainDivMiddle}
      container
      justifyContent="center"
      alignItems="flex-start"
    >
      {cartItem.cartCount == 0 && (
        <Grid
          className={classes.boxStyle}
          style={{ margin: "auto" }}
          item
          xs={8}
          md={6}
          lg={5}
          xl={4}
          container
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: "16px" }}
          >
            <Box
              component="img"
              style={{ width: "200px", height: "200px" }}
              src={NoCartItemIcon}
            />
            <Typography variant="h4" color="primary">
              Your cart is empty
            </Typography>
            <Typography>
              Looks like you haven’t added anything to your cart yet !
            </Typography>
            <Button variant="contained" className={classes.btncontainedPrimary}>
              Browse Products
            </Button>
          </Grid>
        </Grid>
      )}

      {cartItem?.cartCount !== 0 && (
        <Grid className={classes.boxStyle} item xs={9}>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: "16px" }}
          >
            <Typography>Total Amount: {cartItem.totalAmount}</Typography>
            <Typography>
              Looks like you haven’t added anything to your cart yet !
            </Typography>
            <Button variant="contained" className={classes.btncontainedPrimary}>
              Browse Products
            </Button>
          </Grid>
        </Grid>
      )}
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
  boxStyle: {
    marginTop: "20px",
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  btncontainedPrimary: {
    fontSize: "16px",
    color: "#fff",
    background: "#66B2FF",
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    "&:hover": {
      boxShadow: "none",
      background: "#66B2FF",
    },
  },
}));
export default Cart;
