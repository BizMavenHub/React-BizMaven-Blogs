import React from "react";

import { useState, useEffect } from "react";

const SearchContainer = () => {
  const [dataSidebar, setDataSidebar] = useState({
    searchTerm: "",
    category: "uncategorized",
    sort: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);

  console.log(dataSidebar);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
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
  }, [location.search]);

  return (
    <div>
      <form action=""></form>
    </div>
  );
};

export default SearchContainer;
