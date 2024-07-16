import React, { Fragment } from "react";
import { BlogCard, RecentBlogCard } from "../../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet";

const DefaultBlogsContainer = () => {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  const desktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1919px)",
  });

  const largeDesktop = useMediaQuery({
    query: "(min-width: 1920px)",
  });

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

  useEffect(() => {
    GetPostsByLimit();
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

  const GetPostsByLimit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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

  const MobileView = () => {
    return (
      <div className="blogs-container my-4">
        <div className="card-container w-[95%] m-auto ">
          <div className="title my-8">
            <h1 className="text-3xl font-medium">For you</h1>
          </div>
          <div>
            {allPosts.map((post, index) => (
              <BlogCard
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
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="blogs-container">
        <div className="card-container w-[90%] m-auto">
          <div className="title my-8">
            <h1 className="text-3xl font-medium">For you</h1>
          </div>
          <div className="grid">
            {allPosts.map((post, index) => (
              <BlogCard
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
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="blogs-container my-4">
        <div className="card-container w-[600px] m-auto grid">
          <div className="title my-8">
            <h1 className="text-3xl font-medium">For you</h1>
          </div>
          {allPosts.map((post, index) => (
            <BlogCard
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
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="blogs-container my-4">
        <div className="card-container w-[600px] m-auto grid">
          <div className="title my-8">
            <h1 className="text-3xl font-medium">For you</h1>
          </div>
          {allPosts.map((post, index) => (
            <BlogCard
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
    );
  };

  return (
    <>
      <Helmet>
        <title>Our Blogs | Insight Loop</title>
      </Helmet>
      <>
        {loading ? (
          <div className="loading-container h-min-screen h-full flex justify-center items-center">
            <div className="loading">
              <h3 className="text-3xl font-bold text-center">Loading...</h3>
            </div>
          </div>
        ) : (
          <>
            {mobile && <MobileView />}
            {tablet && <TabletView />}
            {desktop && <DesktopView />}
            {largeDesktop && <LargeDesktopView />}
          </>
        )}
      </>
    </>
  );
};

export default DefaultBlogsContainer;
