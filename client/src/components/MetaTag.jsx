import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = ({ title, description, image, type, slug }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="type" content={type} />
      <meta name="slug" content={slug} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={slug} />
      <meta property="og:type" content={type} />

      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={slug} />
      <meta property="twitter:card" content={type} />
    </Helmet>
  );
};

export default MetaTag;
