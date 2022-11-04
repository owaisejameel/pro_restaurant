import React from "react";
import { Grid, Typography, Box, Link, Divider } from "@mui/material";
import playStore from "../../assets/playStore.png";
import appleStore from "../../assets/appleStore.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Twitter from "../../assets/twitter.png";
import YouTube from "../../assets/youtube.png";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@mui/styles";

const Footer = () => {
  const classes = useStyles();
  const LinkProps = {
    target: "_blank",
    rel: "noopener",
  };

  return (
    <footer style={{ width: "100%" }}>
      <Grid container justifyContent="center" className={classes.footerStyle}>
        <Grid item xs={8} className={classes.footerDivInside}>
          <Grid container direction="column" style={{ gap: "16px" }}>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  style={{ gap: "8px", padding: "24px 0px" }}
                >
                  <Typography>Contact us</Typography>
                  <NavLink className={classes.nav} to="contact-us">
                    <Typography>Send a Message</Typography>
                  </NavLink>
                  <Typography>+91 9999955555</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                container
                alignItems="center"
                direction="column"
                style={{ gap: "8px", padding: "24px 0px" }}
              >
                <Typography>About us</Typography>
                <NavLink className={classes.nav} to="about-us">
                  <Typography>Customer Reviews</Typography>
                </NavLink>

                <NavLink className={classes.nav} to="about-us">
                  <Typography>FAQs</Typography>
                </NavLink>
              </Grid>{" "}
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                // justifyContent="center"
                container
                alignItems="center"
                direction="column"
                style={{ gap: "8px", padding: "24px 0px" }}
              >
                <Typography>Social</Typography>
                <Grid
                  container
                  style={{ gap: "16px" }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Link href="https://www.facebook.com" {...LinkProps}>
                    <FacebookIcon
                      sx={{
                        "&.MuiSvgIcon-root": {
                          color: "gray",
                          fontSize: 30,
                        },
                      }}
                    />
                  </Link>

                  <Link href="https://www.instagram.com/" {...LinkProps}>
                    <InstagramIcon
                      sx={{
                        "&.MuiSvgIcon-root": {
                          color: "gray",
                          fontSize: 30,
                        },
                      }}
                    />
                  </Link>

                  <Link href="https://twitter.com/" {...LinkProps}>
                    <img src={Twitter} width="25" />
                  </Link>

                  <Link href="https://www.youtube.com/" {...LinkProps}>
                    <img src={YouTube} width="30" />
                  </Link>
                </Grid>
              </Grid>{" "}
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                xl={3}
                justifyContent="center"
                container
                style={{ gap: "8px", padding: "24px 0px" }}
              >
                <Typography>Download App</Typography>
                <Grid container direction="column" alignItems="center">
                  <Link
                    href="https://play.google.com/store/games"
                    {...LinkProps}
                  >
                    <Grid
                      item
                      // style={{ marginLeft: "0px" }}
                    >
                      <img src={playStore} />
                    </Grid>
                  </Link>
                  <Link
                    href="https://www.apple.com/in/app-store/"
                    {...LinkProps}
                  >
                    <Grid item>
                      <img src={appleStore} />
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} style={{ margin: "16px 0px" }}>
              <Divider flexItem />
            </Grid> */}
            <Divider />
            {/* <Grid item xs={12}>
              <Typography align="center">
                Copyright &copy; 2022 Pro Restaurant, India. All rights
                reserved.
              </Typography>
            </Grid> */}
            <Typography align="center" className={classes.copyRight}>
              Copyright &copy; 2022 Pro Restaurant, India. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footerStyle: {
    // height: "270px",
    height: "auto",
    // borderTop: "1px solid #bdbdbd",
    backgroundColor: "#F8F8F8",
    // backgroundColor: "khaki",
  },
  footerDivInside: {
    padding: "0px 24px",
    margin: "0px auto",
  },
  nav: {
    textDecoration: "none",
    color: "black",
  },
  copyRight: {
    "@media (max-width : 600px)": {
      textAlign: "start",
    },
  },
}));

export default Footer;
