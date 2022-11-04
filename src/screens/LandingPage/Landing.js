import React from "react";
import { Grid, Box } from "@mui/material";

import { makeStyles } from "@mui/styles";

const Landing = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="flex-start"
      style={{
        height: "90vh",
        border: 1,
        backgroundColor: "khaki",
        p: 5,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 1,
          borderColor: "red",
          backgroundColor: "green",
        }}
      >
        Landing Page
      </Box>
    </Grid>
  );
};

export default Landing;
