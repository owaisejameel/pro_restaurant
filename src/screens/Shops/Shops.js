import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";

import {
  StyledGridMiddle,
  StyledGridShop,
} from "../../components/StyledComponents/StyledComponents ";
import { connect, useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import * as CONST from "../../utils/Constants";

import burger from "../../assets/burger.jpg";
import product_img from "../../assets/product_img.jpg";
import {
  addToCart,
  decrement,
  increment,
} from "../../redux/actions/cartActions";
import { useEffect } from "react";
import DATA from "../../DATA.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { useStyles } from "../../assets/css/ShopStyle";
import AddCart from "../../components/Card/AddCart";
import axios from "axios";
import { useState } from "react";
import * as wishlistAction from "../../redux/actions/wishlistAction";

// const products = [
//   { id: 0, title: "noodles", price: 200, itemCount: 0 },
//   { id: 1, title: "maggi", price: 200, itemCount: 0 },
//   { id: 2, title: "juice", price: 80, itemCount: 0 },
//   { id: 3, title: "burger", price: 80, itemCount: 0 },
//   { id: 4, title: "pizza", price: 80, itemCount: 0 },
// ];
let filter = [];
const Shops = ({...props}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const cartValues = useSelector((state) => state.cartReducer.getCartitems);
  const [favoriteData, setFavoriteData] = useState();
  const [foodData, setFoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const categoryList = async () => {
    try {
      const category_data = await axios.get(
        "https://gentle-dusk-70757.herokuapp.com/api/v1/categories",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(data);
      setCategory(category_data.data.data);
      category && console.log("---------------------<", category);
      // setFoodData(data.data);
      // console.log("====================================");

      // console.log("====================================");
      // if (foodData.data) {
      //   dispatch({ type: "PRODUCTS", products: foodData.data });
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const displayCart = (item) => {
    return (
      <AddCart
        id={item.item.id}
        name={item.item.name}
        image={item.item_image}
        price={item.item.price}
        items={item}
        width="230px"
        counts={cartValues.cart_items && cartValues.cart_items}
      />
    );
  };

  useEffect(() => {
    categoryList();
    foodList();
    GetWishList();
  }, []);
  // useEffect(() => {
  //   displayCart(item);
  // }, []);
  const foodList = async () => {
    try {
      let userID = await localStorage.getItem("userId");

      const data = await axios.get(
        `https://gentle-dusk-70757.herokuapp.com/api/v1/items?direction=asc&search=&user_id=${userID}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("PRODUCT DATA ==>", data);
      setFoodData(data.data.data);
      // console.log("====================================");
      // foodData.data && console.log(foodData.data);

      // console.log("====================================");
      // if (foodData.data) {
      //   dispatch({ type: "PRODUCTS", products: foodData.data });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const GetWishList = async () => {
    let userID = await localStorage.getItem("userId");
    let data = {
      user_id: userID,
      // favourite_id: 1
    };

    console.log("GetWishList ==>", data);
    props.getWishlist(
      data,
      (res) => getWishlistSuccessCallBack(res),
      (err) => getWishlistFailureCallBack(err)
    );
  };

  const getWishlistSuccessCallBack = (res) => {
    console.log("Res ==>", res);
    setFavoriteData(res.favourite_id);
  };

  const getWishlistFailureCallBack = () => {};

  const handleFilter = (value,index) => {
    
    let checkData = filter.includes(value.category.id)

    if(checkData) {
      let checkIndex = filter.indexOf(value.category.id)
      if (checkIndex > -1) { // only splice array when item is found
        filter.splice(checkIndex, 1); // 2nd parameter means remove one item only
      }
      console.log("checkIndex",checkIndex)
    } else {
      filter.push(value.category.id);
    }
    
    let data =[];
    if(filter.length > 0){
      filter.map(item => {
        foodData.filter(item1 => {
          if(item == item1.category.id) {
            data.push(item1)
            // setFilteredData([{...filteredData,...item1}])
            // console.log("Filter value and index ==>", item1)
          }
        })
        
      })
      setFilteredData(data)
      
    } else {
      console.log("Filter value and index data==>", filter.length)
      if(filter.length == 0){
        foodList()
      }
    }
    
    //setIsCategoryFilter(...isCategoryFilter,...filter)
    // foodData.filter(item => item.category.id == )
    // setFoodData(value.items)
    
  }

  const productsRedux = useSelector((state) => state.cartReducer.products);
  return (
    <Box sx={{ width: "100%" }}>
      <Box className={classes.overlay_box}>
        <img src={product_img} className={classes.overlay_img} />
        <Typography className={classes.overlay_txt}>Products</Typography>
      </Box>

      <Box
        sx={{
          padding: "40px 0",
        }}
      >
        <Box className={classes.product_box}>
          <Box className={classes.product_SubBox}>
            <Typography className={classes.product_txt}>
              Our Product List
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4} md={3}>
              <Box className={classes.product_gridBox}>
                <Typography className={classes.product_gridTxt}>
                  Filter
                </Typography>
                <List className={classes.product_list}>
                  {category &&
                    category.map((value, index) => {
                      const labelId = `checkbox-list-label-${value}`;
                      return (
                        <ListItem key={value} disablePadding>
                          <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                                onChange={() => handleFilter(value,index)}
                              />
                            </ListItemIcon>
                            <ListItemText
                              id={value.category.id}
                              primary={value.category.name}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                </List>
              </Box>
            </Grid>
            <Grid item xs={8} md={9}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {filter.length > 0 ?
                    // console.log("Filter value and index ==>", filteredData)
                    filteredData.map((item) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          lg={4}
                          md={6}
                          sx={{ marginTop: "-20px" }}
                        >
                          <AddCart
                            id={item.item.id}
                            name={item.item.name}
                            image={item.item_image}
                            price={item.item.price}
                            items={item}
                            width="230px"
                            fav={item.added_in_wishlist}
                            props={props}
                            favourite_id={favoriteData}
                            reload_product={foodList}
                          />
                           {console.log("Filter value and index ==>", item)}
                         </Grid>
                       );
                     })
                    :
                    foodData.map((item) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          lg={4}
                          md={6}
                          sx={{ marginTop: "-20px" }}
                        >
                          <AddCart
                            id={item.item.id}
                            name={item.item.name}
                            image={item.item_image}
                            price={item.item.price}
                            items={item}
                            width="230px"
                            fav={item.added_in_wishlist}
                            props={props}
                            favourite_id={favoriteData}
                            reload_product={foodList}
                          />
                        </Grid>
                      );
                    })
                  }
                   {/* {foodData.map((item) => {
                  //   return (
                  //     <Grid
                  //       item
                  //       xs={12}
                  //       sm={12}
                  //       lg={4}
                  //       md={6}
                  //       sx={{ marginTop: "-20px" }}
                  //     >
                  //       <AddCart
                  //         id={item.item.id}
                  //         name={item.item.name}
                  //         image={item.item_image}
                  //         price={item.item.price}
                  //         items={item}
                  //         width="230px"
                  //         fav={item.added_in_wishlist}
                  //         props={props}
                  //         favourite_id={favoriteData}
                  //         reload_product={foodList}
                  //       />
                  //     </Grid>
                  //   );
                  // })} */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: (data, successCallBack, failureCallBack) =>
      dispatch(
        wishlistAction.getWishlist(data, successCallBack, failureCallBack)
      ),
  };
};
export default connect(null, mapDispatchToProps)(Shops);
