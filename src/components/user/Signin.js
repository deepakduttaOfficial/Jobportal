import React, { useState } from "react";
import {
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
import { authenticate, isAuthenticate, signin } from "../auth/helper/auth";
// import { authenticate, isAuthenticate, signin } from "./helper/auth";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
});
const Signin = () => {
  const [icon, setIcon] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const { email, password, loading, success, error } = values;

  const isSubmit = () => {
    setValues({ ...values, success: false, error: false, loading: true });

    signin({ email, password })
      .then((response) => {
        if (response.error) {
          setValues({ ...values, success: false, error: true, loading: false });
          toast.error(`${response.error}`, { theme: "dark", autoClose: 1000 });
        } else {
          authenticate(response, () => {
            toast.success(`Signin Success`, { theme: "dark", autoClose: 1000 });
            setValues({
              name: "",
              email: "",
              password: "",
              error: false,
              success: true,
              loading: false,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      success: false,
      loading: false,
      error: false,
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
          <CssBaseline />
          <Container component="main" maxWidth="xs">
            <Stack justifyContent={"center"} alignItems={"center"} mt={"1rem"}>
              <Typography variant="h4" component={"h1"}>
                Sign in{" "}
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
                margin="normal"
                variant="outlined"
                label="Email"
                fullWidth={true}
                required
                autoFocus
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
              {success && <Navigate to="/" replace={true} />}
            </Box>
            <Grid container mt={"3rem"}>
              <Grid item xs>
                <Link
                  color="inherit"
                  component={NavLink}
                  to="/"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  color="inherit"
                  component={NavLink}
                  to="/signup"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Signin;
