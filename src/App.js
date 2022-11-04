import React, { useState } from "react";
import MyRoutes from "./routes/MyRoutes";
// import { ThemeProvider } from "@mui/material";
// import { ThemeProvider } from "@material-ui/core";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./themes/theme";
// import theme from "./themes/theme2";
import Loader from "../src/components/AppLoader/Loader";
import Toaster from "./components/MessageToaster/Toaster";

import { Provider } from "react-redux";
import store from "./redux/store/store";
import OtpDialogue from "./components/Dialogue/OtpDialogue";
import { StyledEngineProvider } from "@mui/material";

function App() {
  console.log("theme.......", theme);
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* <StylesProvider> */}
          <MyRoutes />
          <Loader />
          <Toaster />
          <OtpDialogue />
          {/* </StylesProvider> */}
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
