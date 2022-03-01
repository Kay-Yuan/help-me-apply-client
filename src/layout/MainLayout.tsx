import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { NavItem as Link } from "@components";

const topNavHeight = "85px";

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
  width: 260px; /* Set the width of the sidebar */
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
  margin-left: 260px;

  width: calc(100% - 260px - 20px);
  border-radius: 12px 12px 0px 0px;
`;

function AppLayout() {
  return (
    <>
      <TopNav></TopNav>

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
    </>
  );
}

export default AppLayout;
