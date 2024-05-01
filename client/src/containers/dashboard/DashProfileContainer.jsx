import React from "react";
import { useSelector } from "react-redux";

const DashProfileContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-[60%] m-auto">
      <div className=" mt-14">
        <h1 className="text-center text-4xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Profile
        </h1>
        <div
          className="flex justify-center my-4 cursor-pointer"
          onClick={() => {
            alert("Please update your profile");
          }}
        >
          <img
            src={currentUser.pictureProfile}
            alt=""
            className="rounded-full h-32 w-32 p-1 ring-2 ring-gray-400"
          />
        </div>
        <h1 className="text-center text-3xl mb-2 font-lato">
          {currentUser.username}
        </h1>
        <h2 className="text-center text-lg">{currentUser.email}</h2>
      </div>
      <div className="mt-20">
        <h1 className="text-center text-4xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Update Profile
        </h1>
        <div className="w-[40%] m-auto mt-12">
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              placeholder={currentUser.username}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              placeholder={currentUser.email}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              id="default-input"
              class="bg-indigo-500 border
              border-gray-300 text-white text-[11pt] rounded-lg font-semibold
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 
              "
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashProfileContainer;
