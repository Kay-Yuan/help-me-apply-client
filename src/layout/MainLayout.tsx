import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { NavItem as Link } from "@components";
import { Box, InputBase, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
// import {
//   SaveIcon,
//   FileCopyIcon,
//   ShareIcon,
//   PrintIcon,
//   EditIcon,
// } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";

const topNavHeight = "85px";
const rightMargin = "20px";
const sideBarWidth = "260px";

const TopNav = styled.div`
  height: 85px;
  background-color: orange;

  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 100;
`;

const SideNav = styled.div`
  height: calc(100vh - ${topNavHeight});
  width: ${sideBarWidth}; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: ${topNavHeight}; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
`;

const NavItem = styled.div`
  border-bottom: 2px solid #e0e0e0;
`;

const MainArea = styled.div`
  box-sizing: border-box;
  background-color: #e3f2fd;
  min-height: calc(100vh - ${topNavHeight});
  /* position: fixed; */
  /* z-index: 1; */
  margin-top: ${topNavHeight};
  margin-left: ${sideBarWidth};

  width: calc(100% - ${sideBarWidth} - ${rightMargin});
  border-radius: 12px 12px 0px 0px;
`;

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Search = styled.div`
  position: relative;
  border-radius: 2;
  background-color: #e9dfdf;
  margin-left: ${sideBarWidth};
  margin-top: 25px;
  width: 220px;

  &:hover {
    background-color: #f9efef;
    transition: 0.4s;
  }
`;

const SearchIconWrapper = styled.div`
  /* padding: theme.spacing(0, 2); */
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 10px;
`;

const StyledInputBase = styled(InputBase)`
  color: inherit;
  margin-left: 40px;
`;

function AppLayout() {
  return (
    <>
      <TopNav>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
        </Search>
      </TopNav>

      <SideNav>
        <Stack alignItems="center" spacing={3} mt={3}>
          <NavItem>
            <Link to="/">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/company">Company</Link>
          </NavItem>
          <NavItem>
            <Link to="/job">Job</Link>
          </NavItem>
          <NavItem>
            <Link to="/application">Application</Link>
          </NavItem>
        </Stack>
      </SideNav>

      <MainArea>
        <Outlet />
      </MainArea>

      <Box
        sx={{
          height: "100%",
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}

export default AppLayout;
