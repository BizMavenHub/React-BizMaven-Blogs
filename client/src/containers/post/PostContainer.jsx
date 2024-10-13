import React from "react";
import { createRoot } from "react-dom/client";
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

// Components
import CategoryCard from "../../components/postCards/CategoryCard";
import BoxCardPostComponent from "../../components/postCards/BoxCardPostComponent";
import { CommentComponent } from "../../components";
import { AdsComponent, AdsComponent_Horizontal } from "../../components";
import MetaTag from "../../components/MetaTag";

// Packages
import moment from "moment";

// Highlight.js
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

// Utils
import {
  headingModules,
  listModules,
  blockQuoteModule,
} from "../../utilities/js/contentHandleModule";
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

// Styles
import "../../styles/previewComponent.css";

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

const PostContainer = () => {
  const { slug } = useParams();

  // ------------- State ------------

  const [currentPost, setCurrentPost] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [mostViewedPost, setMostViewedPost] = useState([]);
  const [relatedPost, setRelatedPost] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ------------- Hooks ------------

  const postUrl = useMemo(() => {
    return `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-post?slug=${slug}`;
  }, [slug]);

  const getMostViewedPost_Url = useMemo(() => {
    return `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-most-viewed-posts`;
  }, []);

  const getRelatedPost_Url = useMemo(() => {
    return `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?category=${
      currentPost[0]?.category
    }`;
  }, [currentPost]);

  // ----------- Fetch Data -----------

  useEffect(() => {
    getCurrentPost();
    getMostViewedPosts();
  }, []);

  useEffect(() => {
    handleHighlight();
    getRelatedPosts();
    getHeading_1();
  }, [currentPost]);

  // ------------- Methods -------------

  const getCurrentPost = async () => {
    try {
      setLoading(true);

      const res = await fetch(postUrl, {
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

      setMetaData(data.posts[0]);
      setCurrentPost(data.posts);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getMostViewedPosts = async () => {
    try {
      const res = await fetch(getMostViewedPost_Url, {
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

      setMostViewedPost(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedPosts = async () => {
    try {
      const res = await fetch(getRelatedPost_Url, {
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

      setRelatedPost(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHighlight = () => {
    const pre = document.querySelectorAll(".post-content .ql-syntax");

    pre.forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  const getHeading_1 = () => {
    const h1 = document.querySelectorAll(".post-content h1");

    // insert element above h1
    h1.forEach((element, index) => {
      const uniqueId = `ads-placeholder-${index}`;

      const AdHTML = `
      <div class="ad-container h-[180px] w-full bg-gray-200" id="${uniqueId}">
      </div>
    `;

      element.insertAdjacentHTML("beforebegin", AdHTML);

      const adPlaceholder = document.querySelector(`#${uniqueId}`);

      if (adPlaceholder) {
        // Render the AdsComponent_Horizontal inside the placeholder using React's createRoot
        const root = createRoot(adPlaceholder);
        root.render(<AdsComponent_Horizontal />);
      }
    });
  };

  window.addEventListener("DOMContentLoaded", getHeading_1);

  return (
    <>
      <MetaTag
        title={metaData.title || "Insight Loop"}
        description={`Exploring: ${
          metaData.title ||
          "Top-Notch Insights & Top-Notch Discussions articles "
        } on Insight Loop`}
        image={
          metaData.image ||
          "https://img.freepik.com/free-vector/blogging-social-media-concept_23-2148642667.jpg?t=st=1721903984~exp=1721907584~hmac=4bb671b29d4949accabfa1f811036fa91e1e75bd479498745fb83f67ae940e4d&w=1380"
        }
        type="article"
        slug={slug}
        keywords={
          metaData.keywords ||
          "insight_loop, insight, loop, blogging, articles, top, notched, discussions, how to, website, blogger, web development, programming, programming language, javascript, react, css, html, java, python"
        }
      />
      {loading && currentPost.length === 0 ? (
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
          <MetaTag
            title={metaData.title}
            description={"Exploring: " + metaData.title + " on Insight Loop"}
            image={metaData.image}
            type={"article"}
            slug={slug}
          />
          <div className="post-container">
            <header>
              {currentPost.map((post) => (
                <div key={post._id} className="image-container relative">
                  <img
                    src={post.image}
                    alt="post's image"
                    className="w-full h-[40vh] object-cover"
                  />
                </div>
              ))}
            </header>
            {currentPost.map((post) => (
              <main
                key={post._id}
                className="xl:w-[80%] md:w-[95%] m-auto p-6 pb-16"
              >
                {/* Title Container */}
                <div className="title-container my-4">
                  <h1 className="xl:text-5xl xl:my-6 font-medium ">
                    {post.title}
                  </h1>
                  <div className="createdDate-category-container xl:flex xl:items-center xl:gap-8">
                    <div>
                      <p className="text-gray-500">
                        {moment(post.createdDate).format("MMM-DD-YYYY")}
                      </p>
                    </div>
                    <div>
                      <CategoryCard category={post.category} />
                    </div>
                    <div className="views-container">
                      <p className="text-gray-500">Views: {post.views}</p>
                    </div>
                  </div>
                </div>

                {/* Context | Related Posts Container | Ad Container | Category Container */}
                <div className="flex xl:flex-row sm:flex-col gap-8">
                  {/* Context Container */}
                  <div className="context-container">
                    <div
                      className={`post-content xxl:w-[85%] xl:w-[90%] pt-6 ${headingModules} ${listModules} ${blockQuoteModule} prose-a:text-blue-500 prose-code:px-1 prose-code:rounded prose-code:bg-gray-200 prose-code:text-black prose-code:text-sm`}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>

                    <hr className="my-12 w-[50%] m-auto " />

                    {/* Related Posts */}
                    <div className="related-posts-container]">
                      <h1 className="text-5xl sm:text-3xl text-gray-700 tracking-wide font-medium my-12">
                        Related Posts
                      </h1>
                      <div className="related-posts-container grid xl:grid-cols-3 md:grid-cols-3 gap-6">
                        {relatedPost
                          .filter((p) => p._id !== post._id)
                          .slice(0, 3)
                          .map((relatedPost) => (
                            <BoxCardPostComponent
                              key={relatedPost._id}
                              title={relatedPost.title}
                              createdDate={relatedPost.createdDate}
                              category={relatedPost.category}
                              image={relatedPost.image}
                              slug={relatedPost.slug}
                            />
                          ))}
                        {relatedPost.filter((p) => p._id !== post._id)
                          .length === 0 && <div>No related posts found</div>}
                      </div>
                    </div>

                    {/* Most Viewed Posts */}
                    <div className="most-viewed-posts">
                      <h1 className="text-5xl sm:text-3xl text-gray-700 tracking-wide font-medium my-12">
                        Most Viewed Posts
                      </h1>
                      <div className="most-viewed-posts-container grid xl:grid-cols-3 md:grid-cols-2 gap-6 ">
                        <>
                          {!mostViewedPost ? (
                            <div>No posts found</div>
                          ) : (
                            <>
                              {mostViewedPost.map((viewedPost) => (
                                <BoxCardPostComponent
                                  key={viewedPost._id}
                                  title={viewedPost.title}
                                  createdDate={viewedPost.createdDate}
                                  category={viewedPost.category}
                                  image={viewedPost.image}
                                  slug={viewedPost.slug}
                                />
                              ))}
                            </>
                          )}
                        </>
                      </div>
                    </div>

                    {/* Comments Container */}
                    <div className="comment-container">
                      <CommentComponent />
                    </div>
                  </div>

                  {/*  Ads Container | Category Container */}
                  <div className="related-most-viewed-posts-container xl:w-[350px] ">
                    {/* Categories */}
                    <div className="category-container xl:w-[350px]">
                      <h1 className="text-3xl tracking-wide font-medium my-6">
                        Categories
                      </h1>
                      <div className="category-lists xl:grid xl:grid-cols-1 xl:gap-2">
                        <ul>
                          {categories.map((category, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleReloadPage(`/categories/${category}`)
                              }
                              className="p-2 border-b-[1px] hover:scale-105 hover:text-blue-500 transition-all"
                            >
                              <Link className="hover:underline hover:underline-offset-2">
                                {category.charAt(0).toUpperCase() +
                                  category.slice(1)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="ads-container sticky top-8">
                      {/* Ad Container */}
                      <div className="ad-container xl:w-[350px] xl:aspect-square my-12 bg-gray-200 flex justify-center items-center">
                        <AdsComponent />
                      </div>

                      {/* Ad Container */}
                      <div className="ad-container xl:w-[350px] xl:aspect-square my-12 bg-gray-200 flex justify-center items-center">
                        <AdsComponent />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default PostContainer;
