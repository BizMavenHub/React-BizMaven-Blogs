import React, { Fragment } from "react";
import { BlogCard, BlogCard_1 } from "../../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Helmet } from "react-helmet";

const DefaultBlogsContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [posts, setPosts] = useState({
    lastMonthPosts: [],
    posts: [],
  });

  const [showMore, setShowMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post`,
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
        setError(data.message);
        setLoading(false);
      } else {
        setPosts(data);
        setLoading(false);
        if (data.posts.length < 3) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetMorePosts = async () => {
    const startIndex = posts.posts.length;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=${
          startIndex + 3
        }`,
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
        setError(data.message);
      } else {
        setPosts({ lastMonthPosts: posts.lastMonthPosts, posts: data.posts });
        if (data.posts.length > 3) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { lastMonthPosts, posts: allPosts } = posts;

  return (
    <>
      <Helmet>
        <title>Our Blogs | Insight Loop</title>
      </Helmet>
      <div className="blogs-container my-12">
        <div className="card-container w-[600px] m-auto grid">
          {allPosts.map((post, index) => (
            <BlogCard_1
              key={index}
              id={post._id}
              writerId={post.userId}
              title={post.title}
              image={post.image}
              slug={post.slug}
              category={post.category}
              keywords={post.keywords}
              content={post.content}
              date={post.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DefaultBlogsContainer;
