import React, { Fragment } from "react";
import { BlogCard, RecentBlogCard } from "../../components";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet";

const DefaultBlogsContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

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

  const [posts, setPosts] = useState({
    lastMonthPosts: [],
    posts: [],
  });

  const [showMore, setShowMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCookie("access_token", cookies.access_token, {
      path: "/",
      secure: true,
      sameSite: "none",
      domain: ".insightloop.blog",
      expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
    });
    GetPosts();
  }, []);

  const getPostsUrl = useMemo(() => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post`;
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(getPostsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
      } else {
        setPosts(data);
        setLoading(false);
        if (data.posts.length < 12) {
          setShowMore(false);
        } else {
          setShowMore(true);
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

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=${
          startIndex + 4
        }`,
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
      } else {
        setPosts({ lastMonthPosts: posts.lastMonthPosts, posts: data.posts });
        console.log("data: ", data.posts.length);
        console.log("post: ", posts.posts.length);
        if (data.posts.length > 0) {
          setShowMore(true);
        }
        if (data.posts.length == posts.posts.length + 2) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          <div className="my-8 flex justify-center">
            {showMore && (
              <button
                className="btn text-center font-montserrat font-semibold bg-blue-500 text-white p-3 rounded-lg"
                onClick={GetMorePosts}
              >
                Show More
              </button>
            )}
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
          <div className="my-8 flex justify-center">
            {showMore && (
              <button
                className="btn text-center font-montserrat font-semibold bg-blue-500 text-white p-3 rounded-lg"
                onClick={GetMorePosts}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="blogs-container my-4 m-auto w-[1200px]">
        <div className="title my-8">
          <h1 className="text-3xl font-medium">For you</h1>
        </div>
        <div className="card-container grid grid-cols-3 gap-8">
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
        <div className="my-8 flex justify-center">
          {showMore && (
            <button
              className="btn text-center font-montserrat font-semibold bg-blue-500 text-white p-3 rounded-lg"
              onClick={GetMorePosts}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="blogs-container my-4 w-[80%]  m-auto">
        <div className="title my-8">
          <h1 className="text-3xl font-medium">For you</h1>
        </div>
        <div className="card-container grid grid-cols-4 gap-8">
          {allPosts.map((post, index) => (
            <RecentBlogCard
              title={post.title}
              image={post.image}
              category={post.category}
              content={post.content}
              slug={post.slug}
              date={post.createdAt}
            />
          ))}
        </div>
        <div className="my-8 flex justify-center">
          {showMore && (
            <button
              className="btn text-center font-montserrat font-semibold bg-blue-500 text-white p-3 rounded-lg"
              onClick={GetMorePosts}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Our Blogs | Insight Loop</title>
        <link rel="canonical" href="https://insightloop.com/our-blogs/" />
      </Helmet>
      <>
        {loading ? (
          <div className="loader-container h-screen flex justify-center items-center">
            <div class="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
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
