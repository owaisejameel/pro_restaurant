import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import * as SIGNUP_CONST from "../../utils/Constants";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import loginBackground from "../../assets/loginBackground.jpg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonOTP,
  TypographyText,
  CheckboxStyled,
  Field,
  ErrorText,
} from "../../components/StyledComponents/StyledComponents ";

const isEmail = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

const isPasswordValid = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,}$/.test(
    password
  );
};

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorsSignUp, setErrorsSignUp] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [invalidPasswordError, setInvalidPasswordError] = useState(false);

  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setErrorsSignUp({
      ...errorsSignUp,
      [e.target.name]: true,
    });
    if (e.target.name == "email") {
      if (!isEmail(signUpDetails.email)) {
        setInvalidEmailError(true);
      }
    }
    if (e.target.name == "password") {
      if (!isPasswordValid(signUpDetails.password)) {
        setInvalidPasswordError(true);
      }
    }
  };

  const handleFocus = (e) => {
    setErrorsSignUp({
      ...errorsSignUp,
      [e.target.name]: false,
    });
    if (e.target.name == "email") {
      setInvalidEmailError(false);
    }
    if (e.target.name == "password") {
      setInvalidPasswordError(false);
    }
  };

  return (
    <Grid
      container
      sx={{ width: "100vw", height: "100vh" }}
      justifyContent="center"
      alignItems="center"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBackground}) no-repeat center/cover`,
      }}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        xs={11}
        sm={7}
        md={5}
        lg={4}
        xl={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255)",
          borderRadius: "16px",
          boxShadow: 8,
          p: 4,
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

        <Grid container sx={{ gap: 2 }}>
          <Grid container>
            <Field
              name="name"
              fullWidth
              variant="standard"
              placeholder={SIGNUP_CONST.FULLNAME_PLACEHOLDER}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              InputProps={{ disableUnderline: true }}
              // sx={{
              //   border: (theme) =>
              //     signUpDetails.name.length == 0 && errorsSignUp.name
              //       ? `2px solid ${theme.palette.error.light}`
              //       : "2px solid grey",
              // }}
            />
            {signUpDetails.name.length == 0 && errorsSignUp.name && (
              <ErrorText>Please enter a name</ErrorText>
            )}
            {signUpDetails.name.length >= 1 &&
              signUpDetails.name.length <= 2 &&
              errorsSignUp.name && <ErrorText>Name is too short</ErrorText>}
          </Grid>

          <Grid container>
            <Field
              name="email"
              fullWidth
              variant="standard"
              placeholder={SIGNUP_CONST.EMAIL_PLACEHOLDER}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              InputProps={{ disableUnderline: true }}
              // sx={{
              //   border: (theme) =>
              //     errorsSignUp.email && signUpDetails.email.length == 0
              //       ? `2px solid ${theme.palette.error.light}`
              //       : "2px solid grey",
              // }}
            />
            {signUpDetails.email.length == 0 && errorsSignUp.email && (
              <ErrorText>Please enter email</ErrorText>
            )}
            {signUpDetails.email.length != 0 && invalidEmailError && (
              <ErrorText>Invalid Email</ErrorText>
            )}
          </Grid>

          <Grid container>
            <Field
              name="phone"
              type="number"
              fullWidth
              variant="standard"
              placeholder={SIGNUP_CONST.PHONE_PLACEHOLDER}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              InputProps={{ disableUnderline: true }}
              // sx={{
              //   border: (theme) =>
              //     signUpDetails.phone.length == 0 && errorsSignUp.phone
              //       ? `2px solid ${theme.palette.error.light}`
              //       : "2px solid grey",
              // }}
            />
            {signUpDetails.phone.length == 0 && errorsSignUp.phone && (
              <ErrorText>Please enter phone</ErrorText>
            )}
            {signUpDetails.phone.length != 0 &&
              (signUpDetails.phone.length < 10 ||
                signUpDetails.phone.length > 10) && (
                <ErrorText>Phone must be 10 Digits</ErrorText>
              )}
          </Grid>

          <Grid container>
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="standard"
              placeholder={SIGNUP_CONST.PASSWORD_PLACEHOLDER}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment style={{ fontSize: "30px" }} position="start">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              // sx={{
              //   border: (theme) =>
              //     signUpDetails.password.length == 0 && errorsSignUp.password
              //       ? `2px solid ${theme.palette.error.light}`
              //       : "2px solid grey",
              // }}
            />
            {signUpDetails.password.length == 0 && errorsSignUp.password && (
              <ErrorText>Please enter password</ErrorText>
            )}
            {signUpDetails.password.length != 0 && invalidPasswordError && (
              <ErrorText>
                Password must contain Capital letter, Special character, digits
              </ErrorText>
            )}
          </Grid>

          <Grid container>
            <Field
              name="confirmPassword"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              variant="standard"
              placeholder={SIGNUP_CONST.CONFIRM_PASSWORD_PLACEHOLDER}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              // sx={{
              //   border: (theme) =>
              //     signUpDetails.confirmPassword.length == 0 &&
              //     errorsSignUp.confirmPassword
              //       ? `2px solid ${theme.palette.error.light}`
              //       : "2px solid grey",
              // }}
            />
            {signUpDetails.confirmPassword.length == 0 &&
              errorsSignUp.confirmPassword && (
                <ErrorText>Confirm password in necessary</ErrorText>
              )}
            {signUpDetails.confirmPassword.length != 0 &&
              signUpDetails.confirmPassword != signUpDetails.password && (
                <ErrorText>confirm password must match passsword</ErrorText>
              )}
          </Grid>

          <Grid container direction="row">
            <FormControlLabel
              value="end"
              control={
                <CheckboxStyled
                  onChange={(e) => setCheckedTerms(e.target.checked)}
                />
              }
              label={
                <Typography
                  component="span"
                  sx={{
                    mt: 1.25,
                    fontSize: 12,
                    "& b": {
                      color: (theme) => theme.palette.error.light,
                    },
                  }}
                >
                  {SIGNUP_CONST.I_AGREE}
                  <b
                    style={{ marginLeft: "4px" }}
                    onClick={() => navigate("/header")}
                  >
                    {SIGNUP_CONST.TERMS_N_SERVICE}
                  </b>
                  ,{" "}
                  <b style={{ marginLeft: "4px" }}>
                    {SIGNUP_CONST.PRIVACY_POLICY}{" "}
                  </b>
                  and <b>{SIGNUP_CONST.CONTENT_POLICY}</b>
                </Typography>
              }
              labelPlacement="end"
            />
          </Grid>

          <ButtonPrimary variant="contained" disabled={!checkedTerms} fullWidth>
            {SIGNUP_CONST.CREATE_ACCOUNT}
          </ButtonPrimary>
        </Grid>

        <Divider flexItem sx={{ my: 1 }}>
          or
        </Divider>

        <ButtonOTP
          fullWidth
          startIcon={
            <GoogleIcon
              style={{ fontSize: "30px", marginLeft: "10px" }}
              sx={{
                color: (theme) => theme.palette.primary.light,
              }}
            />
          }
        >
          Continue with Google
        </ButtonOTP>

        {/* <Button
          fullWidth
          sx={{
            boxShadow: "none",
            border: "2px solid grey",
            borderRadius: "16px",
            textTransform: "none",
            py: 1,
            color: "black",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow: "none",
            },
          }}
          startIcon={
            <GoogleIcon
              sx={{ color: (theme) => theme.palette.primary.light }}
              style={{ fontSize: "30px", marginLeft: "10px" }}
            />
          }
          variant="contained"
          color="info"
        >
          Continue with Google
        </Button> */}

        <Divider flexItem />

        <Grid container>
          <TypographyText>{SIGNUP_CONST.ALREADY_HAVE_ACCOUNT}</TypographyText>
          <Link style={{ textDecoration: "none" }} to="/">
            <TypographyText
              sx={{
                color: (theme) => theme.palette.error.light,
                ml: 0.5,
                cursor: "pointer",
              }}
            >
              {SIGNUP_CONST.LOGIN}
            </TypographyText>
          </Link>
        </Grid>

        {/* <Grid contaier>
          <p>{JSON.stringify(signUpDetails)}</p>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default SignUp;
