import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";

import { Helmet } from "react-helmet";

// Post Components
import MainBoxCardPostComponent from "../../components/postCards/MainBoxCardPostComponent";
import BoxCardPostComponent from "../../components/postCards/BoxCardPostComponent";
import HorizontalCardPostComponent from "../../components/postCards/HorizontalCardPostComponent";

// Utils
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

const categories = [
  "all",
  "programming",
  "web-development",
  "css",
  "html",
  "javascript",
  "react",
  "python",
  "java",
];

const DefaultBlogsContainer = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [allPosts, setAllPosts] = useState([]);
  const [mostViewedPosts, setMostViewedPosts] = useState([]);

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
    GetMostViewedPosts();
  }, []);

  const getPostsUrl = useMemo(() => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post`;
  }, []);

  const GetPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(getPostsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setAllPosts(data.posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetMostViewedPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-most-viewed-posts`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
      }

      setMostViewedPosts(data.posts);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Blogs | Insight Loop</title>
        <link rel="canonical" href="https://insightloop.com/our-blogs/" />

        {/* <!-- % SEO Meta Tags --> */}
        <meta
          name="keywords"
          content="Insight Loop, Insight Loop Blog, blogging, blog templates, blog post, blogger com website, blog site templates, blog, blogs, "
        />
        <meta
          name="description"
          content="Discover premium quality insights, top-notch discussions, and exceptional analysis on a variety of trending topics and essential themes."
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
          <main className="xl:w-[80%] md:w-[90%] md:py-12 mx-auto sm:p-4">
            <div className="section-container">
              {/* Top Posts */}
              <div className="top-post-container-section grid md:gap-x-12 xl:grid-cols-2 md:grid-cols-1 sm:gap-8">
                {allPosts.slice(0, 2).map((post, index) => (
                  <MainBoxCardPostComponent
                    title={post.title}
                    image={post.image}
                    category={post.category}
                    createdDate={post.createdDate}
                    slug={post.slug}
                    key={index}
                  />
                ))}
              </div>

              {/* Recent Posts */}
              <div>
                <h1 className="recent-post-title text-3xl my-12 font-medium">
                  Recent Posts
                </h1>
                <div className="posts-container md:grid xl:grid-cols-4 md:grid-cols-2 sm:grid sm:gap-6 sm:grid-cols-1">
                  {allPosts.slice(0, 8).map((post, index) => (
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
              </div>

              <div className="most-viewed-posts-category-section-container xl:flex">
                {/* Most Viewed Posts */}
                <div className="recent-post-container-section ">
                  <h1 className="recent-post-title text-3xl my-8 font-medium">
                    Most Viewed Posts
                  </h1>
                  <div className="recent-posts-category">
                    <div className="most-viewed-posts-container md:flex md:flex-col md:gap-8 sm:grid sm:grid-cols-1 sm:gap-4 ">
                      {mostViewedPosts.slice(0, 5).map((post, index) => (
                        <HorizontalCardPostComponent
                          title={post.title}
                          image={post.image}
                          category={post.category}
                          createdDate={post.createdDate}
                          content={post.content}
                          slug={post.slug}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="category-container">
                  <h1 className="category-title text-3xl my-8 font-medium">
                    Categories
                  </h1>
                  <div className="categories-container w-[350px] grid grid-cols-1 gap-2 list-none">
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleReloadPage(`/categories/${category}`)
                        }
                        className="p-2 border-b-[1px] hover:scale-105 hover:text-blue-500 transition-all"
                      >
                        <Link className="hover:underline hover:underline-offset-2">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </>
    </>
  );
};

export default DefaultBlogsContainer;
