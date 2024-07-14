import React from "react";

import moment from "moment";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet";

const DashOverviewContainer = () => {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  const desktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1919px)",
  });

  const largeDesktop = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchComments();
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/get-all-users?userId=${
          currentUser._id
        }&limit=7`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      }

      if (response.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/get-post?userId=${
          currentUser._id
        }&limit=7`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/comment/get-comments?userId=${
          currentUser._id
        }&limit=7`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      }

      if (response.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MobileView = () => {
    return (
      <div className="mx-10">
        {/* Total Block */}
        <div className="total-block-container grid grid-cols-1 gap-y-[2rem] mt-10">
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-2xl font-light  tracking-wider">
                  Total Users
                </h1>
                <div className="p-2 bg-indigo-500 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalUsers}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalUsers - lastMonthUsers}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Posts
                </h1>
                <div className="p-2 bg-blue-700 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalPosts}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalPosts - lastMonthPosts}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Comments
                </h1>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalComments}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalComments - lastMonthComments}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="mx-10">
        {/* Total Block */}
        <div className="total-block-container grid grid-cols-1 gap-y-[2rem] my-10">
          <div className="grid grid-cols-2 gap-4">
            <section>
              <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
                <div className="flex justify-between items-center">
                  <h1 className="text-gray-400 text-2xl font-light  tracking-wider">
                    Total Users
                  </h1>
                  <div className="p-2 bg-indigo-500 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="">
                    <p className="text-white text-4xl font-medium ml-4 mb-8">
                      {totalUsers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3 text-green-500">
                  <div>
                    <svg
                      className="w-6 h-6 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        d="M12 6v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </div>
                  <p className="">
                    {totalUsers - lastMonthUsers}{" "}
                    <span className="text-white ml-4">Last Month</span>
                  </p>
                </div>
              </div>
            </section>
            <section>
              <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
                <div className="flex justify-between items-center">
                  <h1 className="text-gray-400 text-2xl font-light  tracking-wider">
                    Total Posts
                  </h1>
                  <div className="p-2 bg-blue-700 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="">
                    <p className="text-white text-4xl font-medium ml-4 mb-8">
                      {totalPosts}
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-3 text-green-500">
                  <div>
                    <svg
                      className="w-6 h-6 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        d="M12 6v13m0-13 4 4m-4-4-4 4"
                      />
                    </svg>
                  </div>
                  <p className="">
                    {totalPosts - lastMonthPosts}{" "}
                    <span className="text-white ml-4">Last Month</span>
                  </p>
                </div>
              </div>
            </section>
          </div>
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-2xl font-light  tracking-wider">
                  Total Comments
                </h1>
                <div className="p-2 bg-purple-700 rounded-full">
                  <svg
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalComments}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalComments - lastMonthComments}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gray-800 p-6 w-full rounded-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-400 text-2xl font-light">
                  Recent Users
                </h2>
                <div>
                  <button
                    onClick={() =>
                      (window.location.href = "/dashboard?tab=users")
                    }
                    className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="my-4">
                <ul>
                  {users.map(
                    (user, index) => (
                      console.log(user),
                      (
                        <li
                          key={index}
                          className="my-4 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="image-container">
                              <img
                                src={user.pictureProfile}
                                alt=""
                                className="rounded-full h-10 w-10 object-cover"
                              />
                            </div>
                            <p className="text-white font-medium ml-4">
                              {user.username}
                            </p>
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              created at {new Date(user.date).toDateString()}
                            </p>
                          </div>
                        </li>
                      )
                    )
                  )}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gray-800 p-6 w-full rounded-xl mr-16">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-400 text-2xl font-light">
                  Recent Comments
                </h2>
                <div>
                  <button
                    onClick={() =>
                      (window.location.href = "/dashboard?tab=comments")
                    }
                    className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="my-4">
                <table>
                  <thead className="text-white p-4 text-[16pt] font-light font-inter">
                    <tr>
                      <th className="px-6 py-3 text-left">Comment Content</th>
                      <th className="px-6 py-3">Created</th>
                      <th className="px-6 py-3">Likes</th>
                      <th className="px-6 py-3">Dislike</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {comments.map((comment, index) => (
                      <tr key={index} className="p-4 ">
                        <td className="px-6 py-2 w-2/3">{comment.content}</td>
                        <td className="px-6 w-2/3 text-center">
                          {moment(comment.createdAt).fromNow()}
                        </td>
                        <td className="text-center">{comment.numberOfLikes}</td>
                        <td className="text-center">
                          {comment.numberOfDislikes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="mx-10 mb-12">
        {/* Total Block */}
        <div className="total-block-container grid grid-cols-3 gap-x-[5rem] mt-16">
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Users
                </h1>
                <div className="p-2 bg-indigo-500 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalUsers}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalUsers - lastMonthUsers}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Posts
                </h1>
                <div className="p-2 bg-blue-700 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalPosts}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalPosts - lastMonthPosts}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Comments
                </h1>
                <div className="p-2 bg-purple-700 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalComments}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalComments - lastMonthComments}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 - Charts */}
        </div>
        <div className="mt-12 flex justify-between items-start gap-12">
          <div className="bg-gray-800 p-6 w-2/3 rounded-xl ml-16">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-400 text-2xl font-light">
                Recent Users
              </h2>
              <div>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard?tab=users")
                  }
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="my-4">
              <ul>
                {users.map(
                  (user, index) => (
                    console.log(user),
                    (
                      <li
                        key={index}
                        className="my-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="image-container">
                            <img
                              src={user.pictureProfile}
                              alt=""
                              className="rounded-full h-10 w-10 object-cover"
                            />
                          </div>
                          <p className="text-white font-medium ml-4">
                            {user.username}
                          </p>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            created at {new Date(user.date).toDateString()}
                          </p>
                        </div>
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="bg-gray-800 p-6 w-full rounded-xl mr-16">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-400 text-2xl font-light">
                Recent Comments
              </h2>
              <div>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard?tab=comments")
                  }
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="my-4">
              <table>
                <thead className="text-white p-4 text-[16pt] font-light font-inter">
                  <tr>
                    <th className="px-6 py-3 text-left">Comment Content</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3">Likes</th>
                    <th className="px-6 py-3">Dislike</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {comments.map((comment, index) => (
                    <tr key={index} className="p-4 ">
                      <td className="px-6 py-2 w-2/3">{comment.content}</td>
                      <td className="px-6 w-2/3 text-center">
                        {moment(comment.createdAt).fromNow()}
                      </td>
                      <td className="text-center">{comment.numberOfLikes}</td>
                      <td className="text-center">
                        {comment.numberOfDislikes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="mx-10 mb-12">
        {/* Total Block */}
        <div className="total-block-container grid grid-cols-3 gap-x-[5rem] mt-16">
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Users
                </h1>
                <div className="p-2 bg-indigo-500 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalUsers}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalUsers - lastMonthUsers}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Posts
                </h1>
                <div className="p-2 bg-blue-700 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalPosts}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalPosts - lastMonthPosts}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>
          <section>
            <div className="total-user-block bg-gray-800 p-4 h-min-[200px] rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-gray-400 text-3xl font-light  tracking-wider">
                  Total Comments
                </h1>
                <div className="p-2 bg-purple-700 rounded-full">
                  <svg
                    className="w-10 h-10 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div className="">
                  <p className="text-white text-4xl font-medium ml-4 mb-8">
                    {totalComments}
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3 text-green-500">
                <div>
                  <svg
                    className="w-6 h-6 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    />
                  </svg>
                </div>
                <p className="">
                  {totalComments - lastMonthComments}{" "}
                  <span className="text-white ml-4">Last Month</span>
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 - Charts */}
        </div>
        <div className="mt-12 flex justify-between items-start gap-12">
          <div className="bg-gray-800 p-6 w-2/3 rounded-xl ml-16">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-400 text-2xl font-light">
                Recent Users
              </h2>
              <div>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard?tab=users")
                  }
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="my-4">
              <ul>
                {users.map(
                  (user, index) => (
                    console.log(user),
                    (
                      <li
                        key={index}
                        className="my-4 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="image-container">
                            <img
                              src={user.pictureProfile}
                              alt=""
                              className="rounded-full h-10 w-10 object-cover"
                            />
                          </div>
                          <p className="text-white font-medium ml-4">
                            {user.username}
                          </p>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            created at {new Date(user.date).toDateString()}
                          </p>
                        </div>
                      </li>
                    )
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="bg-gray-800 p-6 w-full rounded-xl mr-16">
            <div className="flex justify-between items-center">
              <h2 className="text-gray-400 text-2xl font-light">
                Recent Comments
              </h2>
              <div>
                <button
                  onClick={() =>
                    (window.location.href = "/dashboard?tab=comments")
                  }
                  className="text-white bg-purple-700 px-4 py-2 rounded-lg"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="my-4">
              <table>
                <thead className="text-white p-4 text-[16pt] font-light font-inter">
                  <tr>
                    <th className="px-6 py-3 text-left">Comment Content</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3">Likes</th>
                    <th className="px-6 py-3">Dislike</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {comments.map((comment, index) => (
                    <tr key={index} className="p-4 ">
                      <td className="px-6 py-2 w-2/3">{comment.content}</td>
                      <td className="px-6 w-2/3 text-center">
                        {moment(comment.createdAt).fromNow()}
                      </td>
                      <td className="text-center">{comment.numberOfLikes}</td>
                      <td className="text-center">
                        {comment.numberOfDislikes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link
          rel="canonical"
          href="https://insightloop.com/dashboard?tab=overview"
        />
      </Helmet>

      {mobile && <MobileView />}

      {tablet && <TabletView />}

      {desktop && <DesktopView />}

      {largeDesktop && <LargeDesktopView />}
    </>
  );
};

export default DashOverviewContainer;
