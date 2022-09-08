import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../assets/logo.png";
import loginBackground from "../../assets/loginBackground.jpg";
import { Link, NavLink } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import * as LOGIN_CONST from "../../utils/Constants";
import {
  ButtonPrimary,
  ButtonOTP,
  Field,
  ErrorText,
  TypographyText,
  TypographyBold,
} from "../../components/StyledComponents/StyledComponents ";

const isEmail = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

const isNumber = (val) => {
  let isnum = /^\d+$/.test(val);
  return isnum;
};

const Login = () => {
  const [phone, setPhone] = useState(""); //state to store phone and email value
  const [password, setPassword] = useState(""); //state to store passsword value
  const [showPassword, setShowPassword] = useState(false); //state for password show and hide
  const [forgotPage, setForgotPage] = useState(false); //state to show forgot page (conditionally)
  const [forgotError, setForgotError] = useState(false); // state to handle forgot page field's error

  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidPhoneError, setInvalidPhoneError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);

  const [invalidError, setInvalidError] = useState(false);

  // const [errorsLogin, setErrorsLogin] = useState({
  //   phone: false,
  //   password: false,
  // });

  const handleBlur = (e) => {
    console.log("handleBLur", e.target.name);
    if (phone.length == 0) {
      setPhoneError(true);
    }

    if (password.length == 0) {
      setPasswordError(true);
    }
  };

  const handleSubmit = () => {
    if (phone.length == 0) {
      setPhoneError(true);
    }

    if (password.length == 0) {
      setPasswordError(true);
    }
  };

  const handleForgotSubmit = () => {
    setForgotError(true);
    console.log("handleforgotsubmit", forgotError);
  };

  return (
    <Grid
      container
      style={{
        // backgroundImage: `url(${loginBackground})`,
        // backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBackground}) center/cover no-repeat `,
      }}
      sx={{
        width: "100vw",
        height: "100vh",
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
        sx={{
          backgroundColor: "rgba(255, 255, 255)",
          borderRadius: "16px",
          boxShadow: 8,
          p: 5,
          gap: 2,
        }}
      >
        <Grid item>
          <Box
            component="img"
            src={logo}
            alt="login"
            sx={{
              width: 280,
              height: 60,
              mb: 4,
            }}
          />
        </Grid>

        {!forgotPage && (
          <Grid container sx={{ gap: 2 }}>
            <Grid item container>
              <Field
                fullWidth
                type="text"
                name="phone"
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={handleBlur}
                variant="standard"
                onFocus={() => {
                  setInvalidEmailError(false);
                  setInvalidPhoneError(false);
                }}
                placeholder={LOGIN_CONST.PHONE_EMAIL_PLACEHOLDER}
              />
              {phone.length == 0 && phoneError && (
                <ErrorText>Email / Phone Number is required</ErrorText>
              )}
              {phone.length != 0 && invalidPhoneError && (
                <ErrorText>Invalid Phone Number</ErrorText>
              )}
              {phone.length != 0 && invalidEmailError && (
                <ErrorText>Invalid Email</ErrorText>
              )}
            </Grid>

            <Grid item container>
              <Field
                fullWidth
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
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
                placeholder={LOGIN_CONST.PASSWORD_PLACEHOLDER}
              />
              {password.length === 0 && passwordError && (
                <ErrorText>Password required</ErrorText>
              )}
              {/* {password.length >= 1 && password.length < 8 && (
                <ErrorText>Minimum Password length is 8.</ErrorText>
              )} */}
            </Grid>

            <ButtonPrimary fullWidth onClick={handleSubmit}>
              {LOGIN_CONST.CONTINUE}
            </ButtonPrimary>
          </Grid>
        )}

        {!forgotPage && (
          <Grid container justifyContent="flex-end">
            <Typography
              onClick={() => setForgotPage(true)}
              sx={{
                mt: -0.5,
                fontSize: 16,
                cursor: "pointer",
                color: (theme) => theme.palette.error.light,
                textDecoration: "underline",
              }}
            >
              {LOGIN_CONST.FORGOT_PASSWORD}
            </Typography>
          </Grid>
        )}

        {!forgotPage && <Divider flexItem> or </Divider>}

        {!forgotPage && (
          <ButtonOTP
            fullWidth
            startIcon={
              <EmailIcon
                style={{ fontSize: "30px" }}
                sx={{
                  color: (theme) => theme.palette.error.light,
                }}
              />
            }
          >
            {LOGIN_CONST.LOGIN_OTP}
          </ButtonOTP>
        )}

        {!forgotPage && (
          <ButtonOTP
            fullWidth
            startIcon={
              <GoogleIcon
                // style={{ fontSize: "30px", marginLeft: "10px" }}
                sx={{
                  "&.MuiSvgIcon-root": {
                    fontSize: 30,
                    ml: 1,
                  },
                  color: (theme) => theme.palette.primary.light,
                }}
              />
            }
          >
            {LOGIN_CONST.CONTINUE_GOOGLE}
          </ButtonOTP>
        )}

        {forgotPage && (
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
            sx={{ gap: 2 }}
          >
            <TypographyText sx={{ mb: 2, fontSize: 30 }}>
              {LOGIN_CONST.FORGOT_PASSWORD}
            </TypographyText>
            <TypographyBold
              sx={{
                fontSize: 14,
                mt: -1,
                lineHeight: "18px",
                color: (theme) => theme.palette.primary.light,
              }}
            >
              {LOGIN_CONST.FORGOT_PASSWORD_PAGE_HEADING}
            </TypographyBold>

            <Grid container>
              <Field
                name="forgotEmail"
                variant="standard"
                placeholder={LOGIN_CONST.PHONE_EMAIL_PLACEHOLDER}
                fullWidth
                InputProps={{ disableUnderline: true }}
                failed={forgotError}
              />
              {forgotError && (
                <ErrorText>Email / Phone Number required</ErrorText>
              )}
            </Grid>

            <Grid container>
              <ButtonPrimary fullWidth onClick={handleForgotSubmit}>
                {LOGIN_CONST.SUBMIT}
              </ButtonPrimary>
            </Grid>
          </Grid>
        )}

        <Divider flexItem />

        {!forgotPage && (
          <Grid container>
            <TypographyText>{LOGIN_CONST.NEW_USER}</TypographyText>
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to="signup"
            >
              <TypographyText
                sx={{
                  color: (theme) => theme.palette.error.light,
                  ml: 0.5,
                  cursor: "pointer",
                }}
              >
                {LOGIN_CONST.CREATE_AN_ACCOUNT}
              </TypographyText>
            </NavLink>
          </Grid>
        )}

        {forgotPage && (
          <Grid container>
            <TypographyText>{LOGIN_CONST.ALREADY_HAVE_ACCOUNT}</TypographyText>

            <TypographyText
              onClick={() => setForgotPage(false)}
              sx={{
                color: (theme) => theme.palette.error.light,
                ml: 0.5,
                cursor: "pointer",
              }}
            >
              {LOGIN_CONST.LOGIN}
            </TypographyText>
          </Grid>
        )}

        {/* <Grid container>
          <TextField
            sx={{
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            }}
            fullWidth
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Login;
