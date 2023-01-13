import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Button';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import loginBackground from "../assets/loginBackground.jpg";
import food1 from "../assets/food1.png";
import food2 from "../assets/food2.png";
import food3 from "../assets/food3.png";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import zIndex from '@mui/material/styles/zIndex';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath:food1,
  },
  {
    imgPath:food2,
  },
  {
    imgPath:food3,
  },
  {
    imgPath: food1
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box  sx={{ width: "100%", flexGrow: 1, position :"relative" }}
    >
      
    <Button  className={[classes.IconLeft]}  onClick={handleBack} disabled={activeStep === 0} >
      <ArrowBackIosNewIcon  />
      </Button>

  <Button className={classes.IconRight}  onClick={handleNext} disabled={activeStep === maxSteps - 1} >
  <ArrowForwardIosIcon  />
  </Button>
     
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: "auto",
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Grid 
       style={{width:"100%"}}
      >
      {/* <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="large"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        
        backButton={
          <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      /> */}
      </Grid>

    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
    IconRight:{
        color : "white",
        position : "absolute", 
        zIndex : 1, 
        right : 0 ,
        top : "40%",
    },
    IconLeft:{
         color:'white',
         position : "absolute", 
         zIndex : 1,
          left : 0 , 
          top : "40%"
    }
  }));
export default SwipeableTextMobileStepper;
