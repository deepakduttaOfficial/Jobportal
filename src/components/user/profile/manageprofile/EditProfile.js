import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomInput } from "../../../../style/style";
import Navbar from "../../../core/appbar/Navbar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { updateprofile } from "../../helper/profile";
import { NavLink, useParams } from "react-router-dom";
import { isAuthenticate } from "../../../auth/helper/auth";
import { toast, ToastContainer } from "react-toastify";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Input = styled("input")({
  display: "none",
});

const EditProfile = () => {
  const { profileId } = useParams();
  const { token } = isAuthenticate();
  const [preview, setPreview] = useState();
  const [values, setValues] = useState({
    photo: "",
    number: "",
    country: "",
    currency: "",
    describeUserSelf: "",
    documentName: "",
    documentNumber: "",
    paymentVerify: "",
    formData: "",
    error: false,
    success: false,
    loading: false,
  });
  const {
    photo,
    number,
    country,
    currency,
    describeUserSelf,
    documentName,
    documentNumber,
    paymentVerify,
    formData,
    loading,
    error,
  } = values;

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    e.target.files && setPreview(URL.createObjectURL(e.target.files[0]));
    const data = new FormData();
    data.set(name, value);

    setValues({
      ...values,
      [name]: e.target.value,
      formData: data,
      success: false,
      loading: false,
      error: false,
    });
  };
  const onUpdate = () => {
    setValues({ ...values, success: false, loading: true, error: false });
    updateprofile(profileId, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
            loading: false,
          });
          toast.error(`${error}`, { theme: "dark" });
        } else {
          setValues({
            photo: "",
            number: "",
            country: "",
            currency: "",
            describeUserSelf: "",
            documentName: "",
            documentNumber: "",
            paymentVerify: "",
            formData: "",
            error: false,
            success: true,
            loading: false,
          });
          toast.success(`Profile update success fully`, {
            theme: "dark",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container
        sx={{
          bgcolor: "rgb(0 30 60)",
          padding: "1rem 0px 2rem",
          marginTop: "2rem",
          borderRadius: "10px",
        }}
        maxWidth={"sm"}
      >
        <IconButton component={NavLink} to={"/profile"} color="inherit">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box
          mt={"1rem"}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label htmlFor="icon-button-file" style={{ cursor: "pointer" }}>
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={handleChange("photo")}
              value={photo}
            />
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              }
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  preview ||
                  "https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
                }
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          </label>
          <CustomInput
            margin="normal"
            variant="outlined"
            label="Number"
            type={"number"}
            fullWidth
            autoFocus
            onChange={handleChange("number")}
            value={number}
          />
          <CustomInput
            margin="normal"
            variant="outlined"
            label="Country"
            fullWidth
            onChange={handleChange("country")}
            value={country}
          />
          <CustomInput
            margin="normal"
            variant="outlined"
            label="currency"
            fullWidth
            onChange={handleChange("currency")}
            value={currency}
          />
          <CustomInput
            margin="normal"
            variant="outlined"
            label="describeUserSelf"
            fullWidth
            onChange={handleChange("describeUserSelf")}
            value={describeUserSelf}
          />

          <CustomInput
            margin="normal"
            variant="outlined"
            label="documentName"
            fullWidth
            onChange={handleChange("documentName")}
            value={documentName}
          />
          <CustomInput
            type={"number"}
            margin="normal"
            variant="outlined"
            label="documentNumber"
            fullWidth
            onChange={handleChange("documentNumber")}
            value={documentNumber}
          />
          <CustomInput
            margin="normal"
            variant="outlined"
            label="paymentVerify"
            fullWidth
            onChange={handleChange("paymentVerify")}
            value={paymentVerify}
          />
          <Button
            size="large"
            fullWidth
            sx={{ marginTop: "7px" }}
            variant="outlined"
            onClick={onUpdate}
          >
            {loading ? (
              <CircularProgress sx={{ marginLeft: "10px" }} size={"1.8rem"} />
            ) : (
              "Update "
            )}
          </Button>
        </Box>
        {/*  */}
      </Container>
    </>
  );
};

export default EditProfile;
