import React from 'react'
import {Grid,Box} from "@mui/material"

const Landing = () => {
  return (
      <Grid container
      alignItems="flex-start"
      sx={{
        height: "90vh",
        border:1,
        backgroundColor : "khaki",
        p:5,
      }}>

        <Box
        sx={{
            p:4,
            borderRadius: 1,
            borderColor: "red",
            backgroundColor:"green"

        }}>
            hello
            </Box>

      </Grid>
  )
}

export default Landing