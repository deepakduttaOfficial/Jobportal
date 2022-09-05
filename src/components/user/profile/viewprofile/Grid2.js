import React, { useState } from "react";
import {
  Badge,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Box,
  Modal,
  Tooltip,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { isAuthenticate } from "../../../auth/helper/auth";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Grid2 = () => {
  const { user } = isAuthenticate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack direction={"row"}>
        <Container>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={`/profile/edit/${user.Profile}`}
              >
                <ListItemText primary="1. Edit Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={`/profile/reviews/get/${user.Profile}`}
              >
                <ListItemText primary="2. Total Reviews" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={`/profile/reviews/created/${user.Profile}`}
              >
                <ListItemText primary="3. Created reviews" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to={`/profile/dashboard/${user.Profile}`}
              >
                <ListItemText primary="4. DashBoard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to={`/`}>
                <ListItemText primary="5. Total Projects" />
              </ListItemButton>
            </ListItem>
          </List>
        </Container>

        <Box>
          <Badge badgeContent={1} color="secondary">
            <Tooltip title="Notification" placement="top-end" arrow>
              <NotificationsIcon
                onClick={handleOpen}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Badge>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Lorem ipsum, dolor sit amet consectetur adipisicing eli
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Stack>
    </>
  );
};

export default Grid2;
