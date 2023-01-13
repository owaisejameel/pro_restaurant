import {
  Divider,
  Grid,
  Box,
  Dialog,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { makeStyles } from "@mui/styles";

import { useState, useEffect } from "react";
import React from "react";
import { Field } from "../../components/StyledComponents/StyledComponents ";
import User from "../../assets/user.png";

import * as VALIDATORS from "../../utils/Validators";
import * as CONST from "../../utils/Constants";
import { useSelector, useDispatch } from "react-redux";
import EditProfile from "./EditProfile";

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userReducer?.userProfileData?.data.data
  );
  const avatar = useSelector(
    (state) => state.userReducer?.userProfileData?.data.avatar
  );

  console.log("avatar,,", avatar);

  //state to open Dialogs Edit profile and ChangePassword
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);

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

  //state to toggle Edit btn to Save Button
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);

  //state to handleEdit Name, Email,Phone fileds
  const [name, setName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [phone, setPhone] = useState("");

  //state to handle profile image
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  let phoneTen = userDetails?.full_phone_number;
  phoneTen = phoneTen?.toString();
  phoneTen = phoneTen?.slice(2);
  console.log("phoneTen", phoneTen);

  useEffect(() => {
    setName(userDetails?.full_name);
    setMyEmail(userDetails?.email);
    setPhone(phoneTen);
    setSelectedImage(avatar);
    // console.log("phone dialog useEffect", userDetails, name, myEmail, phone);
  }, [userDetails, avatar]);

  //state to handle Errors of Fields Name, Email,Phone
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailInvalidErr, setEmailInvalidErr] = useState(false);
  const [phoneInvalidErr, setPhoneInvalidErr] = useState(false);

  //functions to handle Save  Name, Email Phone
  //1--------------------------------------------
  const handleSaveName = () => {
    if (VALIDATORS.checkLength(name)) {
      setNameError(true);
    } else if (userDetails?.full_name === name) {
      setIsNameEdit(false);
    } else {
      dispatch({
        type: "UPDATE_NAME",
        payload: {
          id: userDetails?.id,
          name: name,
          imgSrc: avatar,
          close: function () {
            setIsNameEdit(false);
          },
        },
      });
    }
  };

  //2--------------------------------------------
  const handleSaveEmail = () => {
    if (VALIDATORS.checkLength(myEmail)) {
      setEmailError(true);
    } else if (!VALIDATORS.isEmail(myEmail)) {
      setEmailInvalidErr(true);
    } else if (userDetails?.email === myEmail) {
      setIsEmailEdit(false);
    } else {
      // alert("email dispatch", myEmail);
      dispatch({
        type: "GEN_EMAIL_OTP_SAGA",
        payload: {
          id: userDetails?.id,
          email: myEmail,
          type: "email_update",
          close: () => setIsEmailEdit(false),
        },
      });
    }
  };

  //3--------------------------------------------
  const handleSavePhone = () => {
    if (VALIDATORS.checkLength(phone)) {
      setPhoneError(true);
    } else if (!VALIDATORS.isMobile(phone)) {
      setPhoneInvalidErr(true);
    } else if (phoneTen === phone) {
      setIsPhoneEdit(false);
    } else {
      // alert("phone dispatch", phone);
      dispatch({
        type: "GEN_PHONE_OTP_SAGA",
        payload: {
          id: userDetails?.id,
          phone: phone,
          type: "phone_update",
          close: () => setIsPhoneEdit(false),
        },
      });
    }
  };

  //funciton to handle change password Dialog
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

  // Change password Dialog UI code
  const ChangePassDialog = () => {
    return (
      <Dialog open={openChangePass} onClose={() => setOpenChangePass(false)}>
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
            <Typography color="GrayText">Enter current password</Typography>
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
            <Typography color="GrayText">Enter new password</Typography>
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
            <Typography color="GrayText">Re-enter new password</Typography>
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
        <Grid item container alignItems="flex-end">
          <label htmlFor="file-input">
            <Box
              component="img"
              // src={selectedImage || User}
              src={profileImage ? profileImage : (selectedImage ? selectedImage : User) }
              // src={selectedImage == null ? User : selectedImage}
              sx={{ borderRadius: 1, p: 2, border: "1px solid #e6e6e6 " }}
              style={{
                width: 100,
                height: 100,
                // cursor: "pointer",
              }}
            />
          </label>
          <input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={(event) => {
              let img = event.target.files[0];
              console.log("files", img);
              // setSelectedImage(URL.createObjectURL(img));
              setSelectedImage(img);
              setProfileImage(URL.createObjectURL(img));
            }}
          />
          {selectedImage !== avatar && (
            <>
              <Button
                onClick={() => {
                  console.log("selected img....", selectedImage);
                  dispatch({
                    type: "UPDATE_IMAGE",
                    imgSrc: selectedImage,
                    name: name,
                  });
                }}
                // startIcon={<CloseIcon />}
              >
                Save
              </Button>
              <Button onClick={() => setSelectedImage(avatar)}>cancel</Button>
            </>
          )}
        </Grid>
        {/* <Grid item container className={classes.nameEmailBox}>
          <Grid item xs={6} sx={{ px: 1 }}>
            <Typography>Name</Typography>
            <Typography>{userDetails?.full_name}</Typography>
            <Divider sx={{ mt: 1 }} />
          </Grid>
          <Grid item xs={6} sx={{ px: 1 }}>
            <Typography>Email</Typography>
            <Typography>{userDetails?.email}</Typography>
            <Divider sx={{ mt: 1 }} />
          </Grid>
        </Grid> */}

        <Grid item xs={12}>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Typography color="gray">Name</Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={9}>
                  {isNameEdit ? (
                    <>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="name"
                        value={name}
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                        className={classes.EditProfileFields}
                      />
                      {name?.length === 0 && nameError && (
                        <Typography className={classes.ErrorText}>
                          Name required
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography className={classes.profileFields}>
                      {userDetails?.full_name}
                    </Typography>
                  )}
                </Grid>
                {isNameEdit ? (
                  <Button onClick={handleSaveName} className={classes.editBtn}>
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsNameEdit(true)}
                    className={classes.editBtn}
                  >
                    Edit Name
                  </Button>
                )}
              </Grid>
              <Divider sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="gray">Email</Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={9}>
                  {isEmailEdit ? (
                    <>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="email"
                        value={myEmail}
                        autoFocus
                        onFocus={() => setEmailInvalidErr(false)}
                        onChange={(e) => setMyEmail(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                        className={classes.EditProfileFields}
                      />
                      {myEmail?.length === 0 && emailError && (
                        <Typography className={classes.ErrorText}>
                          Email required
                        </Typography>
                      )}
                      {emailInvalidErr && (
                        <Typography className={classes.ErrorText}>
                          Invalid Email
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography className={classes.profileFields}>
                      {userDetails?.email}
                    </Typography>
                  )}
                </Grid>
                {isEmailEdit ? (
                  <Button onClick={handleSaveEmail} className={classes.editBtn}>
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsEmailEdit(true)}
                    className={classes.editBtn}
                  >
                    Edit Email
                  </Button>
                )}
              </Grid>
              <Divider sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="gray">Phone</Typography>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={9}>
                  {isPhoneEdit ? (
                    <>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="phone"
                        value={phone}
                        autoFocus
                        onFocus={() => setPhoneInvalidErr(false)}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{ disableUnderline: true }}
                        className={classes.EditProfileFields}
                      />
                      {phone?.length === 0 && phoneError && (
                        <Typography className={classes.ErrorText}>
                          Phone required
                        </Typography>
                      )}
                      {phoneInvalidErr && (
                        <Typography className={classes.ErrorText}>
                          Phone must be 10 digits
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography className={classes.profileFields}>
                      {phone}
                    </Typography>
                  )}
                </Grid>
                {isPhoneEdit ? (
                  <Button onClick={handleSavePhone} className={classes.editBtn}>
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsPhoneEdit(true)}
                    className={classes.editBtn}
                  >
                    Edit Phone
                  </Button>
                )}
              </Grid>
              <Divider sx={{ mt: 1 }} />
            </Grid>
          </Grid>
        </Grid>

        {/* <Divider style={{ width: "100%" }} /> */}

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

          {/* <Button
            variant="contained"
            className={classes.btncontainedPrimary}
            onClick={() => setOpenEditProfile(true)}
          >
            Edit Profile
          </Button> */}
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

  editBtn: {
    color: theme.palette.primary.main,
    textTransform: "none",
    letterSpacing: 1,
    borderRadius: "24px",
    "&:hover": {
      color: "#000",
      background: "#fff",
    },
  },
  profileFields: {
    fontWeight: 430,
    fontSize: "16px",
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

    "&:hover": {
      boxShadow: "none",
      background: "#f8f8ff",
      border: `1px solid ${theme.palette.primary.main}`,
    },
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
  EditProfileFields: {
    padding: "4px 10px",
    margin: "10px 0px",
    border: "1px solid #e6e6e6",
    borderRadius: "4px",
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
  nameEmailBox: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      // alignItems: "center",
      width: "100%",
    },
  },
}));

export default UserProfile;
