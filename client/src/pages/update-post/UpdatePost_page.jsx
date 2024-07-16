import React from "react";
import { UpdatePostContainer } from "../../containers";
import { Helmet } from "react-helmet";

const UpdatePost_page = () => {
  return (
    <div>
      <Helmet>
        <title>Update Post</title>
        <link rel="canonical" href="https://insightloop.com/update-post" />
      </Helmet>
      <UpdatePostContainer />
    </div>
  );
};

export default UpdatePost_page;
