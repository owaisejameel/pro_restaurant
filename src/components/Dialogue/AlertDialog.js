import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Divider } from "@mui/material";
import { useEffect } from "react";

import { makeStyles } from "@mui/styles";

export default function AlertDialog(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(props.dialogState);

  // const handleClickOpen = () => {
  //   props.setOpen(true);
  // };

  // const handleClose = () => {
  //   console.log("handle close", props)
  //   props.dialogFun(false);
  // };

  useEffect(() => console.log("Dialog UseEffect"));

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.dialogState}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {props.title}
          {/* {"Log Out"} */}
        </DialogTitle>
        <Divider />
        {/* <TypographyTextLargeBold align='center'>Log Out ?</TypographyTextLargeBold> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
            {/* Are you sure you want to logout from Pro Restaurant ? */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            className={classes.btnOutlinedPrimary}
            onClick={props.dialogFun}
          >
            {props.actionCancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            // className={classes.btncontainedPrimary}
            // onClick={handleClose}
            onClick={() => alert("u clicked logut")}
          >
            {props.actionLogOut}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
}));
