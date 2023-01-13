import { Divider, Grid, Box, Dialog, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";
import React from "react";
import {
  Field,
  LightText,
  ErrorText,
} from "../../components/StyledComponents/StyledComponents ";

import Camera from "../../assets/camera.png";
import * as VALIDATORS from "../../utils/Validators";

import { useSelector, useDispatch } from "react-redux";
import OtpDialogue from "../../components/Dialogue/OtpDialogue";

const EditProfile = ({ openEditProfile, setOpenEditProfile }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(
    (state) => state.userReducer.userProfileData.data.data
  );
   

  useEffect(() => {
    setName(userDetails?.full_name);
    setMyEmail(userDetails?.email);
    setPhone(phoneTen);
    console.log("phone dialog useEffect", userDetails, name, myEmail, phone);
  }, []);

  
  let phoneTen = userDetails?.full_phone_number;
  phoneTen = phoneTen.toString();
  phoneTen = phoneTen.slice(2);
  console.log("phoneTen", phoneTen);


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

  let successcallback = (res)=> {
    console.log('================ res ', res)
    
    

  }

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

      
      if (myEmail !== userDetails?.email) {
        let isPhoneChange = false
        if(phone !== phoneTen)
        {
          isPhoneChange = true
        }
        console.log("email changed")
         dispatch({
          type: "GEN_EMAIL_OTP_SAGA",
          payload: {
            id: userDetails?.id,
            email: myEmail,
            close: setOpenEditProfile,
            type: "email_update",
          },
          phoneDetails :{
            isPhoneChange : isPhoneChange,
            id: userDetails?.id,
            phone: phone,
            type: "phone_update",
          }
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

      if(name !== userDetails?.full_name && myEmail !== userDetails?.email && phone === phoneTen){
        console.log("name changed")
         dispatch({
              type : "UPDATE_USER_PROFILE_SAGA",
              payload : {id : userDetails?.id, name : name, close : setOpenEditProfile},
              // successcallback: successcallback
            })
      }
      else if(myEmail === userDetails?.email && phone === phoneTen){
        console.log("no fields changed")
         dispatch({type : "SHOW_TOAST", payload: { severity: "info", message: "No fields are updated" },})
        //  setOpenEditProfile(false)
      }
      

      // if (
      //   phoneTen !== phone &&
      //   userDetails?.email === myEmail &&
      //   userDetails?.full_name === name
      // ) {
      //   console.warn("Phone Changed");
      //   dispatch({
      //     type: "GEN_PHONE_OTP_SAGA",
      //     payload: {
      //       id: userDetails?.id,
      //       phone: phone,
      //       type : "phone_update"
      //     },
      //   });
      // } else if (
      //   userDetails?.email !== myEmail &&
      //   phoneTen === phone &&
      //   userDetails?.full_name === name
      // ) {
      //   console.warn("Email changed");
      //   dispatch({
      //     type: "GEN_EMAIL_OTP_SAGA",
      //     payload: { id: userDetails?.id, email: myEmail, close : setOpenEditProfile, type : "email_update"},
      //   });

      // } else if(
      //   userDetails?.full_name !== name && userDetails?.email === myEmail && phoneTen === phone
      // )
      // {
      //   console.log("name changed only")
      //   dispatch({
      //     type : "UPDATE_USER_PROFILE_SAGA",
      //     payload : {id : userDetails?.id, name : name, close : setOpenEditProfile}
      //   })
      // }
      //  else if (
      //   userDetails?.full_name !== name &&
      //   phoneTen !== phone &&
      //   userDetails?.email !== myEmail
      // ) {
      //   console.log("all fields Changed");
      // }
      // else{
      //    dispatch({type : "SHOW_TOAST", payload: { severity: "info", message: "No fields are updated" },})
      //    setOpenEditProfile(false)
      // }
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
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            cursor: "pointer",
          }}
        />

        <DialogTitle>
          Edit Profile {phone} {myEmail}
        </DialogTitle>
        <Divider />

        <Grid
          container
          sx={{ p: 4 }}
          // direction="column"
          rowGap={2}
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
              <ErrorText>Name requiured !</ErrorText>
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
              <ErrorText>Email requiured !</ErrorText>
            )}
            {emailInvalidErr && myEmail.length !== 0 && (
              <ErrorText>Invalid Email</ErrorText>
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
            {phoneError && <ErrorText>Phone requiured !</ErrorText>}
            {phoneInvalidErr && <ErrorText>Invalid phone</ErrorText>}
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleEditProfile}
              variant="contained"
              color="primary"
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

export default EditProfile;
