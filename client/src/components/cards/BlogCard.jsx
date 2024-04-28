import React from "react";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  return (
    <div className="card w-full">
      <Link
        to="/blog"
        class="flex items-center bg-white border border-gray-200 rounded-l-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover rounded-l-lg h-40 md:h-auto md:w-48 md:rounded-l-lg"
          src={props.img}
          alt=""
        ></img>
        <div class="flex flex-col pl-4 justify-between leading-normal">
          <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
          <p class="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            {props.desc}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
