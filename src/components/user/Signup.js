import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Navbar from "../core/appbar/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomInput } from "../../style/style";
// Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// React router dom
import { Navigate, NavLink } from "react-router-dom";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { isAuthenticate, signup } from "./helper/auth";
import { isAuthenticate, signup } from "../auth/helper/auth";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
});

const Signup = () => {
  const [icon, setIcon] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const { name, email, password, loading, success, error } = values;

  const isSubmit = () => {
    setValues({ ...values, success: false, error: false, loading: true });
    signup({ name, email, password }).then((response) => {
      if (response.error) {
        setValues({ ...values, success: false, error: true, loading: false });
        toast.error(`${response.error}`, { theme: "dark", autoClose: 1000 });
      } else {
        setValues({
          name: "",
          email: "",
          password: "",
          error: false,
          success: response.message,
          loading: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      success: false,
      error: false,
      loading: false,
    });
  };

  return (
    <>
      {isAuthenticate() && <Navigate to="/" />}
      <ThemeProvider theme={theme}>
        {/*  */}
        <ToastContainer />
        {/*  */}
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
          {success && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <strong> {success}</strong>
            </Alert>
          )}

          <CssBaseline />

          <Container component="main" maxWidth="xs">
            <Stack justifyContent={"center"} alignItems={"center"} mt={"1rem"}>
              <Typography variant="h4" component={"h1"}>
                Sign up{" "}
              </Typography>
            </Stack>
            <Box
              mt={"1rem"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CustomInput
                autoFocus
                margin="normal"
                variant="outlined"
                label="Name"
                fullWidth={true}
                required
                value={name}
                onChange={handleChange("name")}
                error={error}
              />
              <CustomInput
                margin="normal"
                variant="outlined"
                label="Email"
                fullWidth={true}
                required
                value={email}
                onChange={handleChange("email")}
                error={error}
              />
              <CustomInput
                margin="normal"
                variant="outlined"
                label="Password"
                type={icon ? "text" : "password"}
                required
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setIcon(!icon);
                        }}
                      >
                        {icon ? (
                          <VisibilityIcon sx={{ color: "neutral.main" }} />
                        ) : (
                          <VisibilityOffIcon sx={{ color: "neutral.main" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={password}
                onChange={handleChange("password")}
                error={error}
              />
              <Button
                size="large"
                fullWidth
                sx={{ marginTop: "7px" }}
                variant="outlined"
                onClick={isSubmit}
              >
                {loading ? (
                  <CircularProgress
                    sx={{ marginLeft: "10px" }}
                    size={"1.8rem"}
                  />
                ) : (
                  "Submit "
                )}
              </Button>
            </Box>

            <Grid container mt={"3rem"}>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  color="inherit"
                  component={NavLink}
                  to="/signin"
                  variant="body2"
                >
                  {"You have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signup;
