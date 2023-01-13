import { createTheme } from "@mui/material/styles";
// import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFAA33",
    },
    divider: "#E7EBF0",
    common: {
      black: "#000",
      white: "#fff",
    },
    text: {
      primary: "#1A2027",
      secondary: "#3E5060",
      // heading: "#66B2FF",
      // subHeading: "green",
      errorText: "#66B2FF",
      succesText: "",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    error: {
      main: "#EB0014",
    },
    success: {
      main: "#1AA251",
    },
    warning: {
      main: "#DEA500",
    },
    secondary: {
      main: "#9c27b0",
    },
    info: {
      main: "#0288d1",
    },
    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
  // typography: {
  //   fontFamily: "Open Sans",
  //   fontSize: 16,
  // },
  typography: {
    fontFamily: '"Open Sans"',
    fontFamily: '"Nunito"',
    fontFamilyCode: "Consolas,Menlo,Monaco,Andale Mono,Ubuntu Mono,monospace",
    fontFamilyTagline:
      '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    fontFamilySystem:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    h1: {
      fontFamily:
        '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)",
      fontWeight: 800,
      lineHeight: 1.1142857142857143,
      color: "#0A1929",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h2: {
      fontFamily:
        '"PlusJakartaSans-ExtraBold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)",
      fontWeight: 800,
      lineHeight: 1.2222222222222223,
      color: "#132F4C",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h3: {
      fontFamily:
        '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "2.25rem",
      lineHeight: 1.2222222222222223,
      letterSpacing: 0.2,
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h4: {
      fontFamily: '"Open Sans"',
      fontFamily: '"Nunito"',
      // fontFamily:
      //   '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      // fontSize: "1.75rem",
      fontSize: "30px",
      lineHeight: 1.5,
      letterSpacing: 0.2,
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h5: {
      fontFamily:
        '"PlusJakartaSans-Bold",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "1.5rem",
      lineHeight: 1.5,
      letterSpacing: 0.1,
      color: "#007FFF",
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    h6: {
      fontSize: "1.25rem",
      lineHeight: 1.5,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    button: {
      textTransform: "initial",
      fontWeight: 700,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: "0.875rem",
      lineHeight: 1.75,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: 1.3333333333333333,
      letterSpacing: 0,
      fontWeight: 500,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    caption: {
      display: "inline-block",
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: 0,
      fontWeight: 700,
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    allVariants: {
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    htmlFontSize: 16,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
    subtitle2: {
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
    overline: {
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      textTransform: "uppercase",
      scrollMarginTop: "calc(var(--MuiDocs-header-height) + 32px)",
    },
  },
  // styleOverrides: {
  //   MuiButton: {
  //     containedPrimary: {
  //       fontSize: "16px",
  //       color: "#fff",
  //       background: "#66B2FF",
  //       borderRadius: "25px",
  //       boxShadow: "none",
  //       letterSpacing: "1px",
  //       "&:hover": {
  //         boxShadow: "none",
  //         background: "#66B2FF",
  //       },
  //     },
  //   },
  // },
  components: {
    // MuiSnackbar: {
    //   styleOverrides: {
    //     // Name of the slot
    //     root: {
    //       "& .MuiPaper-root": {
    //         backgroundColor: "#ef5350",
    //       },
    //     },
    //   },
    // },
    MuiButton: {
      defaultProps: {
        // The props to change the default for.
        //disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        root: {
          fontSize: "16px",
          borderRadius: "8px",
        },
        containedPrimary: {
          fontSize: "16px",
          color: "#fff",
          background: "#66B2FF",
          borderRadius: "25px",
          boxShadow: "none",
          letterSpacing: "1px",
          "&:hover": {
            boxShadow: "none",
            background: "#66B2FF",
          },
        },
        containedError: {
          fontSize: "16px",
          color: "#fff",
          background: "#EB0014",
          borderRadius: "8px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            background: "#EB0014",
          },
        },
        // outlinedPrimary: {
        //   fontSize: "16px",
        //   color: "#000",
        //   // background: "#fff",
        //   background: "	#f8f8ff",
        //   border: "1px solid #66B2FF ",
        //   borderRadius: "25px",
        //   boxShadow: "none",
        //   letterSpacing: "1px",
        //   "&:hover": {
        //     boxShadow: "none",
        //     background: "#f8f8ff",
        //     border: "1px solid #66B2FF ",
        //   },
        // },
      },
    },
  },
});
