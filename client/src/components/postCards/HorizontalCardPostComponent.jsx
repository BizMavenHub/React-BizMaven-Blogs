import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// Utils
import { handleReloadPage } from "../../utilities/js/handleReloadPage";

const HorizontalCardPostComponent = ({
  title,
  image,
  category,
  slug,
  createdDate,
  content,
}) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 780px)",
  });

  return (
    <Link
      to={`/post/${slug}`}
      className="horizontal-card flex hover:scale-105 transition-all"
    >
      <div className="image-container">
        <img
          src={image}
          alt="image's post"
          className="sm:w-[50vw] md:w-[60vw] lg:w-[20vw] xl:w-[13vw] object-center"
        />
      </div>
      <div className="ml-6 xl:w-[40vw] sm:w-[90%] md:pr-6 ">
        <div className="category-createdDate-container flex gap-3">
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
            className="text-gray-700 font-medium md:text-xl sm:text-[12pt] hover:underline hover:underline-offset-2"
          >
            {title}
          </Link>
        </div>
        {!isMobile ? (
          <div
            className="content-container mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        ) : null}
      </div>
    </Link>
  );
};

export default HorizontalCardPostComponent;
