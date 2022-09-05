import React, { useState } from "react";

import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import { CustomInput } from "../../../style/style";
import { createbid } from "../helper/bid";

import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../auth/helper/auth";

const CreateBid = () => {
  const { jobId } = useParams();
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    bidDescription: "",
    moneyRequest: "",
    error: false,
    success: false,
    loading: false,
  });
  const { bidDescription, moneyRequest, error } = values;
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      loading: false,
    });
  };
  const isClick = () => {
    setValues({ ...values, error: false, success: false, loading: true });
    createbid(user.Profile, jobId, token, {
      bidDescription,
      moneyRequest,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
        toast.error(`${data.error}`, { theme: "dark", autoClose: 1000 });
      } else {
        setValues({
          bidDescription: "",
          moneyRequest: "",
          error: false,
          success: true,
          loading: false,
        });
        toast.success(`You create a bid wait for response`, {
          theme: "dark",
          autoClose: 1000,
        });
      }
    });
  };
  return (
    <>
      <Box mt={4}>
        <ToastContainer />
        <Typography variant="h3">You proposal</Typography>
        <TextareaAutosize
          variant="outlined"
          aria-label="minimum height"
          minRows={7}
          placeholder="Write your prosal.."
          style={{
            maxWidth: "93%",
            minWidth: "93%",
            backgroundColor: "transparent",
            color: "#fff",
            padding: "1rem",
            borderRadius: "7px",
            fontSize: "18px",
            marginTop: "1rem",
          }}
          value={bidDescription}
          onChange={handleChange("bidDescription")}
        />
        <CustomInput
          type={"number"}
          margin="normal"
          placeholder="Request amount"
          value={moneyRequest}
          onChange={handleChange("moneyRequest")}
        />
        <Box mb={5} mt={3}>
          <Button variant="contained" color="success" onClick={isClick}>
            Bid
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateBid;
