import { Divider, Grid, Box, Dialog, Button, Typography } from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { makeStyles } from "@mui/styles";

import { useState, useEffect } from "react";
import React from "react";
import {
  Field,
  LightText,
  ErrorText,
} from "../../components/StyledComponents/StyledComponents ";
import User from "../../assets/user.png";

import * as VALIDATORS from "../../utils/Validators";
import * as CONST from "../../utils/Constants";
import { useSelector, useDispatch } from "react-redux";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data.data
  );

  //state to open Dialogs Edit profile and ChangePassword
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  //state to show and hide password fields
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showReEnterPass, setShowReEnterPass] = useState(false);

  //state to store change passoword fields valude
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  //state to show Change password field's Errors
  const [currenttPassError, setCurrentPassError] = useState(false);
  const [newPassError, setNewPassError] = useState(false);
  const [rePassError, setRePassError] = useState(false);

  const [currenttPassInvalid, setCurrentPassInvalidErr] = useState(false);
  const [newPassInvalidErr, setNewPassInvalidErr] = useState(false);
  const [rePassInvalidErr, setRePassInvalidErr] = useState(false);

  const handleChangePassword = () => {
    if (currentPassword.length === 0) {
      setCurrentPassError(true);
    } else if (!VALIDATORS.isPasswordValid(currentPassword)) {
      setCurrentPassInvalidErr(true);
    }

    if (newPassword.length === 0) {
      setNewPassError(true);
    } else if (!VALIDATORS.isPasswordValid(newPassword)) {
      setNewPassInvalidErr(true);
    }

    if (rePassword.length === 0) {
      setRePassError(true);
    } else if (newPassword !== rePassword) {
      setRePassInvalidErr(true);
    } else if (
      VALIDATORS.isPasswordValid(rePassword) &&
      VALIDATORS.isPasswordValid(currentPassword)
    ) {
      dispatch({
        type: "USER_CHANGE_PASS_SAGA",
        close: setOpenChangePass,
        payload: {
          currentPassword: currentPassword,
          newPassword: newPassword,
          id: userDetails?.id,
        },
      });
    }
  };

  const ChangePassDialog = () => {
    return (
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            // width: 500,
            // maxWidth: 500,
          },
        }}
        open={openChangePass}
        onClose={() => setOpenChangePass(false)}
      >
        <CloseIcon
          onClick={() => setOpenChangePass(false)}
          className={classes.closeIconStyle}
        />
        <DialogTitle>Change Password</DialogTitle>
        <Divider />
        <Grid
          container
          style={{ padding: "32px 40px", gap: "16px" }}
          // sx={{ px: 5, py: 4 }}
          // direction="column"
          // rowGap={2}
        >
          <Typography sx={{ marginBottom: "8px" }}>
            Enter a passsword with alphabets A-z, numbers 0-9 and a symbols
          </Typography>

          <Grid item xs={12}>
            <LightText>Enter current password</LightText>
            <Field
              sx={{ borderRadius: 2 }}
              fullWidth
              name="currentpassword"
              // value={password}
              type={showCurrentPass ? "text" : "password"}
              variant="outlined"
              onFocus={() => {
                setCurrentPassError(false);
                setCurrentPassInvalidErr(false);
              }}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                    >
                      {showCurrentPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                // disableUnderline: true,
              }}
            />
            {currenttPassError && currentPassword.length === 0 && (
              <Typography className={classes.ErrorText}>
                Current password requiured !
              </Typography>
            )}
            {currenttPassInvalid && currentPassword.length !== 0 && (
              <Typography className={classes.ErrorText}>
                Invalid Password
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <LightText>Enter new password</LightText>
            <Field
              sx={{ borderRadius: 2 }}
              fullWidth
              name="newPassword"
              // value={password}
              type={showNewPass ? "text" : "password"}
              variant="outlined"
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => {
                setNewPassError(false);
                setNewPassInvalidErr(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShowNewPass(!showNewPass)}>
                      {showNewPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                // disableUnderline: true,
              }}
            />
            {newPassError && newPassword.length === 0 && (
              <Typography className={classes.ErrorText}>
                New password requiured !
              </Typography>
            )}
            {newPassInvalidErr && newPassword.length !== 0 && (
              <Typography className={classes.ErrorText}>
                {CONST.ERROR_TEXT_PASSWORD_CONTAIN}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <LightText>Re-enter new password</LightText>
            <Field
              fullWidth
              name="name"
              // value={password}
              type={showReEnterPass ? "text" : "password"}
              onFocus={() => {
                setRePassError(false);
                setRePassInvalidErr(false);
              }}
              variant="outlined"
              onChange={(e) => setRePassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => setShowReEnterPass(!showReEnterPass)}
                    >
                      {showReEnterPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                // disableUnderline: true,
              }}
            />
            {rePassError && rePassword.length === 0 && (
              <Typography className={classes.ErrorText}>
                Re-enter new password required !
              </Typography>
            )}

            {rePassInvalidErr && rePassword.length !== 0 && (
              <Typography className={classes.ErrorText}>
                Re-enter new password must match New password
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.btncontainedPrimary}
              fullWidth
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    );
  };

  return (
    <>
      <Typography variant="h4">Profile</Typography>
      <Grid container className={classes.rightDivStyle} style={{ gap: "16px" }}>
        <Grid item container>
          <Box component="img" src={User} style={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item container>
          <Grid item xs={6}>
            <Typography>Name</Typography>
            <Typography>{userDetails?.full_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Email</Typography>
            <Typography>{userDetails?.email}</Typography>
          </Grid>
        </Grid>

        <Divider style={{ width: "100%" }} />

        <Grid container justifyContent="flex-end" alignItems="center">
          <Button
            variant="outlined"
            className={classes.btnOutlinedPrimary}
            onClick={() => setOpenChangePass(true)}
            style={{ marginRight: "16px" }}
          >
            {" "}
            Change Password
          </Button>

          <Button
            variant="contained"
            className={classes.btncontainedPrimary}
            onClick={() => setOpenEditProfile(true)}
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      {openEditProfile && (
        <EditProfile
          openEditProfile={openEditProfile}
          setOpenEditProfile={setOpenEditProfile}
        />
      )}
      {/* {EditProfileDialog()} */}
      {ChangePassDialog()}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  rightDivStyle: {
    marginTop: "20px",
    padding: "24px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
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
    background: "	#f8f8ff",
    border: "1px solid #66B2FF ",
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",
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
  closeIconStyle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
}));

export default UserProfile;
