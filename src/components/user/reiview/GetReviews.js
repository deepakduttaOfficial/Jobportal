import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { isAuthenticate } from "../../auth/helper/auth";
import Navbar from "../../core/appbar/Navbar";
import { getreviews } from "../helper/review";

import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const GetReviews = () => {
  const { profileId } = useParams();
  const { token } = isAuthenticate();
  const [values, setValues] = useState([]);
  const [update, setUpdate] = useState(false);

  const getReviews = () => {
    getreviews(profileId, token).then((data) => {
      setValues(data);
    });
  };
  useEffect(() => {
    getReviews();
  }, [update]);

  return (
    <>
      <Navbar />
      <Container maxWidth={"md"} sx={{ marginTop: "1rem" }}>
        <Box
          mt={"1rem"}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={
              "https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
            }
            sx={{ width: 75, height: 75 }}
          />
        </Box>
        <IconButton component={NavLink} to={"/profile"} color="inherit">
          <ArrowBackIosNewIcon />
        </IconButton>

        {values.map((value, index) => {
          return (
            <Card
              key={index}
              sx={{
                bgcolor: "rgb(0 30 60)",
                color: "inherit",
                marginTop: "1rem",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      value.clientProfile.photo.secure_url ||
                      "https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg"
                    }
                    sx={{ width: 75, height: 75 }}
                  />
                }
                action={
                  <Tooltip title="Client info" placement="top-end" arrow>
                    <IconButton aria-label="settings" color="inherit">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                }
                title={`${value.clientAuth.name}`}
                subheader={
                  <Typography
                    variant="body2"
                    sx={{ color: "rgb(255 255 255 / 70%)" }}
                  >
                    September 14, 2016
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  <Typography gutterBottom variant="h6" component="h1">
                    Review :<Typography>{value.review}</Typography>
                  </Typography>
                  <Rating disabled value={Number(value.rating)} size="large" />
                </Stack>
              </CardContent>
              <Stack alignItems={"end"}>
                <Box p={2}>
                  {value.updateReview ? (
                    <Tooltip title={"Wait for update.."}>
                      <Button
                        sx={{ cursor: "not-allowed" }}
                        variant="contained"
                      >
                        Process..
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        "You can't update review . Just send a request to the client update your profile..."
                      }
                    >
                      <Button
                        onClick={() => {
                          setUpdate(true);
                        }}
                        variant="contained"
                      >
                        Update request
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              </Stack>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default GetReviews;
