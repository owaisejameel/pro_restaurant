import {
  TextField,
  Button,
  Typography,
  Checkbox,
  Grid,
  Avatar,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import OtpInput from "react-otp-input";
import { NavLink } from "react-router-dom";

import * as STYLE from "../../utils/Constants";

export const ButtonPrimary = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: STYLE.FONT_SIZE_16,
  backgroundColor: theme.palette.error.light,
  borderRadius: "8px",
  height: "48px",
  color: "#fff",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.error.light,
  },
}));

export const ButtonSecondary = styled(ButtonPrimary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  border: `2px solid ${theme.palette.primary.light}`,
  padding: "6px 24px",
  borderRadius: "8px",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const ButtonOutlined = styled(ButtonPrimary)(({ theme }) => ({
  backgroundColor: "#fff",
  border: `2px solid ${theme.palette.primary.light}`,
  padding: "6px 20px",
  borderRadius: "8px",
  color: "#000",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#fff",
  },
}));

export const ButtonOTP = styled(ButtonPrimary)(({ theme }) => ({
  border: "2px solid grey",
  color: "#000",
  backgroundColor: "#fff",
  textTransform: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "#fff",
  },
  // [theme.breakpoints.down(900)]:{
  //   backgroundColor: "green",
  //   fontSize: "10px"
  // }
}));

export const Field = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "failed",
})(({ theme, forgotError }) => ({
  // "&:MuiTextField-root": {
  //   border: "5px solid green",
  // },
  color: "black",
  "& .MuiOutlinedInput-root": {
    // border: `1px solid ${theme.palette.primary.main}`,
    border: `1px solid ${STYLE.primaryColor}`,
    // border: forgotError ? "2px solid red" : "2px solid gray",
    // border: "1px solid 	#e6e6fa",

    borderRadius: "25px",
    paddingRight: "0px",
    // backgroundColor:"#f8f8ff",

    "& fieldset": {
      border: "none",
    },
    "& input": {
      padding: "12px",
      border: "none",
    },
    "&.Mui-focused": {
      // border : "none"
    },
  },
  // padding: "5px 0px 5px 10px",
  // border: forgotError ? "2px solid red" : "2px solid gray",
  "& input": {
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&[type=number]": {
      MozAppearance: "textfield",
    },
  },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginLeft: "8px",
  fontSize: STYLE.FONT_SIZE_12,
  color: theme.palette.error.light,
}));

export const TypographySmall = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_12,
}));

export const TypographySmallBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_12,
  fontWeight: "bold",
}));

export const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_16,
}));

export const TypographyTextBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_16,
  fontWeight: "600",
}));

export const TypographyTextNormal = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_18,
}));

export const TypographyTextNormalBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_18,
  fontWeight: 600,
}));

export const TypographyTextLarge = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_22,
}));

export const TypographyTextLargeBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_22,
  fontWeight: 500,
}));

export const TypographyTextLarger = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_30,
}));

export const TypographyTextLargerBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_30,
  fontWeight: 500,
}));

export const LightText = styled(TypographyTextLargerBold)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_16,
  color: "#8b8f95",
  paddingLeft: "10px",
}));

export const BlueTextLargerBold = styled(TypographyTextLargerBold)(
  ({ theme }) => ({
    color: theme.palette.primary.light,
  })
);

export const CheckboxStyled = styled(Checkbox)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.light,
  },
  "&.Mui-checked": {
    color: theme.palette.primary.light,
  },
}));

export const BottomBar = styled(Grid)(({ theme }) => ({
  backgroundColor: "#d7d9db",
}));

export const StyledNavlink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "#000",
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const StyledGridMiddle = styled(Grid)(({ theme }) => ({
  // minHeight: "100vh",
  minHeight: "calc(100vh - 320px)",
  backgroundColor: "#FCFCFC",
  // padding: 5,
  zIndex: -1,
  marginTop: "4px",
}));

export const StyledGridBox = styled(Grid)(({ theme }) => ({
  marginTop: "20px",
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  backgroundColor: "#fff",
}));

export const StyledGridHelpCenter = styled(Grid)(({ theme }) => ({
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  backgroundColor: "#fff",
  width: "100%",
}));

export const StyledGridShop = styled(Grid)(({ theme }) => ({
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  backgroundColor: "#fff",
}));

export const ItemsBox = styled(Grid)(({ theme }) => ({
  padding: "10px",
  border: "1px solid #e6e6e6",
  borderRadius: "8px",
  backgroundColor: "#fff",
}));

// export const StyledGridBox2 = styled(Grid)(({ theme }) => ({
//   marginTop: "20px",
//   padding : "24px",
//   border :"1px solid #e6e6e6",
//   borderRadius : "16px",
//   backgroundColor :"#fff"
// }));

export const StyledGridProfileBox = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  padding: "30px 0px 20px 0px",
  //  "& .MuiBadge-badge":{
  //   color :"#fff",
  //   backgroundColor : theme.palette.primary.light,
  //   },
  "& p": {
    paddingLeft: "20px",
  },
  "& img": {
    width: "30px",
    height: "30px",
    paddingLeft: "20px",
  },
}));

// export const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: theme.palette.primary.main,
//     color: "#fff",
//   },
// }));

// export const StyledOTPInputs = styled(OtpInput)(({theme}) => ({
//   "& input":{
//     margin: "0px 20px",
//     width: "50px !important",
//     height: "50px",
//     borderRadius: "16px",
//     border: "2px solid #66B2FF",
//     // backgroundColor: "#f8f8ff",
//     fontSize: "16px",
//     "&:focus-visible": {
//       border: "2px solid #66B2FF",
//         // border: `1.5px solid ${theme.palette.text.blue2}`,
//         outline: "none",
//         "&::placeholder": {
//           color: "transparent",
//         },
//     },
//   }
// }));
