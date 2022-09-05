import React, { useState } from "react";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import { isAuthenticate } from "../../auth/helper/auth";
import { acceptbid } from "../helper/bid";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AcceptBid = ({ bidId }) => {
  const { user, token } = isAuthenticate();
  const { jobId } = useParams();

  const isAccept = () => {
    acceptbid(user.Profile, jobId, bidId, token).then((data) => {
      if (data.error) {
        toast.error(`${data.error}`, { theme: "dark", autoClose: 1000 });
      } else {
        toast.success(`${data.message}`, { theme: "dark", autoClose: 1000 });
      }
    });
  };

  return (
    <>
      <ToastContainer />

      <Stack alignItems={"end"}>
        <Box mr={2}>
          <Tooltip title={"Wait for update.."}>
            <Button variant="contained" color="success" onClick={isAccept}>
              Accept
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </>
  );
};

export default AcceptBid;
