import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  return (
    <div className="card w-full">
      <Link
        to={`/post/${props.slug}`}
        className="flex items-top justify-start bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover rounded-l-lg h-40 w-60 md:h-auto md:w-48 md:rounded-l-lg"
          src={props.image}
          alt=""
        ></img>
        <div className=" p-4 leading-normal w-full flex justify-between">
          <h5 className="mb-2 text-xl  font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
          <div className="mb-3">
            <span className=" py-1 px-4 text-white font-semibold rounded-xl bg-gray-700">
              {props.category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
