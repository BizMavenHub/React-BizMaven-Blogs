import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

const NavbarComponent = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const laptop = useMediaQuery({
    query: "(min-width: 1280px) and (max-width: 1535px)",
  });
  const desktop = useMediaQuery({
    query: "(min-width: 1536px) and (max-width: 5000px)",
  });

  const handleShowNavLinks = () => {
    if (showNavLinks) {
      setShowNavLinks(false);
    } else {
      setShowNavLinks(true);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen flex items-center justify-between mx-auto px-8 py-2">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BizMaven Blog
          </span>
        </Link>

        {/* Navbar links */}
        <div
          className=" items-center justify-end w-full md:flex md:w-auto md:order-1 mr-4"
          id="navbar-cta"
        >
          <ul className="flex font-medium p-2 rounded-lg md:p-0  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-bizmaven-blog"
                className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/bizmaven-blogs"
                className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="block font-normal text-sm py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="block font-normal text-sm py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Started btn */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-[8%]">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
