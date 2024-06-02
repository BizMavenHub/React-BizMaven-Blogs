import React from "react";
import { Link, redirect } from "react-router-dom";

const BlogCard_1 = (props) => {
  return (
    <div
      className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      key={props.index}
    >
      <div>
        <img
          className="rounded-t-lg h-60 w-full object-cover"
          src={props.image}
          alt=""
        />
      </div>
      <div className="p-4">
        <div className="mb-2 min-h-[100px]">
          <div className="mb-1 flex justify-between">
            <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {props.category}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {new Date(props.date).toDateString()}
            </span>
          </div>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h3>
        </div>

        <Link
          to={`/post/${props.slug}`}
          onClick={() => redirect(`/post/${props.slug}`)}
          className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard_1;
