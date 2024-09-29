import React from "react";
import { Link } from "react-router-dom";

// Utils
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

const CategoryCard = ({ category }) => {
  const handleCategoryCardColor = () => {
    switch (category) {
      case "programming":
        return "green";

      case "web-development":
        return "gray";

      case "css":
        return "blue";

      case "html":
        return "red";

      case "javascript":
        return "#FABC3F";

      case "react":
        return "purple";

      case "python":
        return "pink";

      case "java":
        return "orange";

      default:
        return "green";
    }
  };

  return (
    <Link
      onClick={() => handleReloadPage(`/categories/${category}`)}
      className="link-btn "
    >
      <p
        className="text-white font-medium text-[10pt] p-2 rounded hover:underline hover:underline-offset-2 hover:scale-105 transition-all"
        style={{ backgroundColor: `${handleCategoryCardColor()}` }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </p>
    </Link>
  );
};

export default CategoryCard;
