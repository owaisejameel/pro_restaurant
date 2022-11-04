import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit;

// light shadow by designer
// boxShadow: "0px 4px 18px 12px rgba(149, 157, 165, 0.1)",

// boxShadow: "0px 2px 45px 30px rgba(149, 157, 165, 0.3)",

// boxShadow: "0px 4px 18px 12px rgba(149, 157, 165, 0.1)",
// border: "1px solid #345e7d"

//#345E7D - blue
//#54A4A6 - primary green
//#FFD88A - secondary yellow

// Nunito Sans
// Helvetica

// rgba(84, 164, 166, 1)

// rgba(255, 161, 117, 1)

// rgba(255, 216, 138, 1)

// rgba(195, 227, 187, 1)

// rgba(72, 100, 132, 1)

// rgba(72, 100, 132, 1)

// rgba(52, 94, 125, 1)

// rgba(75, 66, 68, 1)

// rgba(102, 103, 105, 1)

// #9a9a9a

// #7a7a7a

// Heading
// #4B4244

// Body
// #6d6d6d

// Blue Heading
// #406587

// Green Heading
// #54A4A6

export const COLOR_PALETTE = {
  palette: {
    common: {
      black: "#000",
      white: "#fff",
      grey: "#F8F8F8",
    },
    type: "light",
    primary: {
      main: "#54A4A6",
    },
    secondary: {
      main: "#486484",
    },
    error: {
      main: "#FF5C5C",
    },
    warning: {
      main: "#FCC65A",
    },
    info: {
      main: "#486484",
    },
    success: {
      main: "#9BBE6A",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "#4b4244",
      // secondary: '#9a9a9a',
      // secondary: '#8F92A1',
      secondary: "#6d6d6d",
      blue: "#3a3f63",
      blue2: "rgba(72, 100, 132, 1)",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: "#fff",
      default: "#fff",
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
    alert: {
      main: "#E10707",
    },
  },
};
const theme = createTheme({
  ...COLOR_PALETTE,
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    "0 4px 18px 0 rgba(0, 0, 0, 0.09)",
    "0px 2px 45px 30px rgba(149, 157, 165, 0.3)",
  ],
  props: {
    MuiDivider: {
      light: true,
    },
    MuiSelect: {
      IconComponent: ExpandMoreIcon,
    },
    MuiMenu: {
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    },
    // MuiCheckbox: {
    //   checkedIcon: (
    //     <SettingsSvg
    //       style={{
    //         fontSize: '1.5rem',
    //         height: '1em',
    //         width: '1em',
    //         color: "red"
    //       }}
    //     />
    //   )
    // }
  },
  shape: {
    borderRadius: 4,
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1600,
      xl: 1800,
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Nunito Sans",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Nunito Sans",
      fontWeight: "bold",
      fontSize: "1.5rem",
      lineHeight: 1.25,
      letterSpacing: "0.27px",
      "@media (min-width:600px)": {
        fontSize: "1.6rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.8rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: "Nunito Sans",
      fontWeight: "bold",
      fontSize: "1.25rem",
      lineHeight: 1.33,
      letterSpacing: "0.2px",
      "@media (min-width:600px)": {
        fontSize: "1.3158rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.3158rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "1.5038rem",
      },
    },
    h3: {
      fontFamily: "Nunito Sans",
      fontWeight: "bold",
      fontSize: "1.125rem",
      lineHeight: 1.2,
      letterSpacing: "0.2px",
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "1.25rem",
      },
    },
    h4: {
      fontFamily: "Nunito Sans",
      fontWeight: "normal",
      fontSize: "1.0625rem",
      lineHeight: 1.235,
      letterSpacing: "normal",
      "@media (min-width:600px)": {
        fontSize: "1.0121rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.0121rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "1.2146rem",
      },
    },
    h5: {
      fontFamily: "Nunito Sans",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: 1.38,
      letterSpacing: "0.2px",
    },
    h6: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: 1.6,
      "@media (min-width:600px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.25rem",
      },
      "@media (min-width:1600px)": {
        fontSize: "1.25rem",
      },
    },
    subtitle1: {
      fontFamily: "Nunito Sans",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
    },
    subtitle2: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    body1: {
      fontFamily: "Nunito Sans",
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: "Nunito Sans",
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.43,
    },
    button: {
      fontFamily: "Nunito Sans",
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.75,
      textTransform: "uppercase",
    },
    caption: {
      fontFamily: "Nunito Sans",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    overline: {
      fontFamily: "Nunito Sans",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      textTransform: "uppercase",
    },
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        fontFamily: "Nunito Sans",
        fontSize: "10px",
        fontWeight: 500,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        color: "#000000",
      },
    },
    MuiTab: {
      root: {
        fontFamily: "Nunito Sans",
        fontSize: "18px",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.33,
        letterSpacing: "0.2px",
        color: "#183B56",
        textTransform: "capitalize",
      },
    },
    MuiIconButton: {
      root: {
        padding: "8px",
      },
    },
    MuiButton: {
      root: {
        height: "2.8rem",
        borderRadius: "0.8rem",
        padding: "8px 30px",
        fontFamily: "Nunito Sans",
        fontSize: "1rem",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        textAlign: "center",
      },
      containedPrimary: {
        height: "2.8rem",
        borderRadius: "0.8rem",
        padding: "8px 30px",
        fontFamily: "Nunito Sans",
        fontSize: "1rem",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#FFFFFF",
        textTransform: "capitalize",
      },
      containedSecondary: {
        backgroundColor: "#8F92A1",
        height: "2.8rem",
        borderRadius: "0.8rem",
        padding: "8px 30px",
        fontFamily: "Nunito Sans",
        fontSize: "1rem",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#FFFFFF",
        textTransform: "capitalize",
        "&:hover": {
          backgroundColor: "#b0b2bc",
        },
      },
      outlinedPrimary: {
        height: "2.8rem",
        borderRadius: "0.8rem",
        padding: "8px 30px",
        fontFamily: "Nunito Sans",
        fontSize: "1rem",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#54A4A6",
        textTransform: "capitalize",
      },
      textPrimary: {
        height: "2.8rem",
        borderRadius: "0.8rem",
        padding: "8px 30px",
        fontFamily: "Nunito Sans",
        fontSize: "1rem",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.25,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#54A4A6",
        textTransform: "capitalize",
      },
      endIcon: {
        marginLeft: "12px",
      },
    },
    // MuiAutocomplete: {
    //   inputRoot: {
    //     '&&&[class*="MuiOutlinedInput-root"]': {
    //       padding: '5px 2px 5px 0px'
    //     }
    //   }
    // },
    MuiSelect: {
      outlined: {
        borderRadius: "4px",
      },
    },
    MuiOutlinedInput: {
      root: {
        outline: "none",
        border: `2px solid #f4f4f4`,
        borderRadius: "0.75rem",
        backgroundColor: "#f4f4f4",
        // 'label + &': {
        //   marginTop: 30,
        //   marginBottom: 20,
        // },
        "& > fieldset": {
          border: "none",
          "& active": {
            border: "none",
          },
          "& focus": {
            border: "none",
          },
        },
        "&.Mui-focused": {
          border: `2px solid rgba(72, 100, 132, 1)`,
          backgroundColor: "#fff",
        },
        "&.Mui-error": {
          border: `2px solid #FF5C5C`,
          backgroundColor: "#f4f4f4",
          "&.Mui-focused": {
            backgroundColor: "#fff",
          },
        },
        "&.MuiSelect-root": {
          border: "none",
          outline: "none",
        },
      },
      input: {
        borderRadius: "0.75rem",
        position: "relative",
        fontSize: "1rem",
        fontFamily: "Nunito Sans",
        // fontWeight: 600,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.19,
        letterSpacing: "normal",
        padding: "0.75rem 0.75rem",
        border: "none",
        "&:focus": {
          border: "none",
          borderRadius: "0.75rem",
          backgroundColor: "#fff",
          "&::placeholder": {
            color: "rgba(72, 100, 132, 1)",
          },
        },
      },
      multiline: {
        padding: 0,
      },
      inputMultiline: {
        position: "relative",
        // backgroundColor: '#f4f4f4',
        border: "none",
        fontSize: "1rem",
        fontFamily: "Nunito Sans",
        // fontWeight: 600,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.19,
        letterSpacing: "normal",
        padding: "0.75rem 0.75rem",
        "&:focus": {
          border: "none",
          borderRadius: "0.75rem",
          backgroundColor: "#fff",
          "&::placeholder": {
            color: "rgba(72, 100, 132, 1)",
          },
        },
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: "Nunito Sans",
        fontSize: "0.875rem",
        fontWeight: 600,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.14,
        letterSpacing: "normal",
        color: "rgba(72, 100, 132, 1)",
      },
    },
    MuiTabs: {
      root: {
        minHeight: 0,
      },
    },
    MuiTab: {
      root: {
        fontFamily: "Nunito Sans",
        fontWeight: "bold",
        fontSize: "1.1rem",
        textTransform: "capitalize",
        minWidth: 0,
        padding: 0,
        minHeight: 0,
        margin: "0px 10px",
        "&:first-of-type": {
          marginLeft: "0px",
        },
        "&.Mui-selected": {
          fontSize: "1.3158rem",
          color: "rgba(72, 100, 132, 1)",
        },
        "@media (min-width:600px)": {
          minWidth: 0,
        },
      },
      wrapper: {
        alignSelf: "flex-end",
      },
    },
    PrivateTabIndicator: {
      root: {
        height: "2px",
      },
      colorSecondary: {
        backgroundColor: "rgba(72, 100, 132, 1)",
      },
    },
    MuiListItem: {
      root: {
        padding: 0,
      },
      gutters: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    // MuiPaper: {

    // },
    MuiPopover: {
      paper: {
        borderRadius: "1.25rem",
      },
    },
    MuiMenuItem: {
      root: {
        padding: "1rem 0px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        "&:first-of-type": {
          borderTop: "none",
        },
        "&:last-of-type": {
          borderBottom: "none",
        },
      },
      gutters: {
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "0.7rem",
        paddingBottom: "0.7rem",
      },
    },
    MuiCheckbox: {
      root: {
        color: "#929494",
        "&$checked": {
          color: "#929494",
        },
      },
      checked: {
        color: "#929494",
        "&$checked": {
          color: "#929494",
        },
      },
      colorSecondary: {
        color: "#929494",
        "&$checked": {
          color: "#929494",
        },
      },
    },
    MuiMenu: {
      paper: {
        marginTop: "2px",
      },
    },
  },
});

export default responsiveFontSizes(theme);
