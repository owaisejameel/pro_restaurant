import { Typography, Divider, Grid, Box, Dialog, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import React from "react";
import {
  Field,
  LightText,
} from "../../components/StyledComponents/StyledComponents ";

import Camera from "../../assets/camera.png";
import * as VALIDATORS from "../../utils/Validators";
import * as CONST from "../../utils/Constants";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";

const EditProfile = ({ openEditProfile, setOpenEditProfile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data.data
  );

  let phoneTen = userDetails?.full_phone_number;
  phoneTen = phoneTen?.toString();
  phoneTen = phoneTen?.slice(2);
  console.log("phoneTen", phoneTen);

  useEffect(() => {
    setName(userDetails?.full_name);
    setMyEmail(userDetails?.email);
    setPhone(phoneTen);
    console.log("phone dialog useEffect", userDetails, name, myEmail, phone);
  }, []);

  //state for image showing
  const [selectedImage, setSelectedImage] = useState(null);

  const [name, setName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [phone, setPhone] = useState("");

  //state to show Edit Profile field's Errors
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // const [currenttPassInvalid, setCurrentPassInvalidErr] = useState(false);
  const [emailInvalidErr, setEmailInvalidErr] = useState(false);
  const [phoneInvalidErr, setPhoneInvalidErr] = useState(false);

  let successcallback = (res) => {
    console.log("================ res ", res);
  };

  const handleEditProfile = async () => {
    console.warn(userDetails);
    console.warn("name", name, phone, myEmail);

    if (name.length == 0) {
      setNameError(true);
    }

    if (myEmail.length == 0) {
      setEmailError(true);
    } else if (!VALIDATORS.isEmail(myEmail)) {
      setEmailInvalidErr(true);
    }

    if (phone.length == 0) {
      setPhoneError(true);
    } else if (!VALIDATORS.isMobile(phone)) {
      setPhoneInvalidErr(true);
    } else if (VALIDATORS.isEmail(myEmail) && name.length !== 0) {
      console.log("changed somethingss..../.");
      //if Email is changed then call only email api
      let isEmailChanged = false;
      let isPhoneChanged = false;
      let isNameChanged = false;

      if (myEmail !== userDetails?.email) {
        isEmailChanged = true;
      }
      if (phone !== phoneTen) {
        isPhoneChanged = true;
      }
      if (name !== userDetails?.full_name) {
        isNameChanged = true;
      }
      dispatch({
        type: "EDIT_PROF_FIELD_DATA",
        data: {
          name: name,
          phone: phoneTen,
          email: myEmail,
          phoneUpdate: isPhoneChanged,
          emailUpdate: isEmailChanged,
          nameUpdate: isNameChanged,
        },
      });

      if (myEmail !== userDetails?.email) {
        console.log("email changed");
        dispatch({
          type: "GEN_EMAIL_OTP_SAGA",
          payload: {
            id: userDetails?.id,
            email: myEmail,
            close: setOpenEditProfile,
            type: "email_update",
          },
        });
      }

      if (phone !== phoneTen && myEmail === userDetails?.email) {
        console.warn("Phone Changed");
        dispatch({
          type: "GEN_PHONE_OTP_SAGA",
          payload: {
            id: userDetails?.id,
            phone: phone,
            type: "phone_update",
          },
        });
      }

      if (name !== userDetails?.full_name) {
        console.log("name changed");
        dispatch({
          type: "UPDATE_USER_PROFILE_SAGA",
          payload: {
            id: userDetails?.id,
            name: name,
            close: setOpenEditProfile,
          },
          successcallback: successcallback,
        });
      } else if (myEmail === userDetails?.email && phone === phoneTen) {
        console.log("no fields changed");
        dispatch({
          type: "SHOW_TOAST",
          payload: { severity: "info", message: "No fields are updated" },
        });
        //  setOpenEditProfile(false)
      }
    }
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            // width: 500,
            // maxWidth: 500,
          },
        }}
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
      >
        <CloseIcon
          onClick={() => setOpenEditProfile(false)}
          className={classes.closeIconStyle}
        />

        <DialogTitle>
          Edit Profile {phone} {myEmail}
        </DialogTitle>
        <Divider />

        <Grid
          container
          style={{ padding: "32px", gap: "16px" }}
          // direction="column"
          // rowGap={2}
        >
          <Grid container sx={{ mt: 2 }} alignItems="flex-end" columnGap={2}>
            <label htmlFor="file-input">
              <Box
                component="img"
                src={selectedImage == null ? Camera : selectedImage}
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid gray",
                  borderRadius: 2,
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
                setSelectedImage(URL.createObjectURL(img));
              }}
            />
            {selectedImage !== null && (
              <Button
                variant="contained"
                color="error"
                onClick={() => setSelectedImage(null)}
                startIcon={<CloseIcon />}
              >
                Remove photo
              </Button>
            )}

            {/* <Box
              component="img"
              src={selectedImage ? selectedImage : Camera}
              sx={{ width: 100, height: 100, border: 1, mt: 2 }}
            /> */}
          </Grid>

          <Grid item xs={12}>
            <LightText>Name : </LightText>
            <Field
              fullWidth
              name="name"
              value={name}
              // value={userDetails.full_name}
              type="text"
              variant="outlined"
              onFocus={() => {
                setNameError(false);
              }}
              onChange={(e) => setName(e.target.value)}
            />

            {nameError && name.length === 0 && (
              <Typography className={classes.ErrorText}>
                Name requiured !
              </Typography>
            )}
            {/* {currenttPassInvalid && currentPassword.length !== 0 && (
              <ErrorText>Invalid Password</ErrorText>
            )} */}
          </Grid>

          <Grid item xs={12}>
            <LightText>Email : </LightText>
            <Field
              fullWidth
              name="email"
              value={myEmail}
              // value={userDetails.email}
              type="text"
              variant="outlined"
              onFocus={() => {
                setEmailError(false);
                setEmailInvalidErr(false);
              }}
              onChange={(e) => setMyEmail(e.target.value)}
            />
            {emailError && myEmail.length === 0 && (
              <Typography className={classes.ErrorText}>
                Email requiured !
              </Typography>
            )}
            {emailInvalidErr && myEmail.length !== 0 && (
              <Typography className={classes.ErrorText}>
                Invalid Email
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <LightText>Phone : </LightText>
            <Field
              fullWidth
              name="phone"
              value={phone}
              type="number"
              variant="outlined"
              onFocus={() => {
                setPhoneError(false);
                setPhoneInvalidErr(false);
              }}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <Typography className={classes.ErrorText}>
                Phone requiured !
              </Typography>
            )}
            {phoneInvalidErr && (
              <Typography className={classes.ErrorText}>
                Invalid phone
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleEditProfile}
              variant="contained"
              color="primary"
              className={classes.btncontainedPrimary}
              fullWidth
            >
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </Dialog>

      {/* <OtpDialogue id={userDetails?.id} email={myEmail} /> */}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
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
  closeIconStyle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
  ErrorText: {
    marginLeft: "8px",
    fontSize: CONST.FONT_SIZE_12,
    color: theme.palette.error.main,
  },
}));

export default EditProfile;
