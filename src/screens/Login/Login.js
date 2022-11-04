import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../assets/logo.png";
import loginBackground from "../../assets/loginBackground.jpg";
import { NavLink } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as CONST from "../../utils/Constants";
import { Field } from "../../components/StyledComponents/StyledComponents ";

import * as VALIDATORS from "../../utils/Validators";
import { makeStyles } from "@mui/styles";

const Login = () => {
  const classes = useStyles();

  // variable for navigation and dispatching actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const messages = useSelector((state) => state.userLoginReducer.message);
  // console.log("message from redux state.......", messages);

  //states for holding loign fields values
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //state for handling login fied's error
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  //states for making password show and hide:
  const [showPassword, setShowPassword] = useState(false);

  //state to show forgot page (conditionally)
  const [forgotPage, setForgotPage] = useState(false);

  //states for holding forgotpassword field value
  const [emailPhoneForgotField, setEmailPhoneForgotField] = useState("");

  // state to handle forgot page field's error
  const [forgotError, setForgotError] = useState(false);

  //state to know type is Email or Phone
  const [typePE, setTypePE] = useState("");
  const [typeForgot, setTypeForgot] = useState("");

  //function for navigation
  const navigateToOTP = () => {
    navigate("onetimepassword");
  };

  const navigateToHome = () => {
    navigate("home");
  };

  //function for Login
  const onLogin = () => {
    let user = {
      login: phone,
      password: password,
    };

    let isEmail_phone = "";

    if (phone.length == 0) {
      setPhoneError(true);
    } else if (VALIDATORS.isEmail(phone)) {
      setTypePE("");
      isEmail_phone = "email";
    } else if (VALIDATORS.isMobile(phone)) {
      setTypePE("");
      isEmail_phone = "phone";
    } else {
      setTypePE("Invalid Phone/Email");
    }

    if (password.length == 0) {
      setPasswordError(true);
    } else if (isEmail_phone === "email" || isEmail_phone === "phone") {
      dispatch({
        type: "USER_LOGIN_SAGA",
        payload: {
          user: user,
          typePE: isEmail_phone,
          navigation: navigateToHome,
        },
      });
    }
  };

  const onForgotSubmit = () => {
    let isEmail_phone = "";
    if (emailPhoneForgotField.length === 0) {
      setForgotError(true);
    } else if (VALIDATORS.isEmail(emailPhoneForgotField)) {
      setTypeForgot("");
      isEmail_phone = "email";
    } else if (VALIDATORS.isMobile(emailPhoneForgotField)) {
      setTypeForgot("");
      isEmail_phone = "phone";
    } else {
      setTypeForgot("Invalid Phone/Email");
    }

    if (isEmail_phone === "email" || isEmail_phone === "phone") {
      dispatch({
        type: "USER_FORGOT_SAGA",
        payload: {
          type: isEmail_phone,
          email_phone: emailPhoneForgotField,
          navigation: navigateToOTP,
        },
      });
    }
  };

  return (
    <Grid
      container
      style={{
        // backgroundImage: `url(${loginBackground})`,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
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
        xs={11}
        sm={7}
        md={5}
        lg={4}
        xl={3}
        className={classes.centerDiv}
      >
        <Grid item>
          <Box
            component="img"
            src={logo}
            alt="login"
            style={{ width: 280, height: 60, marginBottom: "32px" }}
          />
        </Grid>

        {!forgotPage && (
          <Grid container style={{ gap: "16px" }}>
            <Grid item container>
              <Field
                fullWidth
                type="text"
                name="phone"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setTypePE("")}
                // variant="standard"
                variant="outlined"
                placeholder={CONST.PHONE_EMAIL_PLACEHOLDER}
              />
              {phone.length == 0 && phoneError && (
                <Typography className={classes.ErrorText}>
                  {CONST.ERROR_TEXT_PHONE_EMAIL_REQ}
                </Typography>
              )}
              {phone.length != 0 && typePE == "Invalid Phone/Email" && (
                <Typography className={classes.ErrorText}>{typePE}</Typography>
              )}
            </Grid>

            <Grid item container>
              <Field
                fullWidth
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                // variant="standard"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder={CONST.PASSWORD_PLACEHOLDER}
              />
              {password.length === 0 && passwordError && (
                <Typography className={classes.ErrorText}>
                  {CONST.ERROR_TEXT_PASSWORD}
                </Typography>
              )}
              {/* {password.length >= 1 && password.length < 8 && (
                <ErrorText>Minimum Password length is 8.</ErrorText>
              )} */}
            </Grid>

            <Button
              variant="contained"
              className={classes.btncontainedPrimary}
              fullWidth
              onClick={onLogin}
              style={{ marginBottom: "16px" }}
            >
              {CONST.CONTINUE}
            </Button>
          </Grid>
        )}

        {!forgotPage && <Divider flexItem></Divider>}

        {!forgotPage && (
          <Button
            variant="outlined"
            className={classes.btnOutlinedPrimary}
            fullWidth
            startIcon={<EmailIcon />}
          >
            {CONST.LOGIN_OTP}
          </Button>
        )}

        {!forgotPage && (
          <Button
            variant="outlined"
            className={classes.btnOutlinedPrimary}
            fullWidth
            startIcon={<GoogleIcon style={{ marginLeft: "10px" }} />}
          >
            {CONST.CONTINUE_GOOGLE}
          </Button>
        )}

        {forgotPage && (
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            style={{ gap: "16px" }}
          >
            <Typography variant="h4" style={{ marginBottom: "16px" }}>
              {CONST.FORGOT_PASSWORD}
            </Typography>
            <Typography
              color="primary"
              style={{
                fontWeight: "600",
              }}
            >
              {CONST.FORGOT_PASSWORD_PAGE_HEADING}
            </Typography>

            <Grid container>
              <Field
                name="forgotEmail"
                // variant="standard"
                variant="outlined"
                placeholder={CONST.PHONE_EMAIL_PLACEHOLDER}
                fullWidth
                value={emailPhoneForgotField}
                InputProps={{ disableUnderline: true }}
                onFocus={() => setTypeForgot("")}
                failed={forgotError}
                onChange={(e) => setEmailPhoneForgotField(e.target.value)}
              />
              {forgotError && emailPhoneForgotField.length == 0 && (
                <Typography className={classes.ErrorText}>
                  {CONST.ERROR_TEXT_PHONE_EMAIL_REQ}
                </Typography>
              )}
              {emailPhoneForgotField.length !== 0 &&
                typeForgot === "Invalid Phone/Email" && (
                  <Typography className={classes.ErrorText}>
                    {typeForgot}
                  </Typography>
                )}
            </Grid>

            <Grid container>
              <Button
                className={classes.btncontainedPrimary}
                variant="contained"
                fullWidth
                onClick={onForgotSubmit}
              >
                {CONST.SUBMIT}
              </Button>
            </Grid>
          </Grid>
        )}

        <Divider flexItem />

        {!forgotPage && (
          <Grid container alignItems="baseline" justifyContent="space-between">
            <Grid item xs={8} container>
              <Typography>{CONST.NEW_USER}</Typography>
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to="signup"
              >
                <Typography
                  color="primary"
                  style={{
                    marginLeft: "4px",
                    cursor: "pointer",
                  }}
                >
                  {CONST.CREATE_AN_ACCOUNT}
                </Typography>
              </NavLink>
            </Grid>

            {/* <Divider sx={{ mx: 3 }} orientation="vertical" flexItem /> */}

            <Grid item xs={4} container>
              <Typography
                onClick={() => setForgotPage(true)}
                className={classes.forgotPassLink}
              >
                {CONST.FORGOT_PASSWORD}
              </Typography>
            </Grid>
          </Grid>
        )}

        {forgotPage && (
          <Grid container>
            <Typography>{CONST.ALREADY_HAVE_ACCOUNT}</Typography>

            <Typography
              color="primary"
              onClick={() => setForgotPage(false)}
              style={{
                marginLeft: "4px",
                cursor: "pointer",
              }}
            >
              {CONST.LOGIN}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;

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
  forgotPassLink: {
    marginTop: "-4px",
    fontSize: 16,
    cursor: "pointer",
    color: theme.palette.error.light,
    textDecoration: "underline",
  },

  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // },
}));
