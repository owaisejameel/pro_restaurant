import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  browserImg: {
    height: "200px",
    width: "180px",
    padding: "24px 16px",
    backgroundColor: "hsla(0,0%,100%,.66)",
    border: "1px solid #dfe3e6",
    boxShadow: "rgb(33 33 33 / 6%)",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover": {
      boxShadow:
        "rgb(33 33 33 / 6%) 0px 3px 4px, rgb(33 33 33 / 4%) 0px 3px 3px, rgb(33 33 33 / 8%) 0px 1px 8px",
    },
  },
  browser_name: {
    textAlign: "left",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
  },
  brower_price: {
    fontSize: "14px",
    color: "#f47779",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
  },
}));

function RecommendSlider() {
  const classes = useStyles();
  const navigate = useNavigate();
  const productsRedux = useSelector((state) => state.cartReducer.products);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    speed: 1000,
    autoplay: true,
    nextArrow: <ArrowCircleRightIcon />,
    prevArrow: <ArrowCircleLeftIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider style={{ margin: "24px 20px" }} {...settings}>
      {productsRedux.map((data) => {
        //   id={item.item.id}
        //   name={item.item.name}
        //   image={item.item_image}
        //   price={item.item.price}
        //   items={item}
        return (
          <Box style={{ margin: "20px 10px" }}>
            <Box
              key={data.item.id}
              className={classes.browserImg}
              onClick={() => {
                navigate("/home/product-detail", { state: { data: data } });
              }}
            >
              {data.item_image ? (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 5px",
                  }}
                >
                  <img
                    src={data.item_image}
                    alt="image_slider"
                    height={150}
                    width={150}
                    style={{ borderRadius: "50%" }}
                  />
                </Box>
              ) : (
                ""
              )}
              {data.item.name ? (
                <Typography className={classes.browser_name}>
                  {data.item.name.substring(0, 20)}
                </Typography>
              ) : (
                ""
              )}
              <Typography className={classes.brower_price}>
                Rs.{data.item.price}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Slider>
  );
}

export default RecommendSlider;
