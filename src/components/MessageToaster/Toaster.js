import React from "react";
import { Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = () => {
  const dispatch = useDispatch();
  const snackbarObj = useSelector((state) => state.loaderReducer.snackbar);
  const vertical = "top";
  const horizontal = "center";

  return (
    <Snackbar
      open={snackbarObj.isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical, horizontal }}
      onClose={() => dispatch({ type: "TOAST_CLOSE" })}
    >
      <Alert
        onClose={() => dispatch({ type: "TOAST_CLOSE" })}
        severity={snackbarObj.severity}
        sx={{ width: "100%" }}
      >
        {snackbarObj.message}
        {/* This is a success message! */}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
