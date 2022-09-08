import React from "react";
import MyRoutes from "./routes/MyRoutes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <MyRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
