import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field } from "../../components/StyledComponents/StyledComponents ";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const ContactUs = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainDivMiddle} justifyContent="center">
      <Grid item xs={6} md={6}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography variant="h4">Contact us</Typography>
          </Grid>
          <Grid item xs={12} container className={classes.contactFormDiv}>
            <Grid item xs={12}>
              {/* <Field fullWidth placeholder="Name" /> */}
              <TextField
                placeholder="Name"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                className={classes.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} container style={{ gap: "20px" }}>
              <Grid
                item
                // xs={6}

                style={{ flexGrow: 1 }}
                // style={{ paddingRight: "5px" }}
              >
                {/* <Field fullWidth placeholder="Email" /> */}
                <TextField
                  placeholder="Email"
                  fullWidth
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  className={classes.textFieldStyle}
                />
              </Grid>
              <Grid
                item
                // xs={6}
                style={{ flexGrow: 1 }}
                // style={{ paddingLeft: "5px" }}
              >
                {/* <Field fullWidth placeholder="Phone Number" /> */}
                <TextField
                  placeholder="Phone Number"
                  fullWidth
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  className={classes.textFieldStyle}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Subject"
                fullWidth
                variant="standard"
                InputProps={{ disableUnderline: true }}
                className={classes.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} container>
              <Typography sx={{ mb: 1 }}>Message</Typography>
              {/* <Field fullWidth placeholder="Write your message here..." /> */}
              <Grid item xs={12}>
                <TextareaAutosize
                  style={{
                    width: "100%",
                  }}
                  className={classes.textAreaStyle}
                  minRows={5}
                  placeholder="Write your message here..."
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="flex-end" sx={{ my: 2 }}>
            <Button className={classes.btncontainedPrimary}>Send</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;

const useStyles = makeStyles((theme) => ({
  mainDivMiddle: {
    // minHeight: "100vh",
    minHeight: "calc(100vh - 320px)",
    backgroundColor: "#FCFCFC",
    padding: 5,
    zIndex: -1,
    marginTop: "4px",
  },
  contactFormDiv: {
    marginTop: "20px",
    padding: "48px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    backgroundColor: "#fff",
    gap: "40px",
  },
  textFieldStyle: {
    paddingBottom: "5px",
    borderBottom: "1px solid #e6e6e6",
    fontSize: "20px",
    // "& input::placeholder": {
    //   fontSize: "20px",
    // },
  },
  textAreaStyle: {
    padding: "20px 0px 0px 20px",
    border: "1px solid #e6e6e6",
    borderRadius: "8px",
    "& input::placeholder": {
      fontSize: "20px",
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
    // padding: "5px 40px",
    "&:hover": {
      boxShadow: "none",
      background: theme.palette.primary.main,
    },
  },
}));
