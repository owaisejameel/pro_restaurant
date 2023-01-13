import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const isLoader = useSelector((state) => state.loaderReducer.isLoader);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoader}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
