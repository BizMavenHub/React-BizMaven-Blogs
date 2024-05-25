import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const DashUsersContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (currentUser.isAdmin) {
      handleGetAllUsers();
    }
  }, [currentUser._id]);

  const handleGetAllUsers = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/user/get-all-users?userId=" +
          currentUser._id +
          "&limit=" +
          10,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsersList(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(usersList);

  const handleShowMore = async () => {
    const startIndex = usersList.length;

    const API_URL =
      import.meta.env.VITE_API_BASE_URL +
      "/api/user/get-all-users?userId=" +
      currentUser._id +
      "&startIndex=" +
      startIndex;
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsersList((prev) => [...prev, ...data.users]);
        if (data.users.length < 10) {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-8 py-4">
      <table className="w-full text-sm text-center ">
        <thead>
          <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <th className="p-4">Created At</th>
            <th>User Image</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <Fragment key={index}>
              <tr className="border  p-2">
                <td className="py-5">
                  {new Date(user.date).toLocaleDateString()}
                </td>
                <td className="">
                  <div className="flex justify-center items-center">
                    <img
                      src={user.pictureProfile}
                      alt="userImage"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "✅" : "❌"}</td>
                <td>
                  <div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashUsersContainer;
