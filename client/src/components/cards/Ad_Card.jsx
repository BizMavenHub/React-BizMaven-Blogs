import React from "react";

import { Helmet } from "react-helmet";

const Ad_Card = () => {
  return (
    <>
      <Helmet>
        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
        ></script>
      </Helmet>
      <div className="advertisement-container bg-[#4e4e4e] flex justify-center items-center">
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-1874919607682854"
          data-ad-slot="5848668290"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
      </div>
    </>
  );
};

export default Ad_Card;
