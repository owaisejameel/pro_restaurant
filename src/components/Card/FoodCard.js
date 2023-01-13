import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import {
  AddBox,
  AddOutlined,
  Delete,
  PlusOne,
  Remove,
  RemoveOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { theme } from "../../themes/theme";
import {
  addToCart,
  decrement,
  increment,
} from "../../redux/actions/cartActions";

export default function RecipeReviewCard({ id, name, price, image, items }) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const [favProducts, setFavProducts] = useState([])
  const [favIconColor, setFavIconColor] = useState(false)
  const classes = useStyles();
  // const productsRedux = useSelector((state) => state.cartReducer.products);

  const handleFav = id => {
    if (!favProducts.includes(id)) {
      setFavProducts(favProducts.concat(id));
      setFavIconColor(true)
    }
    else {
      setFavProducts([]);
      setFavIconColor(false)
    }
  };


  return (
    <Card sx={{ maxWidth: 250, maxheight: 250 }}>
      <CardHeader
        action={
          <IconButton onClick={() => handleFav(id)} aria-label="add to favorites">
            <FavoriteIcon
              sx={{
                color: favIconColor ? 'red' : 'green'
              }}
            />
            {/* <FavoriteIcon style={{ color: "red" }} /> */}
          </IconButton>
        }
      // title={name}
      />
      <Box
        sx={{
          width: 250,
          height: 150,
          backgroundColor: "primary.dark",
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={image}
          color="red"
          alt="Paella dish"
          padding="12"
        />
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹ {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          // style={{  }}
          aria-label="share"
          sx={{
            justifyContent: "center",
            marginLeft: 1,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <RemoveOutlined
            onClick={(e) => {
              return items.itemCount === 0 ? null : dispatch(decrement(items));
            }}
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          />

          <Button
            onClick={() => {
              dispatch(addToCart(items));
            }}
            className={classes.addCartBtn}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },

            }}
          >
            {`${items.itemCount ? items.itemCount : "Add to cart"} `}
          </Button>
          <AddOutlined
            onClick={() => {
              dispatch(increment(items));
            }}
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  addCartBtn: {
    '&.css-y7gai-MuiButtonBase-root-MuiButton-root': {
      width: '130px',
    },
    width: '130px'

  }
}));