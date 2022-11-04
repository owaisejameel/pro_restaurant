import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

import NoWishlist from "../../assets/No-Wish-list.png";
const WishList = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Favourites</Typography>
      <Grid container className={classes.rightDivStyle}>
        <Grid
          container
          direction="column"
          style={{ gap: "16px", padding: "40px 0px" }}
          alignItems="center"
        >
          <Box
            component="img"
            style={{ width: 250, height: 250 }}
            src={NoWishlist}
          />
          <Typography variant="h4" color="primary">
            No Favourites
          </Typography>
          <Typography>
            You haven’t wishlisted any items, Browse items and wishlist it.
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

export default WishList;
