import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

import NoOrderFood from "../../assets/no-order-food.png";

const MyOrder = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">MyOrder</Typography>
      <Grid container className={classes.rightDivStyle}>
        <Grid
          container
          direction="column"
          style={{ gap: "16px", padding: "40px 0px" }}
          alignItems="center"
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

export default MyOrder;
