import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Routes from "./routes/index.jsx";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// import NavigationScroll from "@components/NavigationScroll";
import NavigationScroll from "./components/NavigationScroll";

function App() {
  return (
    <>
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
}

export default App;
