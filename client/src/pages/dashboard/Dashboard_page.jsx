import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  DashProfileContainer,
  DashPostContainer,
  DashCommentContainer,
  DashUsersContainer,
  DashOverviewContainer,
} from "../../containers/index";

import { SideBar } from "../../components";

const Dashboard_page = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-screen">
        {tab === "profile" && <DashProfileContainer />}
        {tab === "post" && <DashPostContainer />}
        {tab === "overview" && <DashOverviewContainer />}
        {tab === "users" && <DashUsersContainer />}
        {tab === "comments" && <DashCommentContainer />}
      </div>
    </div>
  );
};

export default Dashboard_page;
