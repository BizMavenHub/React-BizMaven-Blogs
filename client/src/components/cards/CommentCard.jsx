import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

const CommentCard = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [comment]);

  const getUser = async () => {
    try {
      const response = await fetch(`/api/comment/get-user/${comment.userId}`);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      }

      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4 bg-gray-200 py-4 px-4 rounded-lg" key={comment.postId}>
      <div className="flex items-top justify-between">
        <div className="flex items-top">
          <div>
            <img
              className="h-10 w-10 mr-2 object-cover rounded-full "
              src={user.pictureProfile}
              alt=""
            />
          </div>
          <p className="text-sm font-medium text-blue-500">@{user.username}</p>
        </div>
        <p className="text-sm text-gray-500">
          {moment(comment.createdAt).fromNow()}
        </p>
      </div>
      <div className="flex mt-4">
        <p className="text-sm text-gray-500">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
