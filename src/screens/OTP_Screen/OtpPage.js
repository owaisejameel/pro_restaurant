import React, { useState } from "react";

import { Box, Grid, Button, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { Field } from "../../components/StyledComponents/StyledComponents ";

import logo from "../../assets/logo.png";
import loginBackground from "../../assets/loginBackground.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as VALIDATORS from "../../utils/Validators";
import { useEffect } from "react";
import OtpInputs from "../../components/OtpInputs/OtpInputs";

import * as CONST from "../../utils/Constants";
import { makeStyles } from "@mui/styles";

const OneTimePassword = () => {
  const classes = useStyles();
  const statess = useSelector((state) => state.userReducer.forgotData);
  console.log("state from otp components--------- ", statess);
  const data = useSelector((state) => state.userReducer.forgotData.data);
  const otp_data = useSelector(
    (state) => state.userReducer.forgotData.otp_data
  );
  const verifiedOtpData = useSelector(
    (state) => state.userReducer.verifiedOtpData
  );
  console.log(
    "state from otp components--------- ",
    data,
    "ot[data]",
    otp_data
  );
  // const otp_verified = otp_data.otp_verified
  console.log("otp_verified", verifiedOtpData);
  // variable for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //state to show password password page if otpVerified is true
  const [otpVerified, setOtpVerified] = useState(false);

  //states for holding input fied values
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  //states for making password show and hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //states for error handling new password page
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [invalidNewPassError, setInvalidNewPassError] = useState(false);
  const [invalidConfirmPassError, setInvalidConfirmPassError] = useState(false);

  //states for error handling of one time passs page
  const [errorOtp, setErrorOtp] = useState(false);
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    console.log("udeefffectotp");
    if (verifiedOtpData.data.otp_verified) setOtpVerified(true);
  }, [verifiedOtpData]);
  // useEffect(() => {
  //   if (isPasswordValid(newPassword) && confirmNewPassword === newPassword) {
  //     console.log("useEffect");
  //   }
  // }, [invalidNewPassError]);
  const navigateToLogin = () => {
    navigate("/");
  };

  const onContinueOtp = () => {
    console.log("onContinueOtp");
    console.log("digiyts", otp_data.otp_digits);
    console.log("otp we entered", otp);

    if (otp == otp_data.otp_digits) {
      dispatch({
        type: "VERIFY_OTP_SAGA",
        payload: {
          email: data.email,
          otp: otp_data.otp_digits,
        },
      });
    } else if (otp.length === 0) {
      setErrorOtp(true);
    } else if (otp !== otp_data?.otp_digits) {
      setErrorText("sent otp isn't matching enterd otp");
    }
  };

  //function to handle submit button
  const onSubmitPassword = () => {
    if (newPassword.length == 0) {
      setNewPasswordError(true);
    } else if (!VALIDATORS.isPasswordValid(newPassword)) {
      setInvalidNewPassError(true);
    }

    if (confirmNewPassword.length == 0) {
      setConfirmPasswordError(true);
    } else if (newPassword !== confirmNewPassword) {
      setInvalidConfirmPassError(true);
    } else if (
      VALIDATORS.isPasswordValid(newPassword) &&
      confirmNewPassword === newPassword
    ) {
      dispatch({
        type: "CHANGE_PASSWORD_SAGA",
        payload: {
          email: data.email,
          otpToken: verifiedOtpData.data.otp_token,
          password: newPassword,
          navigation: navigateToLogin,
        },
      });
    }
  };

  return (
    <Grid
      container
      style={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBackground}) center/cover no-repeat `,
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        container
        alignItems="center"
        direction="column"
        className={classes.centerDiv}
        xs={11}
        sm={7}
        md={5}
        lg={4}
        xl={3}
      >
        <Grid item>
          <Box
            component="img"
            src={logo}
            alt="login"
            style={{
              width: 280,
              height: 60,
              marginBottom: "20px",
            }}
          />
        </Grid>

        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          style={{ gap: "16px" }}
        >
          {otpVerified ? (
            <Typography variant="h4">{CONST.SET_NEW_PASSWORD}</Typography>
          ) : (
            <Typography variant="h4">{CONST.ONE_TIME_PASSWORD}</Typography>
          )}

          {!otpVerified && (
            <Typography color="primary" className={classes.textBold}>
              {CONST.ONE_TIME_PASSWORD_MESSAGE}
            </Typography>
          )}

          <Grid container style={{ gap: "16px" }}>
            {otpVerified ? (
              <>
                <Grid item container>
                  <Field
                    name="newPassword"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder={CONST.NEW_PASSWORD_PLACEHOLDER}
                    fullWidth
                    onFocus={() => setInvalidNewPassError(false)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          style={{ fontSize: "30px" }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {newPasswordError && newPassword.length == 0 && (
                    <Typography className={classes.ErrorText}>
                      {CONST.ERROR_TEXT_NEW_PASSWORD}
                    </Typography>
                  )}
                  {invalidNewPassError && newPassword.length !== 0 && (
                    <Typography className={classes.ErrorText}>
                      {CONST.ERROR_TEXT_PASSWORD_CONTAIN}
                    </Typography>
                  )}
                </Grid>
                <Grid item container>
                  <Field
                    name="confrimPassword"
                    variant="outlined"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={CONST.CONFIRM_NEW_PASSWORD_PLACEHOLDER}
                    onFocus={() => setInvalidConfirmPassError(false)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          style={{ fontSize: "30px" }}
                          position="start"
                        >
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  {confirmPasswordError && confirmNewPassword.length == 0 && (
                    <Typography className={classes.ErrorText}>
                      {CONST.ERROR_TEXT_CONFIRM_NEW_PASSWORD}
                    </Typography>
                  )}
                  {confirmNewPassword.length !== 0 &&
                    invalidConfirmPassError && (
                      <Typography className={classes.ErrorText}>
                        {CONST.ERROR_TEXT_CONFIRM_NEW_PASSWORD_MATCH}
                      </Typography>
                    )}
                </Grid>
              </>
            ) : (
              <Grid
                item
                xs={12}
                container
                style={{ width: "100%" }}
                onClick={() => {
                  setErrorOtp("");
                  setErrorText("");
                }}
              >
                <OtpInputs
                  onChange={(otp) => {
                    setOtp(otp);
                  }}
                  value={otp}
                />
                {errorOtp && otp.length === 0 && (
                  <Typography className={classes.ErrorText}>
                    OTP is required
                  </Typography>
                )}
                {
                  <Typography className={classes.ErrorText}>
                    {errorText}
                  </Typography>
                }
              </Grid>
            )}
          </Grid>

          <Grid container>
            {otpVerified ? (
              <>
                <Grid container style={{ gap: "16px" }}>
                  <Button
                    variant="contained"
                    className={classes.btncontainedPrimary}
                    onClick={onSubmitPassword}
                    fullWidth
                  >
                    {CONST.SUBMIT}
                  </Button>
                </Grid>
              </>
            ) : (
              <>
                {" "}
                <Grid container style={{ gap: "16px" }}>
                  <Button
                    className={classes.btncontainedPrimary}
                    variant="contained"
                    onClick={onContinueOtp}
                    fullWidth
                  >
                    {CONST.CONTINUE}
                  </Button>
                  {/* <Button
                    
                    variant="outlined"
                    onClick={() => setOtpVerified(true)}
                    fullWidth
                  >
                    go to pass screen
                  </Button> */}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "16px",
    boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.5)",
    padding: "32px",
    gap: "16px",
  },
  btncontainedPrimary: {
    fontSize: "16px",
    color: "#fff",
    background: theme.palette.primary.main,
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      background: theme.palette.primary.main,
    },
  },

  ErrorText: {
    marginLeft: "8px",
    fontSize: CONST.FONT_SIZE_12,
    color: theme.palette.error.main,
  },
  textBold: {
    fontWeight: "fontWeightSemiBold",
    fontWeight: 600,
  },
}));

export default OneTimePassword;
