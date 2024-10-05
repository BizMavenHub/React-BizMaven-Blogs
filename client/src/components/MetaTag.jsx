import React from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({ title, description, image, type, slug, keywords }) => {
  if (!title || !description || !image || !type || !slug) {
    return null; // Don't render anything if we don't have all the required data
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta
        property="og:url"
        content={"https://www.insightloop.blog/post/" + slug}
      />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:type" content={type} />
      <meta
        name="twitter:url"
        content={"https://www.insightloop.blog/post/" + slug}
      />
    </Helmet>
  );
};

export default MetaTag;
