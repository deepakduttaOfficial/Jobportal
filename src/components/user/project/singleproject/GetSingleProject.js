import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../core/appbar/Navbar";
import { getproject } from "../../helper/project";

import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreateBid from "../../bid/CreateBid";
import GetBids from "../../bid/GetBids";
import { isAuthenticate } from "../../../auth/helper/auth";

const GetSingleProject = () => {
  const { jobId } = useParams();
  const [tabValue, setTabValue] = useState("1");
  const [values, setValues] = useState({
    title: "",
    Description: "",
    Profile: {
      country: "",
      currency: "",
    },
    budget: "",
    createdAt: "",
  });
  const tabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const getProject = () => {
    getproject(jobId).then((data) => {
      setValues({
        title: data.title,
        Description: data.Description,
        Profile: {
          country: data.Profile.country,
          currency: data.Profile.currency,
        },
        budget: data.budget,
        createdAt: data.createdAt,
      });
    });
  };
  useEffect(() => {
    getProject();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ typography: "body1" }} ml={1}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={tabChange}
              aria-label="lab API tabs example"
              sx={{ marginLeft: ".5rem" }}
            >
              <Tab sx={{ color: "#fff" }} label="Detailes" value="1" />
              <Tab sx={{ color: "#fff" }} label="Proposal" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <Typography variant="h5" sx={{ color: "blue" }}>
                {values.title}
              </Typography>
              <Typography
                textAlign={"right"}
                variant={"h6"}
                sx={{ color: "blue" }}
              >
                Buget({values.Profile.currency}): {values.budget}
              </Typography>
              <Box width={"900px"}>
                <Typography variant="subtitle1">
                  {values.Description}
                </Typography>
              </Box>
            </Box>
            {isAuthenticate() && <CreateBid />}
          </TabPanel>
          <TabPanel value="2">
            <GetBids />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default GetSingleProject;
