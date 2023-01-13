import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  Select,
  MenuItem,
} from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";

import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import PinIcon from "@mui/icons-material/Pin";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import HouseIcon from "@mui/icons-material/House";
import BusinessIcon from "@mui/icons-material/Business";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Field } from "../../components/StyledComponents/StyledComponents ";
import NoAddress from "../../assets/no-address.png";
import { useState } from "react";

import * as CONST from "../../utils/Constants";
import * as VALIDATORS from "../../utils/Validators";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../../components/Dialogue/AlertDialog";
import EditAddress from "./EditAddress";

const SavedAddress = () => {
  // varible for accessing style object
  const classes = useStyles();
  // console.log("classes...", classes);

  // variable for dispatching actions
  const dispatch = useDispatch();
  const openEditDialog = useSelector(
    (state) => state.userReducer.editAddress.open
  );

  //state to open add address Dialog.
  const [openAddress, setOpenAddress] = useState(false);

  //state to store address details
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    state: "Select State",
    city: "Select City",
    flatNo: "",
    area: "",
    addressType: "",
    id: "",
  });

  //state to handle Error
  const [nameReqErr, setNameReqErr] = useState(false);
  const [phoneReqErr, setPhoneReqErr] = useState(false);
  const [pinReqErr, setPinReqErr] = useState(false);
  const [stateReqErr, setStateReqErr] = useState(false);
  const [cityReqErr, setCityReqErr] = useState(false);
  const [flatReqErr, setFlatReqErr] = useState(false);
  const [areaReqErr, setAreaReqErr] = useState(false);

  const [invalidPhoneErr, setInvalidPhoneErr] = useState(false);

  //state to open and close alert Dialog
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditDialogue, setOpenEditDialogue] = useState(false);

  //state for page toggling temporay
  const [userAddresses, setUserAddresses] = useState([]);

  const succesCallback = (res) => {
    setUserAddresses(res?.data?.data);
  };

  useEffect(() => {
    dispatch({ type: CONST.GET_USER_ADDRESSESS, succesCallback });
  }, []);

  //function to handle onchage field events
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setAddressDetails({
      ...addressDetails,
      [name]: value,
    });
  };

  // function on cliking add address
  const onAddressAdd = () => {
    const {
      fullName,
      phoneNumber,
      pincode,
      state,
      city,
      flatNo,
      area,
      addressType,
    } = addressDetails;

    if (VALIDATORS.checkLength(fullName)) {
      setNameReqErr(true);
    }

    if (VALIDATORS.checkLength(phoneNumber)) {
      setPhoneReqErr(true);
    } else if (!VALIDATORS.isMobile(phoneNumber)) {
      setInvalidPhoneErr(true);
    }

    if (VALIDATORS.checkLength(pincode)) {
      setPinReqErr(true);
    }

    if (state === "Select State") {
      setStateReqErr(true);
    }

    if (city === "Select City") {
      setCityReqErr(true);
    }

    if (VALIDATORS.checkLength(flatNo)) {
      setFlatReqErr(true);
    }

    if (VALIDATORS.checkLength(area)) {
      setAreaReqErr(true);
    } else if (
      !VALIDATORS.checkLength(fullName) &&
      !VALIDATORS.checkLength(flatNo) &&
      VALIDATORS.isMobile(phoneNumber) &&
      !VALIDATORS.checkLength(pincode) &&
      city !== "Select City" &&
      state !== "Select State"
    ) {
      dispatch({
        type: CONST.CREATE_USER_ADDRESS,
        payload: addressDetails,
        close: setOpenAddress,
        succesCallback: succesCallback,
      });
    }
  };

  const {
    fullName,
    phoneNumber,
    pincode,
    state,
    city,
    flatNo,
    area,
    addressType,
  } = addressDetails;

  let indianStates = State.getStatesOfCountry("IN");
  // console.log("all States...", indianStates);

  // const stateObj = indianStates.filter(
  //   (state) => state.name === "Madhya Pradesh"
  // );
  const stateObj = indianStates.filter(
    (state) => state.name === addressDetails.state
  );
  // console.log("stateObj", stateObj);
  const isoCODE = stateObj[0]?.isoCode;
  // console.log("staeObj", stateObj);
  // console.log("staeObj with isoCoe", isoCODE);

  // console.log("mp cities", City.getCitiesOfState("IN", "MP"));
  // console.log("mp cities", City.getCitiesOfState("IN", stateObj[0]?.isoCode));
  const cities = City.getCitiesOfState("IN", stateObj[0]?.isoCode);

  return (
    <>
      <Typography variant="h4">Saved Addresess</Typography>

      <Grid container className={classes.rightDivStyle}>
        {userAddresses ? (
          //  when user have addresses avialable this part would render
          <Grid container sx={{ gap: 4 }}>
            {
              // [
              //   {
              //     flat: 168,
              //     area: "Princes Business Skypark, AB road indore, M.P",
              //   },
              //   { flat: 108, area: "khajarna indore, M.P" },
              //   {
              //     flat: 12,
              //     area: "ring road, AB road indore, M.P",
              //   },
              // ]
              userAddresses.map((item) => (
                <Grid item className={classes.addressCard} key={item.id}>
                  <Grid container flexWrap="nowrap">
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography>
                      {item?.floor} {item?.complete_address}{" "}
                      {item?.receiver_city} {item?.receiver_state}
                    </Typography>
                  </Grid>
                  <Grid container sx={{ mt: 1 }} justifyContent="flex-end">
                    <Button
                      onClick={() => {
                        setAddressDetails({
                          ...addressDetails,
                          flatNo: item.floor,
                          area: item?.complete_address,
                          id: item?.id,
                        });
                        setOpenEditDialogue(true);
                      }}
                      className={classes.addressCardBtn}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setAddressDetails({ ...addressDetails, id: item?.id });
                        setOpenDeleteAlert(true);
                      }}
                      className={classes.addressCardBtn}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        ) : (
          // when no address is saved this part would rendere
          <Grid
            container
            direction="column"
            style={{ gap: "16px", padding: "40px 0px" }}
            alignItems="center"
          >
            <Box
              component="img"
              style={{ width: 250, height: 250 }}
              src={NoAddress}
            />
            <Typography variant="h4" color="primary">
              No addresess saved !
            </Typography>
            <Typography>
              No addresess have been saved to the address list yet !
            </Typography>
            <Divider flexItem sx={{ mt: 2 }} />
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              className={classes.btncontainedPrimary}
              onClick={() => setOpenAddress(true)}
            >
              Add address
            </Button>
          </Grid>
        )}
        {/* Alert Dialog */}
        {openDeleteAlert && (
          <AlertDialog
            dialogState={openDeleteAlert}
            // dialogFun={myFun}
            title="Delete"
            dialogCloseFun={() => setOpenDeleteAlert(false)}
            description="Are you sure you want to delete this address?"
            buttonTextCancel="Cancel"
            buttonTextConfirmAction="Delete"
            // itemId={addressDetails.id}
            // succesCallback={succesCallback}
            confirmHandler={() => {
              dispatch({
                type: CONST.DELETE_ADDRESS,
                itemId: addressDetails.id,
                succesCallback: succesCallback,
              });
              setOpenDeleteAlert(false);
            }}
          />
        )}
        {/* Add address Dialog */}
        {openAddress && (
          <Dialog
            open={openAddress}
            onClose={() => {
              // setAddressType("");
              setOpenAddress(false);
            }}
          >
            <CloseIcon
              onClick={() => setOpenAddress(false)}
              className={classes.closeIconStyle}
            />
            <DialogTitle>Add address</DialogTitle>
            <Divider />
            <Grid
              container
              style={{ padding: "32px 40px", gap: "16px" }}
              // sx={{ px: 5, py: 4 }}
              // direction="column"
              // rowGap={2}
            >
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="fullName"
                  placeholder="Full Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                />
                {nameReqErr && fullName.length === 0 && (
                  <Typography className={classes.ErrorText}>
                    Name Required!
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Field
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone number"
                  onFocus={() => setInvalidPhoneErr(false)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                />
                {phoneReqErr && phoneNumber.length === 0 && (
                  <Typography className={classes.ErrorText}>
                    Phone Required!
                  </Typography>
                )}
                {invalidPhoneErr && (
                  <Typography className={classes.ErrorText}>
                    Invalid phone number!
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      style={{ display: "inline-flex" }}
                      // fullWidth
                      name="pincode"
                      placeholder="Pincode"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PinIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleOnChange}
                    />
                    {pinReqErr && pincode.length === 0 && (
                      <Typography className={classes.ErrorText}>
                        Pin Required!
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      className={classes.btnOutlinedPrimary}
                      startIcon={<GpsFixedIcon />}
                    >
                      Use my location
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Select
                      className={classes.seletctMuiStyle}
                      value={addressDetails.state}
                      IconComponent={KeyboardArrowDownIcon}
                      onChange={handleOnChange}
                      name="state"
                      // onChange={(e) => {
                      //   console.log("select event", e.target.value);
                      //   setAddressDetails({
                      //     ...addressDetails,
                      //     state: e.target.value,
                      //   });
                      // }}
                    >
                      <MenuItem value="Select State" disabled>
                        Select State
                      </MenuItem>
                      {indianStates.map((state) => (
                        <MenuItem value={state.name}>{state.name}</MenuItem>
                      ))}
                    </Select>
                    {stateReqErr && state === "Select State" && (
                      <Typography className={classes.ErrorText}>
                        Select state
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      className={classes.seletctMuiStyle}
                      IconComponent={KeyboardArrowDownIcon}
                      name="city"
                      value={addressDetails.city}
                      onChange={handleOnChange}
                    >
                      <MenuItem value="Select City" disabled>
                        Select City
                      </MenuItem>
                      {cities.map((city) => (
                        <MenuItem value={city.name}>{city.name}</MenuItem>
                      ))}
                      {/* <MenuItem value="Indore">Indore</MenuItem>
                      <MenuItem value="Bhopal">Bhopal</MenuItem> */}
                    </Select>
                    {cityReqErr && city === "Select City" && (
                      <Typography className={classes.ErrorText}>
                        Select city
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Field
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  name="flatNo"
                  placeholder="Flat No. / House No. / Appartment No."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                />
                {flatReqErr && flatNo.length === 0 && (
                  <Typography className={classes.ErrorText}>
                    Flat No. / House No. Requiured!
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Field
                  sx={{ borderRadius: 2 }}
                  fullWidth
                  name="area"
                  placeholder="Road name, Area, Colony"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleOnChange}
                />
                {areaReqErr && area.length === 0 && (
                  <Typography className={classes.ErrorText}>
                    Area Requiured!
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} container ml={1} rowGap={1}>
                <Grid item xs={12}>
                  <Typography>Type of Address</Typography>
                </Grid>

                <Grid container columnGap={2}>
                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={2}
                    xl={2}
                    container
                    alignItems="center"
                    className={classes.chipStyle}
                    onClick={() =>
                      setAddressDetails({
                        ...addressDetails,
                        addressType: "home",
                      })
                    }
                    // onClick={handleOnChange("home")}
                    style={{
                      background:
                        addressDetails.addressType == "home" &&
                        CONST.primaryColor,
                      color: addressDetails.addressType == "home" && "#fff",
                    }}
                  >
                    <HouseIcon />
                    <Typography>Home</Typography>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    sm={3}
                    md={2}
                    lg={2}
                    xl={2}
                    container
                    alignItems="center"
                    className={classes.chipStyle}
                    onClick={() =>
                      setAddressDetails({
                        ...addressDetails,
                        addressType: "work",
                      })
                    }
                    style={{
                      background:
                        addressDetails.addressType == "work" &&
                        CONST.primaryColor,
                      color: addressDetails.addressType == "work" && "#fff",
                    }}
                  >
                    <BusinessIcon />
                    <Typography>Work</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Button
                  variant="contained"
                  className={classes.btncontainedPrimary}
                  fullWidth
                  onClick={onAddressAdd}
                >
                  Add address
                </Button>
              </Grid>
            </Grid>
          </Dialog>
        )}
        {/* {openEditDialog && <EditAddress />} */}
        {openEditDialogue && (
          <EditAddress
            addressDetails={addressDetails}
            open={openEditDialogue}
            // close={() => setOpenEditDialogue(false)}
            close={setOpenEditDialogue}
            handleOnChange={handleOnChange}
            succesCallback={succesCallback}
          />
        )}
      </Grid>
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
  addressCard: {
    width: "350px",
    maxWidth: "350px",
    padding: "2%",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
    // boxShadow: "0px 2px 4px rgb(102, 178, 255, 0.3)",
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
    color: "#8e8e8e",
    background: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "25px",
    boxShadow: "none",
    letterSpacing: "1px",
    textTransform: "none",
    "& .MuiSvgIcon-root": {
      // fontSize: 30,
      // marginLeft: 1,
      // color: theme.palette.primary.main,
      color: "#8e8e8e",
    },
    "&:hover": {
      boxShadow: "none",
      background: theme.palette.primary.main,
      color: " #fff",
      border: `1px solid ${theme.palette.primary.main}`,

      "& .MuiSvgIcon-root": {
        color: "#fff",
      },
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: CONST.FONT_SIZE_12,
    },
  },
  closeIconStyle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
  chipStyle: {
    borderRadius: "24px",
    textTransform: "none",
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: CONST.FONT_SIZE_16,
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      marginLeft: "5px",
    },
    "& p": {
      margin: "2px 0px 0px 3px",
    },
  },
  useMyLocationStyle: {
    borderRadius: "24px",
    textTransform: "none",
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: CONST.FONT_SIZE_16,
    color: "#8e8e8e",
    cursor: "pointer",
    "& .MuiSvgIcon-root": {
      marginLeft: "8px",
    },
    "& p": {
      margin: "2px 0px 0px 12px",
    },
  },
  seletctMuiStyle: {
    width: "100%",
    // borderRadius: 8,

    borderRadius: "24px",
    // border: (theme) => `1px solid ${theme.palette.primary.main}`,
    border: `1px solid ${theme.palette.primary.main}`,
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused": {
      // border: (theme) => `1px solid ${theme.palette.primary.light}`,
      border: `1px solid ${theme.palette.primary.main}`,
      color: "#000",
    },
    "&:hover": {
      // border: "1px solid grey",
    },
    "& .MuiSelect-select": {
      padding: "12px",
      color: "#8e8e8e",
    },
  },
  ErrorText: {
    paddingLeft: "8px",
    fontSize: CONST.FONT_SIZE_12,
    color: theme.palette.error.light,
  },
  addressCardBtn: {
    color: theme.palette.primary.main,
    textTransform: "none",
    letterSpacing: 1,
    borderRadius: "24px",
    "&:hover": {
      color: "#000",
      background: "#fff",
      // color: "#fff",
      // background: theme.palette.primary.main,
    },
  },
}));

export default SavedAddress;
