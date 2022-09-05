import React, { useEffect, useState } from "react";
import { Container, Grid, Stack } from "@mui/material";
import Navbar from "../../../core/appbar/Navbar";
import { ProfileStack } from "../../../../style/style";
import Grid1 from "./Grid1";
import { getprofile } from "../../helper/profile";
import { isAuthenticate } from "../../../auth/helper/auth";
import Grid2 from "./Grid2";

const Profile = () => {
  const { token, user } = isAuthenticate();
  const [data, setData] = useState({
    photo: {
      id: "",
      secure_url: "",
    },
    Auth: {
      name: "",
      email: "",
    },
    country: "",
    currency: "",
    describeUserSelf: "",
    number: "",
    paymentVerify: "",
    createdAt: "",
    getReviews: [],
  });

  const getProfile = () => {
    getprofile(user.Profile, token).then((data) => {
      // console.log(data);
      if (!data.error) {
        const {
          country,
          currency,
          describeUserSelf,
          number,
          paymentVerify,
          createdAt,
          getReviews,
        } = data;
        setData({
          secure_url: data.photo && data.photo.secure_url,
          country,
          currency,
          describeUserSelf,
          number,
          paymentVerify,
          createdAt,
          getReviews,
        });
      }
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Stack alignItems={"center"}>
          <Grid container spacing={4} mt="2rem">
            <Grid item lg={8} md={11} sm={12} xs={12} minWidth={"300px"}>
              <Grid1 data={data} />
            </Grid>

            <Grid item lg={4} md={8} sm={12} xs={12} minWidth={"300px"}>
              <ProfileStack>
                <Grid2 />
              </ProfileStack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default Profile;

// item
