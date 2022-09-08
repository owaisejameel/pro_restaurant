import { TextField, Button, Typography, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";

import * as STYLE from "../../utils/Constants";

export const ButtonPrimary = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: STYLE.FONT_SIZE_16,
  backgroundColor: theme.palette.error.light,
  borderRadius: "16px",
  height: "48px",
  color: "#fff",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: theme.palette.error.light,
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
}));

export const Field = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "failed",
})(({ theme, forgotError }) => ({
  // "&:MuiTextField-root": {
  //   border: "5px solid green",
  // },
  borderRadius: "16px",
  padding: "5px 0px 5px 10px",
  border: forgotError ? "2px solid red" : "2px solid grey",
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginLeft: "8px",
  fontSize: STYLE.FONT_SIZE_12,
  color: theme.palette.error.light,
}));

export const TypographyText = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_16,
}));

export const TypographyBold = styled(Typography)(({ theme }) => ({
  fontSize: STYLE.FONT_SIZE_16,
  fontWeight: "bold",
}));

export const CheckboxStyled = styled(Checkbox)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.error.light,
  },
  "&.Mui-checked": {
    color: theme.palette.error.light,
  },
}));
