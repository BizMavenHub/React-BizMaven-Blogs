import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { BlogCard, RecentBlogCard } from "../../components";

const SearchContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataSidebar, setDataSidebar] = useState({
    searchTerm: "",
    category: "uncategorized",
    sort: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || categoryFromUrl || sortFromUrl) {
      setDataSidebar({
        ...dataSidebar,
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
        sort: sortFromUrl,
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const response = await fetch(
          import.meta.env.VITE_API_BASE_URL +
            `/api/post/get-post?${searchQuery}&limit=8`
        );

        if (!response.ok) {
          setLoading(false);
          console.log(response);
          setError(response.statusText);

          return;
        }

        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);

          setLoading(false);
          if (data.posts.length > 7) {
            setShowMore(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setDataSidebar({ ...dataSidebar, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setDataSidebar({ ...dataSidebar, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value;
      setDataSidebar({ ...dataSidebar, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(dataSidebar);
    urlParams.set("searchTerm", dataSidebar.searchTerm);
    urlParams.set("sort", dataSidebar.sort);
    urlParams.set("category", dataSidebar.category);

    if (!dataSidebar.searchTerm) {
      urlParams.delete("searchTerm");
    }

    if (!dataSidebar.category) {
      urlParams.delete("category");
    }

    if (!dataSidebar.sort) {
      urlParams.delete("sort");
    }

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;

    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + `/api/post/get-post?${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log(response);
      }

      if (response.ok) {
        const data = await response.json();
        setPosts((prev) => [...prev, ...data.posts]);

        if (data.posts.length >= 0) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="search-container px-12 pb-12 w-[400px] border-r-2 border-gray-500 min-h-screen ">
        <form action="" onSubmit={handleSubmit} className="sticky top-0 pt-12">
          <div className="flex items-center">
            <p className="mr-2">Search Term: </p>
            <input
              placeholder="Search posts"
              type="text"
              className="w-[200px] p-2 border border-gray-300 rounded-lg"
              id="searchTerm"
              value={dataSidebar.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center mt-8">
            <p className="mr-2">Category: </p>
            <select
              id="category"
              className="w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none"
              onChange={handleChange}
              defaultValue={dataSidebar.category || "uncategorized"}
            >
              <option value="">Select a categories</option>
              <option value="art">Art</option>
              <option value="books">Books</option>
              <option value="business">Business</option>
              <option value="code">Code</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food</option>
              <option value="gaming">Gaming</option>
              <option value="health">Health</option>
              <option value="movie">Movie</option>
              <option value="music">Music</option>
              <option value="pets">Pets</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="uncategorized">Uncategorized</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center mt-8">
            <p className="mr-2">Sort: </p>
            <select
              id="sort"
              className="w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none"
              onChange={handleChange}
              defaultValue={dataSidebar.sort || "desc"}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>

          <div className="flex justify-center mt-4  ">
            <button
              className="bg-blue-500 w-[200px] h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
              onClick={handleSubmit}
            >
              Apply Search
            </button>
          </div>
        </form>
      </div>
      <div className="w-full pb-16">
        {loading ? (
          <div className="flex items-center justify-center mt-4">
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="mt-4 px-8">
            <h1 className="text-4xl font-semibold font-poppins my-8">
              Search Results:
            </h1>

            {posts.length === 0 ? (
              <div className="flex justify-center">
                <h1 className="text-4xl font-semibold font-poppins my-8">
                  No posts found
                </h1>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-6">
                  {posts.map((post, index) => (
                    <div key={index}>
                      <BlogCard
                        id={post._id}
                        title={post.title}
                        image={post.image}
                        category={post.category}
                        slug={post.slug}
                        date={post.createdAt}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  {showMore && (
                    <div className="flex justify-center">
                      <button
                        onClick={handleShowMore}
                        className="btn btn-primary btn-sm mt-4 bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg"
                      >
                        {" "}
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
