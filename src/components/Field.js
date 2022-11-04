import React from "react";
import { TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core";

const Field = () => {
  const classes = useStyles();
  return <TextField className={classes.field} />;
};

const useStyles = makeStyles((theme) => ({
  field: {
    // "&:MuiTextField-root": {
    //   border: "5px solid green",
    // },
    color: "black",
    "& .MuiOutlinedInput-root": {
      // border: forgotError ? "2px solid red" : "2px solid gray",
      // border: "1px solid 	#e6e6fa",
      border: `1px solid ${theme.palette.primary.light}`,

      borderRadius: "25px",
      paddingRight: "0px",
      // backgroundColor:"#f8f8ff",

      "& fieldset": {
        border: "none",
      },
      "& input": {
        padding: "12px",
        border: "none",
      },
      "&.Mui-focused": {
        // border : "none"
      },
    },
    // padding: "5px 0px 5px 10px",
    // border: forgotError ? "2px solid red" : "2px solid gray",
    "& input": {
      "&::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
      "&[type=number]": {
        MozAppearance: "textfield",
      },
    },
  },
}));

export default Field;
