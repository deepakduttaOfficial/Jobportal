import React from "react";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNav from "./MobileNav";
import { isAuthenticate, signout } from "../../auth/helper/auth";
// import { isAuthenticate, signout } from "../../user/helper/auth";

const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#222e35" }}>
        <Toolbar>
          {matches ? <MobileNav /> : <DesktopNav />}
          {matches && <Box sx={{ flexGrow: 1 }} />}

          <Stack direction={"row"} spacing={2} mr={4}>
            {!isAuthenticate() ? (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  component={NavLink}
                  to={`/signin`}
                >
                  Signin
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  component={NavLink}
                  to={`/signup`}
                >
                  Signup
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  signout(() => {
                    navigate("/");
                  });
                }}
              >
                Log out
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
