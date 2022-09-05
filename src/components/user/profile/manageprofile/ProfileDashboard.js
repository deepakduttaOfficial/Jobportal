import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Navbar from "../../../core/appbar/Navbar";
import CompletedProject from "./CompletedProject";

const ProfileDashboard = () => {
  const [Tvalue, setTValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setTValue(newValue);
  };
  return (
    <>
      <Navbar />
      <Box sx={{ typography: "body1" }}>
        <TabContext value={Tvalue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                sx={{ color: "#fff", textTransform: "none" }}
                label="Completed Project"
                value="1"
              />
              <Tab
                sx={{ color: "#fff", textTransform: "none" }}
                label="Current Project"
                value="2"
              />
              <Tab
                sx={{ color: "#fff", textTransform: "none" }}
                label="Total post Project"
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CompletedProject />
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ProfileDashboard;
