import React from "react";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

import { useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const LoginButton = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "244218418002-j5d2f1j88fc0p1nrjqriuj6k6evpclgr.apps.googleusercontent.com";

  const onSuccess = (res) => {
    const navigatetoHome = () => {
      navigate("/home");
    };
    console.log("success:", res);
    let token = res?.tokenId;
    dispatch({
      type: "GOOGLE_LOGIN",
      token: res,
      navigate: navigatetoHome,
    });
  };

  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <div style={{ width: "100%" }}>
      <GoogleLogin
        clientId={clientId}
        buttonText="Continue with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
        render={(renderProps) => (
          <Button
            fullWidth
            className={classes.btnOutlinedPrimary}
            onClick={renderProps.onClick}
            startIcon={<GoogleIcon style={{ marginLeft: "10px" }} />}
          >
            Continue with Google
          </Button>
        )}
      />
    </div>
  );
};

export default LoginButton;

const useStyles = makeStyles((theme) => ({
  btnOutlinedPrimary: {
    fontSize: "16px",
    color: "#000",
    // background: "#fff",
    background: "	#f8f8ff",
    // border: "1px solid #66B2FF ",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",
    "& .MuiSvgIcon-root": {
      fontSize: 30,
      marginLeft: 1,
      color: theme.palette.primary.main,
    },
    "&:hover": {
      boxShadow: "none",
      background: "#f8f8ff",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
