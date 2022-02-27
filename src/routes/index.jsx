import { useRoutes } from 'react-router-dom';
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routes
// ==============================|| ROUTING RENDER ||============================== //

const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    defaultPath: '/dashboard/default',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12
};

const Test = () =>  <div>
{/* Banner lives here */}
<Box bgcolor="purple" height="10vh">
  Top nav
</Box>
<Box>
  <Grid container spacing={0}>
    <Grid item xs={2} bgcolor="pink" height="90vh">
      <Stack bgcolor="orange" alignItems="center" spacing={3} mt={3}>
        <div>Dashboard</div>
        <div>Company</div>
        <div>Job</div>
        <div>Application</div>
      </Stack>
    </Grid>

    <Grid item xs={10}>
      <Box
        bgcolor="#e3f2fd"
        ml={1}
        mr={4}
        borderRadius="12px 12px 0px 0px"
        padding={1}
        maxHeight="89vh"
        overflow="scroll"
      >
        hello
      </Box>
    </Grid>
  </Grid>
</Box>
</div>

const MainRoutes = {
    path: '/',
    element: <Test />,
    children: [
        {
            path: '/',
            element: <Test />
        },
    ]
};

export default function ThemeRoutes() {
    return useRoutes([MainRoutes], config.basename);
}