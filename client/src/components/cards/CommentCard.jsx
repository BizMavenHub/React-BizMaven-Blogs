import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentCard = ({ comment, onLike, onDislike }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

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

  const handleEditComment = async () => {
    setIsEditing(!isEditing);
    setEditedComment(comment.content);
  };

  const handleSaveComment = async () => {
    // Send a PUT request to update the comment
  };

  return (
    <>
      <div className=" w-[80%] py-2 rounded-lg " key={comment.postId}>
        <div className="flex">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src={user.pictureProfile}
              alt=""
            />
          </div>
          <div className="">
            <p className="text-sm font-medium text-blue-500">
              @{user.username}
            </p>
            <p className="text-xs text-gray-400">
              {moment(comment.createdAt).fromNow()}
            </p>
            <div>
              {!isEditing ? (
                <p className="mt-3">{comment.content}</p>
              ) : (
                <>
                  <textarea
                    name=""
                    id=""
                    value={editedComment}
                    className=" resize-none h-20 mt-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => setEditedComment(e.target.value)}
                  ></textarea>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={handleSaveComment}
                      className="text-white font-semibold bg-blue-500 rounded-md w-24 h-10 hover:bg-blue-700"
                    >
                      Save
                    </button>

                    <button
                      className="text-red-500 border-2 border-red-500 font-semibold rounded-md w-24 h-10 ml-8 hover:text-red-700 hover:border-red-700"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {!isEditing && (
              <div className="flex items-center mt-4">
                <div className="flex items-center mr-8">
                  <div className="flex items-center mr-6">
                    <button onClick={() => onLike(comment._id)}>
                      <svg
                        className={`w-6 h-6 text-gray-600 hover:text-gray-800 ${
                          currentUser &&
                          comment.likes.includes(currentUser._id) &&
                          "!text-blue-500"
                        }`}
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
                          d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
                        />
                      </svg>
                    </button>
                    <div className="flex justify-center items-center ml-2">
                      <span className=" text-sm">{comment.likes.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center mr-6">
                    <button onClick={() => onDislike(comment._id)}>
                      <svg
                        className={`w-6 h-6 text-gray-600 hover:text-gray-800 ${
                          currentUser &&
                          comment.dislikes.includes(currentUser._id) &&
                          "!text-red-500"
                        }`}
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
                          d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-x-5">
                  {(currentUser && currentUser._id === comment.userId) ||
                  (currentUser && currentUser.isAdmin) ? (
                    <>
                      <button
                        className="text-indigo-500 flex"
                        onClick={handleEditComment}
                      >
                        Edit
                        <svg
                          className="w-6 h-6 text-indigo-500 ml-2"
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
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>
                      <button className="text-red-500 flex">
                        Delete
                        <svg
                          className="w-6 h-6 text-red-500 ml-2"
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
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </>
  );
};

export default CommentCard;
