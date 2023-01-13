import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Box, Typography } from "@mui/material";

import NoWishlist from "../../assets/No-Wish-list.png";
import { connect } from "react-redux";
import * as wishlistAction from "../../redux/actions/wishlistAction";
import AddCart from "../../components/Card/AddCart";
import { useSelector } from "react-redux";

const WishList = ({ ...props }) => {
  const [favoriteData, setFavoriteData] = useState([]);
  
  useEffect(() => {
    GetWishList();
  }, []);

  const GetWishList = async () => {
    let userID = await localStorage.getItem("userId");
    let data = {
      user_id: userID,
      // favourite_id: 1
    }
    props.getWishlist(data, (res) => getWishlistSuccessCallBack(res), (err) => getWishlistFailureCallBack(err))
  }

  const getWishlistSuccessCallBack = (res) => {
    setFavoriteData(res)
  }

  const getWishlistFailureCallBack = () => {};
  const classes = useStyles();
  const productsRedux = useSelector((state) => state.cartReducer.products);
  const favorites = [];

  return (
    <>
      <Typography variant="h4">Favourites</Typography>

      <Grid container className={classes.rightDivStyle}>
        <Grid
          container
          direction="row"
          style={{ gap: "0px", padding: "15px 20px" }}
          alignItems="center"
        >
          {favoriteData?.data?.length > 0 ?
            favoriteData?.data?.map((item) => {
              item = {
                added_in_wishlist: true,
                ...item
              }
              return (<Grid
                item
                xs={12}
                sm={12}
                lg={4}
                md={6}
                // sx={{ marginTop: "-20px" }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "-20px",
                }}
                key={item.id}
              >
                <AddCart
                  id={item.item.id}
                  name={item.item.name}
                  image={item.item_image}
                  price={item.price}
                  items={item}
                  width="180px"
                  fav={true}
                  props={props}
                  favourite_id={favoriteData?.favourite_id}
                  reload_product={GetWishList}
                // counts={cartValues.cart_items && cartValues.cart_items}
                // user={user_id}
                />
              </Grid>
            )}
          ) : (
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
            // </Grid>
          )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: (data, successCallBack, failureCallBack) =>
      dispatch(
        wishlistAction.getWishlist(data, successCallBack, failureCallBack)
      ),
  };
};
export default connect(null, mapDispatchToProps)(WishList);
