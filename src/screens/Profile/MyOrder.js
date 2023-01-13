import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";

import NoOrderFood from "../../assets/no-order-food.png";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const MyOrder = (props) => {
  const classes = useStyles();
  useEffect(() => {
    getMyOrderList();
  }, []);
  //state to show order details collapse
  const [checked, setChecked] = React.useState(false);

  //function to handle order details collapse
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  //state to store order List data
  const [orderListData, setOrderListData] = useState([]);

  const getMyOrderList = async () => {
    let user_id = await JSON.parse(localStorage.getItem("userId"));

    let data = {
      user_id: user_id,
    };

    props.orderList(
      data,
      (res) => getOrderListSuccessCallBack(res),
      (err) => getOrderListFailureCallBack(err)
    );
  };

  const getOrderListSuccessCallBack = (res) => {
    console.log("orders list", res);
    setOrderListData(res?.data?.reverse());
  };

  const getOrderListFailureCallBack = (err) => {};

  return (
    <>
      <Typography variant="h4">My Orders</Typography>
      {/* when no order is availale */}

      {orderListData?.length === 0 ? (
        <Grid
          item
          xs={12}
          container
          direction="column"
          style={{ gap: "16px", padding: "40px 0px", width: "100%" }}
          alignItems="center"
          className={classes.rightDivStyle}
        >
          <Box
            component="img"
            sx={{ width: 250, height: 250 }}
            src={NoOrderFood}
          />
          <Typography variant="h4" color="primary">
            No Orders Found
          </Typography>
          <Typography>
            You haven’t order any items, Browse items and order it
          </Typography>
        </Grid>
      ) : (
        // when orders are availabe
        orderListData?.map((item) => (
          <Grid container className={classes.rightDivStyle} key={item.id}>
            <Grid item xs={12} container justifyContent="space-between">
              <Typography>
                <span style={{ fontWeight: 500, color: "GrayText" }}>
                  ORDER ID :{" "}
                </span>
                <b>{item.order_number} </b>
              </Typography>
              <Typography>
                <span style={{ fontWeight: 500, color: "GrayText" }}>
                  Order Date :{" "}
                </span>
                <b>{item.order_date} </b>
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ my: 2 }}>
              <Divider flexItem />
            </Grid>

            {item.order_summary.items.map((i) => (
              <Grid
                item
                xs={12}
                container
                justifyContent="space-between"
                sx={{ mb: 3 }}
              >
                <Grid item xs={8} container>
                  <Box
                    component="img"
                    src={i.item_image}
                    alt="image"
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "1px solid #e6e6e6 ",
                    }}
                  />
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    sx={{ pl: 2 }}
                    alignItems="flex-start"
                    // style={{ background: "khaki" }}
                  >
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      {i.name}
                    </Typography>
                    <Typography variant="h6" color="GrayText" gutterBottom>
                      INR {item.order_summary.order.order_amount}
                    </Typography>
                    <Typography variant="h6" sx={{ background: "#e6e6e6" }}>
                      Total Amount : {item.order_amount}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                  <Typography>Quantity : {i.quantity}</Typography>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12} container justifyContent="flex-end">
              <Button
                sx={{ textTransform: "none" }}
                onClick={handleChange}
                endIcon={checked ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              >
                {checked ? "Hide Details" : "View Details"}
              </Button>
            </Grid>

            {/* order detail collapse */}
            <Collapse
              in={checked}
              style={{
                width: "100%",
              }}
            >
              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 1 }} />
                </Grid>

                {/* <Grid item xs={12} container justifyContent="space-between">
                  <Typography color="GrayText">Taxes</Typography>
                  <Typography color="GrayText">&#8377; 14</Typography>
                </Grid> */}

                <Grid item xs={12} container justifyContent="space-between">
                  <Typography color="GrayText">Delivery Charges</Typography>
                  <Typography color="GrayText">&#8377; 30</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12} container justifyContent="space-between">
                  <Typography>Grand Total</Typography>
                  <Typography>&#8377; {item.order_amount}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant="h6">Order Details</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    <span style={{ color: "GrayText" }}>Order Number</span> :{" "}
                    {item.order_number}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    <span style={{ color: "GrayText" }}>Payment</span> :{" "}
                    {item.status}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    <span style={{ color: "GrayText" }}>Date</span> :{" "}
                    {item.order_date}
                  </Typography>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        ))
      )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    orderList: (data, successCallBack, failureCallBack) =>
      dispatch(cartActions.myOrderList(data, successCallBack, failureCallBack)),
  };
};
export default connect(null, mapDispatchToProps)(MyOrder);

const mapDispatchToPropsNew = (dispatch) => {
  return {
    getOrderData: () => dispatch(),
  };
};
