import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { CommentComponent } from "../../components";
import { BlogCard_1 } from "../../components";

const PostContainer = ({ fetchComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchRecentPosts();
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/api/post/get-post?slug=" + slug,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.message);
      }

      if (response.ok) {
        setLoading(false);
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=3`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.message);
      }

      if (response.ok) {
        setLoading(false);
        setRecentPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 mb-8">
      {posts.map((post) => (
        <>
          {post.slug === slug && (
            <>
              <div key={post._id} className="w-[1300px] m-auto">
                <h1 className="text-7xl font-bold text-center my-10">
                  {post && post.title}
                </h1>
                <p className="text-2xl text-center font-medium my-8 underline underline-offset-4 m-auto">
                  {post && post.category}
                </p>
                <div className="image-container flex justify-center items-center mb-4">
                  <img
                    className="h-[580px]"
                    src={post && post.image}
                    alt="image"
                  />
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
              <div>
                <CommentComponent postId={post._id} />
              </div>
            </>
          )}
        </>
      ))}

      <div className="w-[75%] m-auto">
        <h1 className="text-5xl font-bold text-center my-10">Recent Posts</h1>
        <div className="grid grid-cols-3 gap-4">
          {recentPosts.map(
            (post) => (
              console.log(post),
              (
                <Fragment key={post._id}>
                  <BlogCard_1
                    title={post.title}
                    image={post.image}
                    category={post.category}
                    slug={post.slug}
                  />
                </Fragment>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
