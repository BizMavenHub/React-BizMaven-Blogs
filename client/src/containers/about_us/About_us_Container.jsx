import React from "react";

import { Helmet } from "react-helmet";

function About_us_Container() {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      {mobile && <MobileView />}

      {tablet && <TabletView />}

      {desktop && <DesktopView />}

      {largeDesktop && <LargeDesktopView />}
    </>
  );
}

export default About_us_Container;
