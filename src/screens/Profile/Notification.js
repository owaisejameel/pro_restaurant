import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

import NoNotification from "../../assets/No-notification.png";

const Notification = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">Notification</Typography>
      <Grid container className={classes.rightDivStyle}>
        <Grid
          container
          direction="column"
          style={{ gap: "16px", padding: "40px 0px" }}
          alignItems="center"
        >
          <Box
            component="img"
            style={{ width: 250, height: 250 }}
            src={NoNotification}
          />
          <Typography variant="h4" color="primary">
            No Notification yet !
          </Typography>
          <Typography>
            Browse for products or check out our latest additions.
          </Typography>
        </Grid>
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
}));

export default Notification;
