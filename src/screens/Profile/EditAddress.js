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

import InputAdornment from "@mui/material/InputAdornment";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";

import { Field } from "../../components/StyledComponents/StyledComponents ";

import { useState } from "react";

import { useDispatch } from "react-redux";

import * as CONST from "../../utils/Constants";
import * as VALIDATORS from "../../utils/Validators";

const EditAddress = (props) => {
  console.log("props", props);
  // varible for accessing style object
  const classes = useStyles();

  // userID from localStorage
  const userId = JSON.parse(localStorage.getItem("userId"));

  // variable for dispatching actions
  const dispatch = useDispatch();

  // const EditAddressData = useSelector((state) => state.userReducer.editAddress);
  // const openEditDialog = useSelector(
  //   (state) => state.userReducer.editAddress.open
  // );

  // console.log("editaddress reduz astate", EditAddressData);
  //   const [flatNo, setFlatNo] = useState(EditAddressData?.flat);
  //   const [area, setArea] = useState(EditAddressData?.area);

  const [editAddressDetail, setEditAddressDetail] = useState({
    // flatNo: EditAddressData?.flat,
    // area: EditAddressData?.area,
    // flatNo: props.addressDetails.flatNo,
    // area: props.addressDetails.area,
  });

  //function to handle onchange
  // const handleOnChange = (e) => {
  //   setEditAddressDetail({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  //destructuring eeditAddressDetail object value
  // const { flatNo, area } = editAddressDetail && editAddressDetail;

  // useEffect(() => {
  //   console.log("user effectg ");
  // }, []);
  const { id, area } = props.addressDetails;

  const [areaErr, setAreaErr] = useState(false);

  const onSaveAdressAndProceed = () => {
    if (VALIDATORS.checkLength(props.addressDetails.area)) {
      setAreaErr(true);
    } else {
      dispatch({
        type: CONST.UPDATE_ADDRESS,
        payload: { userId, id, area },
        close: props.close,
        succesCallback: props.succesCallback,
      });
    }
  };

  return (
    <Dialog
      // open={openEditDialog}
      open={props.open}
      onClose={() => {
        // setAddressType("");
        // setOpenAddress(false);
        props.close();
      }}
    >
      <CloseIcon
        // onClick={() => dispatch({ type: "CLOSE_EDIT_BOX" })}
        onClick={() => props.close()}
        className={classes.closeIconStyle}
      />
      <DialogTitle>Edit Address</DialogTitle>
      <Divider />
      <Grid
        container
        style={{ padding: "32px 40px", gap: "16px" }}
        // sx={{ px: 5, py: 4 }}
        // direction="column"
        // rowGap={2}
      >
        {/* <Grid item xs={12}>
          <Field
            sx={{ borderRadius: 2 }}
            fullWidth
            name="flatNo"
            placeholder="Flat No. / House No. / Appartment No."
            // value={flatNo}
            value={props.addressDetails.flatNo}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            }}
            // onChange={handleOnChange}
            onChange={props.handleOnChange}
          />
         
        </Grid> */}

        <Grid item xs={12}>
          <Field
            sx={{ borderRadius: 2 }}
            fullWidth
            name="area"
            placeholder="Road name, Area, Colony"
            // value={area}
            value={props.addressDetails.area}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            // onChange={handleOnChange}
            onChange={props.handleOnChange}
          />
          {areaErr && props.addressDetails.area.length === 0 && (
            <Typography className={classes.ErrorText}>
              Area Requiured!
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} mt={2}>
          <Button
            variant="contained"
            className={classes.btncontainedPrimary}
            fullWidth
            onClick={onSaveAdressAndProceed}
          >
            Save address & proceed{" "}
          </Button>
        </Grid>
      </Grid>
    </Dialog>
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
    // margin: "24px 24px 0px 0px",

    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgb(102, 178, 255, 0.3)",
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
    },
  },
}));

export default EditAddress;
