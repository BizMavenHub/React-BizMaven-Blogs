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
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 mb-8">
      {posts.map((post) => (
        <>
          <h1 className="text-6xl font-bold text-center my-12">{post.title}</h1>
          <div className="image-container flex justify-center items-center mb-4">
            <img className="h-[550px]" src={post.image} alt="image" />
          </div>
          <div
            className="p-4 content w-[1000px] m-auto prose-lg prose-p:m-0 prose-headings:my-2 prose-p:my-1 prose-ol:list-inside prose-ol:list-decimal prose-li:list-inside prose-ul:list-disc prose-li:mb-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </>
      ))}
    </div>
  );
};

export default PostContainer;
