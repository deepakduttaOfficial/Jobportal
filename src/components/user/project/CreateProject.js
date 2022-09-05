import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { isAuthenticate } from "../../auth/helper/auth";
import Navbar from "../../core/appbar/Navbar";
import { getcategories } from "../helper/category";
import { toast, ToastContainer } from "react-toastify";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CustomInput, CustomSelect } from "../../../style/style";
import { createproject } from "../helper/project";

const CreateProject = () => {
  const [getCategories, setGetCategories] = useState([]);
  const { token, user } = isAuthenticate();
  const [values, setValues] = useState({
    title: "",
    Description: "",
    budget: "",
    categories: [],
    error: false,
    success: false,
    loading: false,
  });
  const { title, Description, budget, categories, loading } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      success: false,
      loading: false,
      error: false,
    });
  };
  const onSubmit = () => {
    setValues({ ...values, success: false, loading: true, error: false });
    createproject(user.Profile, token, {
      title,
      Description,
      budget,
      categories,
    })
      .then((data) => {
        console.log(data);
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
            title: "",
            Description: "",
            budget: "",
            categories: [],
            error: false,
            success: true,
            loading: false,
          });
          toast.success(`You create a Project successfully`, {
            theme: "dark",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // -------------

  const getAllCategories = () => {
    getcategories().then((data) => {
      setGetCategories(data);
    });
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Stack alignItems={"center"} mt={2}>
        <Typography variant="h4">Create a Project- {user.name}</Typography>
      </Stack>
      <Container
        sx={{
          bgcolor: "rgb(0 30 60)",
          padding: "1rem 0px 2rem",
          marginTop: "2rem",
          borderRadius: "10px",
        }}
        maxWidth={"sm"}
      >
        <IconButton component={NavLink} to={"/"} color="inherit">
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
          <CustomInput
            margin="normal"
            variant="outlined"
            label="title"
            type={"text"}
            fullWidth
            autoFocus
            onChange={handleChange("title")}
            value={title}
          />
          <CustomInput
            margin="normal"
            variant="outlined"
            label="Budget"
            type={"number"}
            fullWidth
            onChange={handleChange("budget")}
            value={budget}
          />

          <FormControl fullWidth>
            <InputLabel sx={{ color: "#fff" }} id="demo-multiple-name-label">
              Select Category
            </InputLabel>
            <CustomSelect
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              sx={{ marginTop: "1rem" }}
              value={categories}
              fullWidth
              onChange={handleChange("categories")}
              multiple
            >
              {getCategories.map((category, index) => {
                return (
                  <MenuItem key={index} value={category._id}>
                    {category.categoryName}
                  </MenuItem>
                );
              })}
            </CustomSelect>
          </FormControl>

          <TextareaAutosize
            variant="outlined"
            aria-label="minimum height"
            minRows={7}
            placeholder="Write some information about this ptoject"
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
            onChange={handleChange("Description")}
            value={Description}
          />
          <Button
            size="large"
            fullWidth
            sx={{ marginTop: "7px" }}
            variant="outlined"
            onClick={onSubmit}
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

export default CreateProject;
