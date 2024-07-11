import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CreatePostContainer } from "../../containers";
import { Helmet } from "react-helmet";

const CreatePost_page = () => {
  return (
    <div>
      <Helmet>
        <title>Create Post</title>
        <link rel="canonical" href="https://insightloop.com/create-post" />
      </Helmet>
      <CreatePostContainer />
    </div>
  );
};

export default CreatePost_page;
