import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet";

const Feedback_Container = () => {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });

  const desktop = useMediaQuery({
    query: "(min-width: 1280px) and (max-width: 1919px)",
  });

  const largeDesktop = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "" || !message) {
      return alert("Please enter a message");
    } else {
      alert("Thank you for your feedback!");
      setMessage("");
    }
  };

  const MobileView = () => {
    return (
      <div className="feedback-container">
        <div className="px-4 pb-8">
          <h1 className="text-[32pt] text-left mt-6 font-semibold">Feedback</h1>
          <p className="text-[#4B4B4B] tracking-wide font-inter text-left">
            Please let us know what you think. We appreciate your feedback and
            suggestions for improvement.
          </p>
          <form className="mt-4">
            <div className="p-4 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] rounded-xl">
              <div className="mb-6">
                <label
                  for="small-input"
                  className="block text-[11t] font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-[12pt] focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  className="block text-[11pt] font-medium text-gray-800 mb-1"
                >
                  Messages
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="block w-full h-[200px] text-[12pt] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#FF5C00] text-white text-[12pt] font-inter font-bold py-2 px-4 rounded-xl"
                >
                  Send
                </button>
              </div>
              <p className="text-[#4B4B4B] text-[10pt] mt-4">
                Feel free to contact us at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="feedback-container">
        <div className="px-8 pb-[55px] w-[70%] m-auto">
          <h1 className="text-[36pt] text-left mt-6 font-semibold">Feedback</h1>
          <p className="text-[#4B4B4B] text-lg tracking-wide font-inter text-left">
            Please let us know what you think. We appreciate your feedback and
            suggestions for improvement.
          </p>
          <form className="mt-4">
            <div className="p-4 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] rounded-xl">
              <div className="mb-6">
                <label
                  for="small-input"
                  className="block text-[11t] font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-[12pt] focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  className="block text-[11pt] font-medium text-gray-800 mb-1"
                >
                  Messages
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="block w-full h-[200px] text-[12pt] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#FF5C00] text-white text-[12pt] font-inter font-bold py-2 px-4 rounded-xl"
                >
                  Send
                </button>
              </div>
              <p className="text-[#4B4B4B] text-[10pt] mt-4">
                Feel free to contact us at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="feedback-container">
        <div className="px-8 pb-[100px] w-[50%] h-full m-auto">
          <h1 className="text-[34pt] text-left mt-16 font-semibold">
            Feedback
          </h1>
          <p className="text-[#4B4B4B] text-[11pt] mt-1 tracking-wide font-inter text-left">
            Please let us know what you think. We appreciate your feedback and
            suggestions for improvement.
          </p>
          <form className="mt-4">
            <div className="p-4 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] rounded-xl">
              <div className="mb-6">
                <label
                  for="small-input"
                  className="block text-[11t] font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-[12pt] focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  className="block text-[11pt] font-medium text-gray-800 mb-1"
                >
                  Messages
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="block w-full h-[200px] text-[12pt] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#FF5C00] text-white text-[12pt] font-inter font-bold py-2 px-4 rounded-xl"
                >
                  Send
                </button>
              </div>
              <p className="text-[#4B4B4B] text-[10pt] mt-4">
                Feel free to contact us at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="feedback-container">
        <div className="px-8 pb-[100px] w-[35%] h-full m-auto">
          <h1 className="text-[42pt] text-left mt-16 font-bold tracking-wider">
            Feedback
          </h1>
          <p className="text-[#4B4B4B] text-[11pt] mt-1 tracking-wide font-inter text-left">
            Please let us know what you think. We appreciate your feedback and
            suggestions for improvement.
          </p>
          <form className="mt-4">
            <div className="p-4 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] rounded-xl">
              <div className="mb-6">
                <label
                  for="small-input"
                  className="block text-[11t] font-medium text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-[12pt] focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="small-input"
                  className="block text-[11pt] font-medium text-gray-800 mb-1"
                >
                  Messages
                </label>
                <textarea
                  placeholder="Enter your message"
                  className="block w-full h-[200px] text-[12pt] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#FF5C00] text-white text-[12pt] font-inter font-bold py-2 px-4 rounded-xl"
                >
                  Send
                </button>
              </div>
              <p className="text-[#4B4B4B] text-[10pt] mt-4">
                Feel free to contact us at any time.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {mobile && <MobileView />}
      {tablet && <TabletView />}
      {desktop && <DesktopView />}
      {largeDesktop && <LargeDesktopView />}
    </>
  );
};

export default Feedback_Container;
