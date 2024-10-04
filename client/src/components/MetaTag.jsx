import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({ title, description, image, type, slug }) => {
  return (
    <Helmet>
      <title>{title + " - Insight Loop"}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content="Hello this is testing" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta
        property="og:url"
        content={"https://www.insightloop.blog/" + slug}
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:type" content={type} />
      <meta
        name="twitter:url"
        content={"https://www.insightloop.blog/" + slug}
      />
    </Helmet>
  );
};

export default MetaTag;
