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
          {post.slug === slug &&
            (console.log(post),
            (
              <div key={post._id} className="w-[1300px] m-auto">
                <h1 className="text-7xl font-bold text-center my-12">
                  {post.title}
                </h1>
                <p className="text-2xl text-center font-medium my-8">
                  {post.category}
                </p>
                <div className="image-container flex justify-center items-center mb-4">
                  <img className="h-[580px]" src={post.image} alt="image" />
                </div>
                <div className="w-[75%] m-auto my-6 flex justify-between">
                  <span className="text-lg font-semibold">
                    {new Date(post.createdAt).toDateString()}
                  </span>
                  <span className="text-lg font-semibold">
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                  </span>
                </div>
                <hr className="my-6 border-b-1 border-gray-400 w-[75%] m-auto" />
                <div
                  className="w-[75%] m-auto post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </div>
            ))}
        </>
      ))}
    </div>
  );
};

export default PostContainer;
