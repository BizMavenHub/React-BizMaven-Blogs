import React, { Fragment } from "react";
import { Link, redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import moment from "moment";

const BlogCard = (props) => {
  const [writerUser, setWriterUser] = useState([]);

  useEffect(() => {
    GetWriterUserId(props.writerId);
  }, []);

  const GetWriterUserId = async (writerUserId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/get-user/${writerUserId}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      if (response.ok) {
        setWriterUser(data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_APP_BASE_URL}/post/${props.slug}`
    );
    alert("Link Copied");
  };

  return (
    <Link
      to={`/post/${props.slug}`}
      className="hover:bg-gray-200 bg-slate-100 rounded-2xl"
    >
      <div className="border-b pb-12 px-4 pt-4">
        <div className="user-container">
          <div className="flex items-center">
            <div className="image-container">
              <img
                src={writerUser.pictureProfile}
                alt="user image"
                className="h-12 w-12 object-cover rounded-full mr-2"
              />
            </div>
            <div>
              <h2 className="font-inter text-[12pt] font-semibold">
                {writerUser.username}
              </h2>
              <p className="font-inter text-[9pt]">
                {moment(props.date).fromNow()} -{" "}
                {moment(props.date).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="contents">
          <div className="flex justify-between pt-10">
            <div className="w-[50%]">
              <h2 className="text-[18pt]  font-inter font-bold">
                {props.title}
              </h2>
              <div className="tags"></div>
            </div>
            <div className="w-[50%] ">
              <img
                src={props.image}
                alt=""
                className="h-[150px] w-[250px] float-right object-cover"
              />
            </div>
          </div>
        </div>
        <div className="other-links pt-8">
          <div className="flex items-center justify-between">
            <div className="read-more-container">
              <Link
                to={`/post/${props.slug}`}
                className="mr-4 bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 rounded-lg"
              >
                Read More
              </Link>
            </div>
            <div>
              <button
                className="bg-blue-500 p-2 text-white hover:bg-blue-700 rounded-lg"
                onClick={copyLink}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
