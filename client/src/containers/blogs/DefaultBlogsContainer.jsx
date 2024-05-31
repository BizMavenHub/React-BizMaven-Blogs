import React from "react";
import { BlogCard, BlogCard_1 } from "../../components";
import { useState, useEffect } from "react";

const DefaultBlogsContainer = () => {
  const [posts, setPosts] = useState({
    lastMonthPosts: [],
    posts: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPosts();
  }, []);

  const GetPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post`
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
      } else {
        setPosts(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { lastMonthPosts, posts: allPosts } = posts;

  return (
    <div className="blogs-container my-12">
      <h1 className="mb-12 text-6xl text-center  leading-none tracking-tight text-indigo-600 md:text-5xl lg:text-6xl">
        Our Blogs For You
      </h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recommend Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-3 gap-6">
          {lastMonthPosts.map((post) => (
            <BlogCard_1
              key={post._id}
              title={post.title}
              desc={post.desc}
              img={post.image}
              index={post.index}
              slug={post.slug}
            />
          ))}
        </div>
      </section>

      <hr className="mb-8" />

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Latest Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-2 gap-6 my-6"></div>
      </section>
    </div>
  );
};

export default DefaultBlogsContainer;
