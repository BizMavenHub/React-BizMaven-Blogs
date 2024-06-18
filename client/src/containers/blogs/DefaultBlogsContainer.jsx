import React, { Fragment } from "react";
import { BlogCard, BlogCard_1 } from "../../components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?limit=9`
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
      console.log(error);
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
        }`
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
    <div className="blogs-container my-12">
      <h1 className="mb-16 text-8xl text-center font-semibold leading-none tracking-tight text-indigo-600 md:text-5xl lg:text-6xl">
        Our Blogs For You
      </h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recommend Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-3 gap-6">
          {allPosts.map((post, index) => (
            <BlogCard_1
              key={index}
              id={post._id}
              title={post.title}
              image={post.image}
              slug={post.slug}
              category={post.category}
              date={post.createdAt}
            />
          ))}
        </div>
        <div>
          {showMore && (
            <div className="flex justify-center">
              <button
                onClick={GetMorePosts}
                className="btn btn-primary btn-sm mt-4 bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg"
              >
                {" "}
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      <hr className="mb-8" />

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Latest Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-2 gap-6 my-6">
          {lastMonthPosts.map((post, index) => {
            return (
              <div key={index}>
                {index < 12 && (
                  <BlogCard
                    key={index}
                    id={post._id}
                    title={post.title}
                    image={post.image}
                    category={post.category}
                    slug={post.slug}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DefaultBlogsContainer;
