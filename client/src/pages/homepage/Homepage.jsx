import React from "react";
import { NavbarComponent, FooterComponent } from "../../components/index";
import { HomepageContainer } from "../../containers/index";

const Homepage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#11009E] to-[#6528F7] to-[#CF4DCE]">
        <NavbarComponent />
        <HomepageContainer />
      </div>
      <FooterComponent />
    </div>
  );
};

export default Homepage;
