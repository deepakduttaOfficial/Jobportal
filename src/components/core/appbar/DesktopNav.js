import { MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { CostonButton } from "../../../style/style";

const DesktopNav = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="a"
        href=""
        sx={{
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Job finder
      </Typography>

      <Stack
        direction={"row"}
        justifyContent="center"
        alignItems={"center"}
        sx={{ flexGrow: 1 }}
      >
        <MenuItem>
          <CostonButton
            variant="text"
            component={NavLink}
            to={`/`}
            style={({ isActive }) => ({
              borderBottom: isActive ? "#15b0ab solid 3px" : "",
              opacity: isActive ? 1 : "",
              textTransform: "none",
            })}
          >
            Browse Project
          </CostonButton>
        </MenuItem>

        <MenuItem>
          <CostonButton
            variant="text"
            component={NavLink}
            to={`/project/create`}
            style={({ isActive }) => ({
              borderBottom: isActive ? "#15b0ab solid 3px" : "",
              opacity: isActive ? 1 : "",
              textTransform: "none",
            })}
          >
            Create Project
          </CostonButton>
        </MenuItem>

        <MenuItem>
          <CostonButton
            variant="text"
            component={NavLink}
            to={`/profile`}
            style={({ isActive }) => ({
              borderBottom: isActive ? "#15b0ab solid 3px" : "",
              opacity: isActive ? 1 : "",
              textTransform: "none",
            })}
          >
            Profile
          </CostonButton>
        </MenuItem>
      </Stack>
    </>
  );
};

export default DesktopNav;

// rgb(10 25 41 / 70%)
// rgb(0 30 60)
