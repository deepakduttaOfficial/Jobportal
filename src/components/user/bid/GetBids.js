import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { onprojecttotalbid } from "../helper/bid";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AcceptBid from "./AcceptBid";
import { isAuthenticate } from "../../auth/helper/auth";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

//Media query

const GetBids = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { jobId } = useParams();
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = () => {
    onprojecttotalbid(jobId).then((data) => {
      setLoading(false);
      setValues(data);
    });
  };
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Container maxWidth={"md"} sx={{ marginTop: "1rem" }}>
          <IconButton component={NavLink} to={"/"} color="inherit">
            <ArrowBackIosNewIcon />
          </IconButton>
          {values &&
            values.map((value, index) => {
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
                          value.Profile.photo.secure_url ||
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
                      Request money({value.Profile.currency}):{" "}
                      {value.moneyRequest}
                    </Typography>
                    <Typography variant="h6">Bid dest :</Typography>
                    <Typography variant="subtitle1">
                      {value.bidDescription.length > 300
                        ? value.bidDescription.substring(0, 200) + "...More"
                        : value.bidDescription}
                    </Typography>

                    <Stack spacing={2} direction={"row"} mt={3}>
                      <Typography gutterBottom variant="h6" component="h1">
                        Review(
                        {value.Profile.getReviews &&
                          value.Profile.getReviews.length}
                        )
                      </Typography>
                      <Rating disabled value={5} size="medium" />
                      {/* "Number(value.rating)" */}
                    </Stack>

                    <Stack
                      mb={3}
                      spacing={2}
                      direction={matches ? "column" : "row"}
                    >
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
                  {isAuthenticate() &&
                    isAuthenticate().user.Profile === value.Job.Profile &&
                    !value.accept && <AcceptBid bidId={value._id} />}
                </Card>
              );
            })}
        </Container>
      )}
    </>
  );
};

export default GetBids;
