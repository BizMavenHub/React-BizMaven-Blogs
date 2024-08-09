import React, { Fragment } from "react";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import { CommentComponent } from "../../components";
import { RecentBlogCard } from "../../components";

import { Helmet } from "react-helmet";

import "../../styles/post_content_style.css";

const PostContainer = () => {
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

  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const postUrl = useMemo(() => {
    return `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-post?slug=${slug}`;
  }, [slug]);

  const recentPostsUrl = useMemo(() => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=4`;
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async (url, setter) => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setLoading(false);
        setter(data.posts);
      } catch (error) {
        if (error.name !== "AbortError") {
          setLoading(false);
          setError(error.message);
        }
      }
    };

    fetchData(postUrl, setPosts);
    fetchData(recentPostsUrl, setRecentPosts);

    return () => {
      controller.abort();
    };
  }, [postUrl, recentPostsUrl]);

  const MobileView = () => {
    return (
      <div className="px-4 py-8">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="title-content pb-6">
              <h1 className="text-3xl font-semibold">{post.title}</h1>
            </div>
            <div className="image-container">
              <img src={post.image} alt="image of post" />
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <div>
              <CommentComponent postId={post._id} />
            </div>
          </div>
        ))}
        <div className="recent-posts">
          <h1 className="text-2xl font-bold text-left mb-2 mt-10 tracking-wide">
            Recent Posts
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {recentPosts.map((post) => (
              <Fragment key={post._id}>
                <RecentBlogCard
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  content={post.content}
                  slug={post.slug}
                  date={post.createdAt}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="px-4 py-8 w-[95%] m-auto">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="title-content pb-6">
              <h1 className="text-3xl font-semibold">{post.title}</h1>
            </div>
            <div className="image-container">
              <img src={post.image} alt="image of post" />
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <div>
              <CommentComponent postId={post._id} />
            </div>
          </div>
        ))}
        <div className="recent-posts">
          <h1 className="text-5xl font-bold text-center my-10">Recent Posts</h1>
          <div className="grid grid-cols-2 gap-4">
            {recentPosts.map((post) => (
              <Fragment key={post._id}>
                <RecentBlogCard
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  content={post.content}
                  slug={post.slug}
                  date={post.createdAt}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="px-4 py-8 w-[90%] m-auto">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="title-content mb-16">
              <h1 className="text-[52pt] font-semibold leading-[80px]">
                {post.title}
              </h1>
            </div>
            <div className="image-container">
              <img src={post.image} alt="image of post" />
            </div>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <div>
              <CommentComponent postId={post._id} />
            </div>
          </div>
        ))}
        <div className="recent-posts">
          <h1 className="text-5xl font-bold text-center my-10">Recent Posts</h1>
          <div className="grid grid-cols-4 gap-4">
            {recentPosts.map((post) => (
              <Fragment key={post._id}>
                <RecentBlogCard
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  content={post.content}
                  slug={post.slug}
                  date={post.createdAt}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="p-4 mb-8">
        {posts.map((post) => (
          <>
            {post.slug === slug && (
              <>
                {loading ? (
                  <div className="w-[75%] m-auto">
                    <h1 className="text-5xl font-bold text-center my-10">
                      Loading...
                    </h1>
                  </div>
                ) : (
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
                          className="h-[650px] object-fill"
                          src={post && post.image}
                          alt="image"
                        />
                      </div>
                      <div className="w-[75%] m-auto my-6 flex justify-between">
                        <span className="text-lg font-semibold">
                          {new Date(post.createdAt).toDateString()}
                        </span>
                        <span className="text-lg font-semibold">
                          {post && (post.content.length / 1000).toFixed(0)} mins
                          read
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
            )}
          </>
        ))}

        <div className="w-[75%] m-auto">
          <h1 className="text-5xl font-bold text-center my-10">Recent Posts</h1>
          <div className="grid grid-cols-4 gap-4">
            {recentPosts.map((post) => (
              <Fragment key={post._id}>
                <RecentBlogCard
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  content={post.content}
                  slug={post.slug}
                  date={post.createdAt}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{posts && posts[0] && posts[0].title}</title>
        <meta
          name="keywords"
          content={posts && posts[0] && posts[0].keywords}
        />
        <meta
          name="description"
          content={posts && posts[0] && posts[0].content}
        />
        <meta name="image" content={posts && posts[0] && posts[0].image} />
        <meta
          property="og:image"
          content={posts && posts[0] && posts[0].image}
        />
        <meta
          property="twitter:image"
          content={posts && posts[0] && posts[0].image}
        />
        <meta
          property="og:title"
          content={posts && posts[0] && posts[0].title}
        />
        <meta
          property="twitter:title"
          content={posts && posts[0] && posts[0].title}
        />
        <meta
          property="og:description"
          content={posts && posts[0] && posts[0].content}
        />
        <meta
          property="twitter:description"
          content={posts && posts[0] && posts[0].content}
        />
        <meta property="og:url" content={posts && posts[0] && posts[0].slug} />
        <meta
          property="twitter:url"
          content={posts && posts[0] && posts[0].slug}
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@bizmaven" />
        <meta property="twitter:creator" content="@bizmaven" />
        <meta property="og:site_name" content="BizMaven" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:alt" content="BizMaven" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:secure_url"
          content={posts && posts[0] && posts[0].image}
        />
        <meta property="twitter:image:alt" content="BizMaven" />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />
        <meta property="twitter:image:type" content="image/png" />
        <meta
          property="twitter:image:secure_url"
          content={posts && posts[0] && posts[0].image}
        />
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
            {posts.map((post) => (
              <>
                {post.slug === slug && (
                  <>
                    {mobile && <MobileView />}
                    {tablet && <TabletView />}
                    {desktop && <DesktopView />}
                    {largeDesktop && <LargeDesktopView />}
                  </>
                )}
              </>
            ))}
          </>
        )}
      </>
    </>
  );
};

export default PostContainer;
