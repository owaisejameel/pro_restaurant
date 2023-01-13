import React from "react";
import { styled } from "@mui/material/styles";
import OtpInput from "react-otp-input";

import * as CONST from "../../utils/Constants";

const StyledOTPInputs = styled(OtpInput)(({ theme }) => ({
  "& input": {
    margin: "0px 20px",
    width: "50px !important",
    height: "50px",
    borderRadius: "16px",
    // border: "2px solid #66B2FF",
    border: `2px solid ${CONST.primaryColor}`,
    // backgroundColor: "#f8f8ff",
    fontSize: "16px",
    "&:focus-visible": {
      border: `2px solid ${CONST.primaryColor}`,
      outline: "none",
      // "&::placeholder": {
      //   color: "transparent",
      // },
    },
  },
}));

const otpContainerStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
};

const OtpInputs = (props) => {
  // const classes = useStyles();
  return (
    <StyledOTPInputs
      containerStyle={otpContainerStyle}
      onChange={props.onChange}
      value={props.value}
      shouldAutoFocus
      isInputNum
    />
  );
};

export default OtpInputs;
