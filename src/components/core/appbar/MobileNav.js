// import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// const MobileNav = () => {
//   return (
//     <div>
//       <IconButton
//         size="large"
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         sx={{ mr: 2 }}
//       >
//         <MenuIcon />
//       </IconButton>
//     </div>
//   );
// };

// export default MobileNav;
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
const style = {
  width: "100%",
  maxWidth: 360,
};

export default function MobileNav() {
  const [state, setState] = React.useState(false);
  const onClick = () => {
    setState(!state);
  };

  return (
    <div>
      <React.Fragment>
        <IconButton
          onClick={() => {
            setState(!state);
          }}
          sx={{ color: "inherit", flexGrow: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state}
          onClose={() => {
            setState(!state);
          }}
          onClick={onClick}
        >
          <Box
            sx={{
              width: "250px",
              height: "100%",
              backgroundColor: "#222e35",
              color: "white",
            }}
          >
            <Stack justifyContent={"center"} p={2} alignItems={"center"}>
              <Typography
                variant="h5"
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
            </Stack>

            <Divider />

            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button divider component={NavLink} to={`/`}>
                <ListItemText primary="Browse Project" />
              </ListItem>
              <ListItem
                button
                divider
                component={NavLink}
                to={`/project/create`}
              >
                <ListItemText primary=" Create Project" />
              </ListItem>
              <ListItem button divider component={NavLink} to={`/profile`}>
                <ListItemText primary="Prrofile" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
