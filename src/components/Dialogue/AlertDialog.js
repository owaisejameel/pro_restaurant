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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AlertDialog(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  console.log("props", props);

  return (
    <div>
      <Dialog
        open={props.dialogState}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.title && (
          <>
            {" "}
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
              {props.title}
            </DialogTitle>
            <Divider />
          </>
        )}

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
            onClick={props.dialogCloseFun}
          >
            {props.buttonTextCancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.btncontainedPrimary}
            // onClick={() => {
            //   if (props.actionLogOut === "Delete") {
            //     dispatch({
            //       type: CONST.DELETE_ADDRESS,
            //       itemId: props.itemId,
            //       succesCallback: props.succesCallback,
            //     });
            //     props.dialogFun();
            //   } else {
            //     localStorage.removeItem("userId");
            //     navigate("/");
            //   }
            // }}
            onClick={props.confirmHandler}
          >
            {props.buttonTextConfirmAction}
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
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));
