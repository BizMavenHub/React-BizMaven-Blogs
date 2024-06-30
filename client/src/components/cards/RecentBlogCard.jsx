import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const RecentBlogCard = (props) => {
  return (
    <Link
      to={`/post/${props.slug}`}
      className="recent-blog-card hover:bg-gray-300 bg-slate-200 rounded-lg p-3"
    >
      <div className="blog-card">
        <div className="image-container">
          <img
            src={props.image}
            alt="image of post"
            className="h-[200px] w-full object-cover"
          />
        </div>

        <div className="contents">
          <div className="title">
            <h1 className="text-xl font-bold my-2">{props.title}</h1>
          </div>
        </div>

        <div className="options py-3">
          <Link
            to={`/post/${props.slug}`}
            className="px-4 py-2 text-[11pt] font-semibold text-white hover:bg-blue-800 bg-blue-500 rounded-lg"
          >
            Read More
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default RecentBlogCard;
