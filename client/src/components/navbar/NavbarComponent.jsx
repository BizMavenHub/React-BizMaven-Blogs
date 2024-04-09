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
    <>
      {mobile && (
        <>
          <header className="navbar-container p-2 px-4 flex justify-between items-center w-full ">
            <Link
              to="/"
              className="desktop:text-3xl mobile:text-2xl font-semibold text-[#FBDF07]"
            >
              BizMaven Blogs
            </Link>
            <nav className="flex float-right">
              <div>
                {!showNavLinks ? (
                  <button onClick={handleShowNavLinks}>
                    <i className="bi bi-list text-2xl text-navbar-text"></i>
                  </button>
                ) : (
                  <button onClick={handleShowNavLinks}>
                    <i className="bi bi-x-lg text-2xl text-navbar-text"></i>
                  </button>
                )}
              </div>
            </nav>
          </header>
          {showNavLinks && (
            <>
              <ul className="gap-y-2 mt-4">
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/about-us"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    About
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/contact"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Contact
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/blogs"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/feedback"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-4 py-2 rounded-lg"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
              <div>
                <ul className="flex mt-4 justify-center">
                  <li className="text-lg ">
                    <Link
                      to="/sign-up"
                      onClick={handleShowNavLinks}
                      className="text-navbar-bg font-medium px-4 py-2 rounded-lg bg-navbar-text"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
      {tablet && (
        <>
          <header className="navbar-container p-2 px-4 flex justify-between items-center w-full ">
            <Link
              to="/"
              className="desktop:text-3xl tablet:text-2xl mobile:text-2xl font-semibold text-[#FBDF07]"
            >
              BizMaven Blogs
            </Link>
            <nav className="flex float-right">
              <div>
                {!showNavLinks ? (
                  <button onClick={handleShowNavLinks}>
                    <i className="bi bi-list text-3xl text-navbar-text"></i>
                  </button>
                ) : (
                  <button onClick={handleShowNavLinks}>
                    <i className="bi bi-x-lg text-2xl text-navbar-text"></i>
                  </button>
                )}
              </div>
            </nav>
          </header>
          {showNavLinks && (
            <>
              <ul className="gap-y-2 mt-4">
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/about-us"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    About
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/contact"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Contact
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/blogs"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="text-lg hover:underline w-full text-center py-2 ">
                  <Link
                    to="/feedback"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-4 py-2 rounded-lg"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
              <div>
                <ul className="flex mt-4 justify-center">
                  <li className="text-lg ">
                    <Link
                      to="/sign-up"
                      onClick={handleShowNavLinks}
                      className="text-navbar-bg font-medium px-4 py-2 rounded-lg bg-navbar-text"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
      {laptop && (
        <header className="navbar-container p-2 flex justify-around items-center w-full ">
          <Link
            to="/"
            className="desktop:text-3xl mobile:text-2xl font-semibold text-[#FBDF07]"
          >
            BizMaven Blogs
          </Link>
          <nav className="flex float-right">
            <div>
              <ul className="flex gap-x-2">
                <li className="text-lg hover:underline ">
                  <Link
                    to="/"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/about-us"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    About
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/contact"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Contact
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/blogs"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/feedback"
                    onClick={handleShowNavLinks}
                    className="text-[#FBDF07] font-medium px-4 py-2 rounded-lg"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex ml-16">
                <li className="text-lg ">
                  <Link
                    to="/sign-up"
                    onClick={handleShowNavLinks}
                    className="text-navbar-bg font-medium px-4 py-2 rounded-lg bg-navbar-text"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}
      {desktop && (
        <header className="navbar-container p-2 flex justify-around items-center w-full ">
          <Link
            to="/"
            className="desktop:text-3xl mobile:text-2xl font-semibold text-[#FBDF07]"
          >
            BizMaven Blogs
          </Link>
          <nav className="flex float-right">
            <div>
              <ul className="flex gap-x-2">
                <li className="text-lg hover:underline ">
                  <Link
                    to="/"
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/about-us"
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    About
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/contact"
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Contact
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/blogs"
                    className="text-[#FBDF07] font-medium px-6 py-2 rounded-lg"
                  >
                    Blogs
                  </Link>
                </li>
                <li className="text-lg hover:underline ">
                  <Link
                    to="/feedback"
                    className="text-[#FBDF07] font-medium px-4 py-2 rounded-lg"
                  >
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex ml-16">
                <li className="text-lg ">
                  <Link
                    to="/sign-up"
                    className="text-navbar-bg font-medium px-4 py-2 rounded-lg bg-navbar-text"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default NavbarComponent;
