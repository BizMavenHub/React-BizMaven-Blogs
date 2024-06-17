import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CreatePostContainer } from "../../containers";

const CreatePost_page = () => {
  return (
    <div>
      <CreatePostContainer />
    </div>
  );
};

export default CreatePost_page;
