import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

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

  const { currentUser } = useSelector((state) => state.user);
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    fetchRecentPosts();
  }, [posts]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?slug=${slug}`,
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
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=4`,
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
      </Helmet>

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

      {/* <div className="p-4 mb-8">
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
        ))}

        <div className="w-[75%] m-auto">
          <h1 className="text-5xl font-bold text-center my-10">Recent Posts</h1>
          <div className="grid grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <Fragment key={post._id}>
                <BlogCard_1
                  title={post.title}
                  image={post.image}
                  category={post.category}
                  slug={post.slug}
                  date={post.createdAt}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PostContainer;
