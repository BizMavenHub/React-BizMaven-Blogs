import React from "react";
import { Link } from "react-router-dom";

// Utils
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

const BoxCardPostComponent = ({
  title,
  image,
  category,
  createdDate,
  slug,
}) => {
  return (
    <Link
      onClick={() => handleReloadPage(`/post/${slug}`)}
      className="hover:scale-105 transition-all"
    >
      <div className="box-card w-full block">
        <div className="image-container">
          <img
            src={image}
            alt="post's image"
            className="h-[250px] w-full object-contain"
          />
        </div>
        <div className="pr-4">
          <div className="category-createdDate-container flex mt-4 gap-3">
            <div className="category-container">
              <Link
                onClick={() => handleReloadPage(`/categories/${category}`)}
                className="text-white bg-green-700 p-1 font-medium text-sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </div>
            <div className="createdDate-container">
              <p className="text-gray-500 p-1 font-medium text-sm">
                {createdDate}
              </p>
            </div>
          </div>
          <div className="title-container mt-2">
            <Link
              onClick={() => handleReloadPage(`/post/${slug}`)}
              className="text-gray-700 font-medium text-xl hover:underline hover:underline-offset-2"
            >
              {title}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BoxCardPostComponent;
