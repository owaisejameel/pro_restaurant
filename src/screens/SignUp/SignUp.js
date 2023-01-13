import React from "react";

import { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Typography,
  FormControlLabel,
  Button,
  Checkbox,
} from "@mui/material";

import { Field } from "../../components/StyledComponents/StyledComponents ";

import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as VALIDATORS from "../../utils/Validators";

import logo from "../../assets/logo.png";
import loginBackground from "../../assets/loginBackground.jpg";
import * as CONST from "../../utils/Constants";
import { makeStyles } from "@mui/styles";

const SignUp = () => {
  const classes = useStyles();
  //variables for navigation and dispatching action
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //states for storing signup form values:
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  //states for making password show and hide:
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  //states for error handling:
  const [errorsSignUp, setErrorsSignUp] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [invalidNameError, setInvalidNameError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [invalidPhoneError, setInvalidPhoneError] = useState(false);
  const [invalidPasswordError, setInvalidPasswordError] = useState(false);

  //function to handle signup form values
  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  //function to handle fields blur
  const handleBlur = (e) => {
    // setErrorsSignUp({
    //   ...errorsSignUp,
    //   [e.target.name]: true,
    // });
    // if(e.target.name == "name"){
    //   if(!VALIDATORS.isNameValid(signUpDetails.name)){
    //     setInvalidNameError(true)
    //   }
    // }
    // if (e.target.name == "email") {
    //   if (!VALIDATORS.isEmail(signUpDetails.email)) {
    //     setInvalidEmailError(true);
    //   }
    // }
    // if (e.target.name == "phone") {
    //   if (!VALIDATORS.isPhone(signUpDetails.phone)) {
    //     setInvalidPhoneError(true);
    //   }
    // }
    // if (e.target.name == "password") {
    //   if (!VALIDATORS.isPasswordValid(signUpDetails.password)) {
    //     setInvalidPasswordError(true);
    //   }
    // }
  };

  //function to handle field's focus :
  const handleFocus = (e) => {
    setErrorsSignUp({
      ...errorsSignUp,
      [e.target.name]: false,
    });
    if (e.target.name == "name") {
      setInvalidNameError(false);
    }
    if (e.target.name == "email") {
      setInvalidEmailError(false);
    }
    if (e.target.name == "phone") {
      setInvalidPhoneError(false);
    }
    if (e.target.name == "password") {
      setInvalidPasswordError(false);
    }
  };

  //function to navigate to home after sign in response
  const navigateToHome = () => {
    navigate("/home");
  };

  //function on create account button click
  const onSignUp = () => {
    console.log("handle onsignup");
    let userData = {
      ...signUpDetails,
    };
    console.log("singunp details ", userData);
    const { name, email, phone, password, confirmPassword } = signUpDetails;

    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      setErrorsSignUp({
        name: true,
        email: true,
        phone: true,
        password: true,
        confirmPassword: true,
      });
    }

    if (signUpDetails.name.length != 0) {
      if (!VALIDATORS.isNameValid(signUpDetails.name)) {
        setInvalidNameError(() => true);
      }
    }
    if (signUpDetails.email.length != 0) {
      if (!VALIDATORS.isEmail(signUpDetails.email)) {
        setInvalidEmailError(() => true);
      }
    }
    if (signUpDetails.phone.length != 0) {
      if (!VALIDATORS.isMobile(signUpDetails.phone)) {
        setInvalidPhoneError(() => true);
      }
    }

    if (signUpDetails.password.length != 0) {
      console.log("last if...");
      if (!VALIDATORS.isPasswordValid(signUpDetails.password)) {
        setInvalidPasswordError(true);
      }
    }
    if (
      name.length != 0 &&
      email.length != 0 &&
      phone.length != 0 &&
      password.length != 0 &&
      confirmPassword.length != 0 &&
      VALIDATORS.isNameValid(name) &&
      VALIDATORS.isEmail(email) &&
      VALIDATORS.isMobile(phone) &&
      VALIDATORS.isPasswordValid(password) &&
      password === confirmPassword
    ) {
      console.warn("dispatch...");
      dispatch({
        type: "USER_SIGNUP_SAGA",
        payload: userData,
        navigation: navigateToHome,
      });
    }
  };

  //function for Navigation to helpCenter
  // const navigateToHelpCenter = () => {
  //   navigate("/home/help-center")
  // }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${loginBackground}) no-repeat center/cover`,
      }}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
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
              marginBottom: "32px",
            }}
          />
        </Grid>

        <Grid container style={{ gap: "16px" }}>
          <Grid container>
            <Field
              name="name"
              fullWidth
              // variant="standard"
              variant="outlined"
              placeholder={CONST.FULLNAME_PLACEHOLDER}
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
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_NAME}
              </Typography>
            )}
            {signUpDetails.name.length != 0 && invalidNameError && (
              <Typography className={classes.ErrorText}>
                name shouldn't contain number and special symbols
              </Typography>
            )}
            {/* {signUpDetails.name.length >= 1 &&
              signUpDetails.name.length <= 2 &&
              errorsSignUp.name && <ErrorText>Name is too short</ErrorText>} */}
          </Grid>

          <Grid container>
            <Field
              name="email"
              fullWidth
              // variant="standard"
              variant="outlined"
              placeholder={CONST.EMAIL_PLACEHOLDER}
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
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_EMAIL}
              </Typography>
            )}
            {signUpDetails.email.length != 0 && invalidEmailError && (
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_EMAIL_INVALID}
              </Typography>
            )}
          </Grid>

          <Grid container>
            <Field
              name="phone"
              type="number"
              fullWidth
              // variant="standard"
              variant="outlined"
              placeholder={CONST.PHONE_PLACEHOLDER}
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
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_PHONE}
              </Typography>
            )}
            {signUpDetails.phone.length != 0 && invalidPhoneError && (
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_PHONE_MUST_10}
              </Typography>
            )}
            {/* {signUpDetails.phone.length != 0 &&
              (signUpDetails.phone.length < 10 ||
                signUpDetails.phone.length > 10) && (
                <ErrorText>{CONST.ERROR_TEXT_PHONE_MUST_10}</ErrorText>
              )} */}
          </Grid>

          <Grid container>
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              // variant="standard"
              variant="outlined"
              placeholder={CONST.PASSWORD_PLACEHOLDER}
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
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_PASSWORD}
              </Typography>
            )}
            {signUpDetails.password.length != 0 && invalidPasswordError && (
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_PASSWORD_CONTAIN}
              </Typography>
            )}
          </Grid>

          <Grid container>
            <Field
              name="confirmPassword"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              // variant="standard"
              variant="outlined"
              placeholder={CONST.CONFIRM_PASSWORD_PLACEHOLDER}
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
                // disableUnderline: true,
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
                <Typography className={classes.ErrorText}>
                  {CONST.ERROR_TEXT_CONFIRM_PASSWORD}
                </Typography>
              )}
            {signUpDetails.confirmPassword.length != 0 &&
              signUpDetails.confirmPassword != signUpDetails.password && (
                <Typography className={classes.ErrorText}>
                  {CONST.ERROR_TEXT_CONFIRM_PASSWORD_MATCH}
                </Typography>
              )}
          </Grid>

          <Grid container>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  className={classes.checkbx}
                  disableRipple
                  onClick={() => setCheckedTerms(!checkedTerms)}
                />
              }
              label={
                <Typography
                  component="span"
                  className={classes.termsnCondTxtBlue}
                >
                  {CONST.I_AGREE}
                  <b
                    // onClick={() => navigate("/home/help-center")}
                    //   onClick={()=>dispatch(
                    //     {
                    //       type: "TERMS_N_CONDITION_SAGA",
                    //       navigation : navigateToHelpCenter
                    // })}
                    onClick={() =>
                      navigate("/home/help-center/terms-condition")
                    }
                  >
                    {CONST.TERMS_N_SERVICE}
                  </b>
                  ,{" "}
                  <b onClick={() => navigate("/home/help-center")}>
                    {CONST.PRIVACY_POLICY}{" "}
                  </b>
                  and <b style={{ marginLeft: 0 }}>{CONST.CONTENT_POLICY}</b>
                </Typography>
              }
              labelPlacement="end"
            />
          </Grid>

          <Button
            variant="contained"
            className={classes.btncontainedPrimary}
            disabled={!checkedTerms}
            fullWidth
            onClick={onSignUp}
          >
            {CONST.CREATE_ACCOUNT}
          </Button>
        </Grid>

        {/* <Divider flexItem sx={{ my: 1 }}>
          or
        </Divider> */}

        <Button
          variant="outlined"
          alignItems="center"
          className={classes.btnOutlinedPrimary}
          fullWidth
          startIcon={
            <GoogleIcon style={{ fontSize: "25px", marginLeft: "10px" }} />
          }
        >
          {CONST.CONTINUE_GOOGLE}
        </Button>

        <Divider flexItem />

        <Grid container>
          <Typography>{CONST.ALREADY_HAVE_ACCOUNT}</Typography>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography color="primary" style={{ marginLeft: "4px" }}>
              {CONST.LOGIN}
            </Typography>
          </Link>
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
  btnOutlinedPrimary: {
    fontSize: "16px",
    color: "#000",
    // background: "#fff",
    background: "	#f8f8ff",

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
      border: "1px solid #66B2FF ",
    },
  },
  ErrorText: {
    marginLeft: "8px",
    fontSize: CONST.FONT_SIZE_12,
    color: theme.palette.error.main,
  },
  termsnCondTxtBlue: {
    fontSize: CONST.FONT_SIZE_12,
    "& b": {
      lineHeight: "0px",
      marginTop: "12px",
      color: theme.palette.primary.main,
      marginLeft: "4px",
    },
  },
  checkbx: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },
}));

export default SignUp;
