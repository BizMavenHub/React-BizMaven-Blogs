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

  return (
    <Link to={`/post/${props.slug}`} className="hover:bg-gray-200 rounded-2xl">
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
              <h2 className="text-[20pt]  font-inter font-bold">
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
                className="mr-4 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Read More
              </Link>
            </div>
            <div className="like-share-container flex">
              <div>
                <button className=" bg-blue-500 px-4 py-2 text-white">
                  Like
                </button>
                <button className="mr-4 bg-blue-500 px-4 py-2 text-white">
                  Dislike
                </button>
              </div>
              <div>
                <button className="bg-blue-500 px-4 py-2 text-white">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
