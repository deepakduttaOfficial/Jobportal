import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./components/auth/Private";
// import Home from "./components/user/Home";
import EditProfile from "./components/user/profile/manageprofile/EditProfile";
import ProfileDashboard from "./components/user/profile/manageprofile/ProfileDashboard";
import Profile from "./components/user/profile/viewprofile/Profile";
import CreateProject from "./components/user/project/CreateProject";
import GetProjects from "./components/user/project/GetProjects";
import GetSingleProject from "./components/user/project/singleproject/GetSingleProject";
import GetReviews from "./components/user/reiview/GetReviews";
import PostReviews from "./components/user/reiview/PostReviews";
import SignIn from "./components/user/Signin";
import Signup from "./components/user/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetProjects />} />
        <Route path="/profile" element={<Private Component={Profile} />} />
        <Route
          path="/profile/edit/:profileId"
          element={<Private Component={EditProfile} />}
        />
        <Route
          path="/profile/dashboard/:profileId"
          element={<Private Component={ProfileDashboard} />}
        />
        {/* Review section  */}
        <Route
          path="/profile/reviews/get/:profileId"
          element={<Private Component={GetReviews} />}
        />
        <Route
          path="/profile/reviews/created/:profileId"
          element={<Private Component={PostReviews} />}
        />
        {/* Project section  */}
        <Route
          path="/project/create"
          element={<Private Component={CreateProject} />}
        />
        <Route path="/project/:jobId" element={<GetSingleProject />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
