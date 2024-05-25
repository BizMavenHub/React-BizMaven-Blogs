import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const PostContainer = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/post/get-post?userId=" +
          currentUser._id
      );

      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold text-center my-6">{posts.title}</h1>
      <div
        className="p-4 content w-[1000px] m-auto prose-lg prose-p:m-0"
        dangerouslySetInnerHTML={{ __html: posts.content }}
      ></div>
    </div>
  );
};

export default PostContainer;
