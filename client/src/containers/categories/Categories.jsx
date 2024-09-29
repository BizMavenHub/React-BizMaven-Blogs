import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

// Post Cards Components
import BoxCardPostComponent from "../../components/postCards/BoxCardPostComponent";

const Categories_Container = () => {
  const params = useParams();
  const { category } = params;

  const [allPosts, setAllPosts] = useState([]);

  const [isShowMore, setIsShowMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosts_Url = useMemo(() => {
    if (category === "all") {
      return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post/?limit=10`;
    }

    return `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-post?category=${category}&limit=10`;
  }, []);

  const getMorePosts_URL = useMemo(() => {
    if (category === "all") {
      return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post`;
    }

    return `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-post?category=${category}`;
  }, []);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(getPosts_Url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        setLoading(false);
        return;
      }

      setAllPosts(data.posts);

      if (data.posts.length > 9) {
        setIsShowMore(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = allPosts.length;
    const limit = 10;

    try {
      setLoading(true);
      const response = await fetch(
        getMorePosts_URL + `?startIndex=${startIndex}&limit=${limit}`,
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
        console.log(data.message);
        setLoading(false);
      }

      setAllPosts((prev) => [...prev, ...data.posts]);

      if (data.posts.length <= 0) {
        setIsShowMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <div className="post-container grid xxl:grid-cols-5 p-8 gap-8">
        {allPosts.map((post, index) => (
          <BoxCardPostComponent
            title={post.title}
            image={post.image}
            category={post.category}
            createdDate={post.createdDate}
            slug={post.slug}
            key={index}
          />
        ))}
      </div>
      {isShowMore && (
        <div className="grid place-content-center py-16">
          <button
            type="button"
            onClick={handleShowMore}
            className="btn bg-blue-500 px-4 py-2 font-semibold text-white rounded-lg text-center"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Categories_Container;
