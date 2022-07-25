import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from "@mui/styles";
import gif1 from "../public/1.gif"
import gif2 from "../public/2.gif"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles({
  
  getstarted: {
    "& .MuiMobileStepper-dots": {
      width: "40px",
      justifyContent: "space-between",
    },
    "& .MuiMobileStepper-dot": {
      background: "var(--surface2)"
    },
    "& .MuiMobileStepper-dotActive": {
      background: "#1976d2",
    }
  },
});

const images = [
  {
    label: `Hi Welcome to birthday's app where you can add Birthdays of your dear one's`,
    imgPath:
      gif1,
  },
  {
    label: 'You can view the list of all the birthdays. You can edit, delete and update them if you want',
    imgPath:
      gif2,
  },
  // {
  //   label: 'Bali, Indonesia',
  //   imgPath:
  //     'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  // },
  // {
  //   label: 'Goč, Serbia',
  //   imgPath:
  //     'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  // },
];

const GetStarted = (props) => {
  const classes = useStyles()
  const theme = useTheme();
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
    <div className='GetStarted'>
    <Box sx={{ maxWidth: "100%", flexGrow: 1, height: "100%" }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: "20%",
          pl: 2,
          bgcolor: 'var(--surface2)',
          color: 'var(--text1)'
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper> */}
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
      >
        {images.map((step, index) => (
          <div key={step.label} style={{margin: "auto", width: "fit-content"}}>
            {Math.abs(activeStep - index) <= 2 ? (
              <><div style={{height: "78vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}><Box
                component="img"
                sx={{
                  height: "50vh",
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: "23.2vh",
                  // backgroundImage: gif1,
                }}
                src={step.imgPath}
                alt={step.label}
              />
              </div>
              <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: "10vh",
          p: 2,
          bgcolor: 'var(--surface1)',
          color: 'var(--text1)'
        }}
      >
        <Typography sx={{fontFamily: 'Roboto Mono',
          fontStyle: 'monospace',}}>{images[activeStep].label}</Typography>
      </Paper></>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
      style={{height: "2vh", background: "var(--surface1)", justifyContent: "center"}}
      className={classes.getstarted}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        // nextButton={
        //   <Button
        //     size="small"
        //     onClick={handleNext}
        //     disabled={activeStep === maxSteps - 1}
        //   >
        //     Next
        //     {theme.direction === 'rtl' ? (
        //       <KeyboardArrowLeft />
        //     ) : (
        //       <KeyboardArrowRight />
        //     )}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? (
        //       <KeyboardArrowRight />
        //     ) : (
        //       <KeyboardArrowLeft />
        //     )}
        //     Back
        //   </Button>
        // }
      />
      <div style={{height: "10vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Button variant="contained" onClick={() => props.setNewAvatarEdit(true)}>
        Get Started
      </Button>
      </div>
    </Box>
    </div>
  );
}

export default GetStarted;




// import { Button, Typography } from '@mui/material'
// import React from 'react'
// import Slider from 'react-slick'
// import { Carousel } from "react-responsive-carousel";

// import "../App.css"

// const GetStarted = (props) => {
//   return (
//     <div className='GetStarted'><Carousel showThumbs={false} autoplay axis='x'>
//     <div className='GetStarted' style={{width: "100%", height: "80vh", position: "initial"}}>
//         <img src='../public/logo192.png'></img>
//       {/* <Typography>Hi Welcome to birthday's app where you can add Birthdays of your dear one's</Typography>
//       <Button variant="contained" onClick={() => props.setNewAvatarEdit(true)}>Get Started</Button> */}
//     </div>
//     <div className='GetStarted' style={{width: "100%", height: "80vh", position: "initial"}}>
//       <Typography>You can view the list of all the birthdays. You can edit, delete and update them if you want</Typography>
//     </div>
//   </Carousel></div>
//   )
// }

// export default GetStarted