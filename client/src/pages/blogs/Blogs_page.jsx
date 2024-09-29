import React from "react";
import { DefaultBlogsContainer } from "../../containers";

import { Helmet } from "react-helmet";

// Components
import FooterComponent from "../../components/footer/FooterComponent";

const Blogs_page = () => {
  return (
    <div>
      <Helmet>
        <title>Blogs | Insight Loop</title>

        <meta
          property="og:title"
          content="Premium Quality Insights & Top-Notch Discussions | Insight Loop"
        />
        <meta
          property="og:description"
          content="Explore top issues, trending topics, and essential themes with exceptional analysis and high-quality content."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.insightloop.blog" />
        <meta
          property="og:image"
          content="https://www.insightloop.blog/assets/insight_Loop_Logo-only_white-Bg-transparent-C5motTKD.png"
        />
      </Helmet>
      <DefaultBlogsContainer />
      <FooterComponent />
    </div>
  );
};

export default Blogs_page;
