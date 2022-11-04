import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Loader = () => {
  // const classes = useStyles();
  const isLoader = useSelector((state) => state.loaderReducer.isLoader);
  console.log("isloggined..", isLoader);
  const dispatch = useDispatch();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoader}
      // onClick={() => dispatch({ type: "LOADER_CLOSE" })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
