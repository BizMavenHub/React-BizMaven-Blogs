import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { DashProfileContainer } from "../../containers/index";

import { SideBar } from "../../components";

const Dashboard_page = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        {tab === "profile" && <DashProfileContainer />}
      </div>
    </div>
  );
};

export default Dashboard_page;
