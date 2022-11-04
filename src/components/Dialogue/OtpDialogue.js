import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Dialog, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import OtpInputs from "../OtpInputs/OtpInputs";

import {
  TypographyText,
  LightText,
  TypographyTextLargerBold,
} from "../StyledComponents/StyledComponents ";

import { makeStyles } from "@mui/styles";
import * as CONST from "../../utils/Constants";

import Timer from "./Timer";

const OtpDialogue = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpenOtp = useSelector((state) => state.loaderReducer.isOtpBoxOpen);
  const isEnableResend = useSelector(
    (state) => state.loaderReducer.enableResendBtn
  );
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data.data
  );
  const email_Phone = useSelector(
    (state) => state.loaderReducer.editedEmail_Phone
  );
  const otp_type = useSelector((state) => state.loaderReducer.otp_type);
  console.warn("email_Phone and OTp Type", email_Phone);

  const editData = useSelector(
    (state) => state.userReducer.EditProfileFieldData.data
  );
  //state to store otp value
  const [otp, setOtp] = useState("");

  const successCallback = (res) => {
    if (res.status === 200 && res?.data?.otp_data?.otp_type == "email_update") {
      dispatch({
        type: "GEN_PHONE_OTP_SAGA",
        payload: {
          id: userDetails?.id,
          phone: editData.phone,
          type: "phone_update",
        },
      });
    }
  };
  return (
    <Dialog
      open={isOpenOtp}
      // open={true}
    >
      <Grid
        container
        sx={{ p: 4, position: "relative" }}
        direction="column"
        rowGap={2}
      >
        <CloseIcon
          onClick={() => dispatch({ type: "CLOSE_OTP_BOX" })}
          sx={{
            position: "absolute",
            top: 40,
            right: 40,
            cursor: "pointer",
          }}
        />
        <Grid item xs={12}>
          <TypographyTextLargerBold>OTP Verification</TypographyTextLargerBold>
          <Divider />
        </Grid>

        <LightText align="center">Otp sent successfully.</LightText>
        <OtpInputs
          onChange={(otp) => {
            setOtp(otp);
          }}
          value={otp}
        />
        <Button
          onClick={() =>
            dispatch({
              type: "VERIFY_OTP_EMAIL_PHONE_SAGA",
              payload: {
                id: userDetails?.id,
                email_Phone: email_Phone,
                otp: otp,
                otp_type: otp_type,
                successCallback: successCallback,
              },
            })
          }
          // onClick={()=>dispatch({type : "VERIFY_EMAIL_OTP_SAGA", payload : {
          //   id : userDetails?.id,
          //   email_Phone : email_Phone,
          //   otp : otp
          // }})}
          disabled={isEnableResend}
          variant="contained"
          className={classes.btncontainedPrimary}
        >
          VerifyOtp
        </Button>
        {/* <TypographyTextLarge align="center">02 : 00</TypographyTextLarge> */}
        <Timer />
        <Grid item xs={12} container alignItems="center">
          <TypographyText>Not recieved OTP?</TypographyText>
          <Button
            disabled={!isEnableResend}
            onClick={() => dispatch({ type: "DISABLE_RESEND" })}
            variant="text"
          >
            Resend Now
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OtpDialogue;

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "16px",
    // boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.5)",
    boxShadow: "0px 0px 12px 8px rgba( 255, 99, 71, 0.3)",
    padding: "32px",
    gap: "16px",
  },
  btncontainedPrimary: {
    fontSize: "16px",
    color: "#fff",
    background: "#66B2FF",
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      background: "#66B2FF",
    },
  },
  btnOutlinedPrimary: {
    fontSize: "16px",
    color: "#000",
    // background: "#fff",
    background: "	#f8f8ff",
    border: "1px solid #66B2FF ",
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
      border: "1px solid #66B2FF ",
    },
  },
  ErrorText: {
    marginLeft: "8px",
    fontSize: CONST.FONT_SIZE_12,
    color: theme.palette.error.main,
  },
}));
