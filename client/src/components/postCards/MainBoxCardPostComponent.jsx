import React from "react";
import { Link } from "react-router-dom";

// Utils
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

const MainBoxCardPostComponent = ({
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
      <div className="box-card block">
        <div className="image-container relative">
          <img src={image} alt="post's image" className="" />
          <div className="absolute bottom-0 left-0 md:pr-4">
            <div className="category-createdDate-container flex mx-4 gap-3 ">
              <div className="category-container">
                <Link
                  onClick={() => handleReloadPage(`/categories/${category}`)}
                  className="text-white bg-green-700 p-1 font-medium text-lg"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </div>
              <div className="createdDate-container">
                <p className="text-white p-1 font-medium text-lg">
                  {createdDate}
                </p>
              </div>
            </div>
            <div className="title-container md:m-4 sm:mx-4 sm:mb-3">
              <Link
                onClick={() => handleReloadPage(`/post/${slug}`)}
                className="text-white font-medium md:text-3xl sm:text-xl hover:underline hover:underline-offset-2"
              >
                {title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainBoxCardPostComponent;
