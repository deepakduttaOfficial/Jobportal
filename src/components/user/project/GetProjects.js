import React, { useEffect, useState } from "react";
import Navbar from "../../core/appbar/Navbar";
import { getprojects } from "../helper/project";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  Chip,
  Container,
  LinearProgress,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { Avatar, CardHeader, Rating, Stack } from "@mui/material";

//Media query

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GetProjects = () => {
  const [loading, setLoading] = useState(true);
  // Media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [values, setValues] = useState([]);

  const getProjects = () => {
    getprojects().then((data) => {
      setLoading(false);
      setValues(data);
    });
  };
  useEffect(() => {
    getProjects();
  }, []);
  console.log(loading);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Container sx={{ marginTop: "2rem" }}>
          {values &&
            values.map((value, index) => {
              return (
                <Card
                  key={index}
                  sx={{
                    marginTop: "1rem",
                    bgcolor: "rgb(0 30 60)",
                    color: "#fff",
                  }}
                >
                  <CardActionArea
                    component={NavLink}
                    to={`/project/${value._id}`}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt="Picture"
                          src={
                            (value.Profile.photo &&
                              value.Profile.photo.secure_url) ||
                            "https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
                          }
                          sx={{ width: 75, height: 75 }}
                        />
                      }
                      title={`${value.Auth.name}`}
                      subheader={
                        <Typography
                          variant="body2"
                          sx={{ color: "rgb(255 255 255 / 70%)" }}
                        >
                          {formatDate(value.createdAt)}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography textAlign={"right"} variant={"h6"}>
                        Budget({value.Profile.currency}): {value.budget}
                        <Typography sx={{ color: "gray" }}>
                          On Bid this project ({value.onProjectTotalBid.length})
                        </Typography>
                      </Typography>
                      <Stack spacing={2}>
                        <Typography gutterBottom variant="h5" component="h1">
                          {value.title}
                        </Typography>
                        <Typography>
                          {value.Description.length > 200
                            ? value.Description.substring(0, 200) + "...More"
                            : value.Description}
                        </Typography>
                      </Stack>
                      <Stack
                        mt={5}
                        mb={3}
                        spacing={2}
                        direction={matches ? "column" : "row"}
                      >
                        <Rating disabled value={Number(2)} size="large" />
                        <Chip
                          label="PaymentVerify *"
                          color={
                            value.Profile.paymentVerify ? "success" : "error"
                          }
                        />
                        <Chip
                          label="DocumentVerify *"
                          color={
                            value.Profile.documentVerify ? "success" : "error"
                          }
                        />
                        <Chip
                          label="NumberVerify *"
                          color={value.Profile.number ? "success" : "error"}
                        />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
        </Container>
      )}
    </>
  );
};

export default GetProjects;
