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
    <div className="my-4 w-[80%] py-4 px-4 rounded-lg " key={comment.postId}>
      <div className="flex items-top">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full object-cover mr-4"
            src={user.pictureProfile}
            alt=""
          />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-500">@{user.username}</p>
          <p className="text-xs text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </p>
          <div>
            <p className="mt-3">{comment.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
