import React from "react";
import { useParams } from "react-router-dom";

const PostContainer = () => {
  const { slug } = useParams();

  return <div>{slug}</div>;
};

export default PostContainer;
