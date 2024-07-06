import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { insight_loop_logo } from "../../assets";

import { logoutSuccess } from "../../redux/user/userSlice";

const NavbarComponent = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavLinks, setShowNavLinks] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleShowNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL + "/api/user/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
        window.location.href = "/login";
      }
    } catch (error) {}
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    urlParams.delete("sort");
    urlParams.delete("category");

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const toggleNavbar = () => {
    setToggleMenu(!toggleMenu);
  };

  const MobileView = () => {
    return (
      <>
        <div className="navbar-container bg-gray-900 flex justify-between px-4 py-3">
          <div className="title-container">
            <h1 className="title text-xl font-bold text-white tracking-wide">
              Insight Loop
            </h1>
          </div>

          {/* toggle navbar */}
          <div className="toggle-navbar-container">
            {toggleMenu ? (
              <div>
                <svg
                  className="w-8 h-8 transition-all ease-in-out duration-300 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={toggleNavbar}
                >
                  <path stroke="currentColor" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
              </div>
            ) : (
              <div>
                <svg
                  className="w-8 h-8 transition-all ease-in-out duration-300 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  onClick={toggleNavbar}
                >
                  <path stroke="currentColor" d="M5 7h14M5 12h14M5 17h14" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* check if user is logged in or not */}
        <div className="bg-gray-900">
          {currentUser ? (
            <>
              {toggleMenu && (
                <div className="px-4 pb-4 absolute rights-0 z-10 w-full bg-gray-900">
                  <div className="" onClick={toggleNavbar}>
                    <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide">
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/blogs"
                        >
                          Blogs
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/about-us"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="contact-us"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="/feedback"
                        >
                          Feedback
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <form
                    onSubmit={handleSearch}
                    className="search-container mt-2"
                  >
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full p-2"
                    />
                  </form>
                  <hr className="mt-6" />
                  <Link
                    to={"/dashboard?tab=profile"}
                    className="flex justify-start items-center py-5"
                    onClick={toggleNavbar}
                  >
                    <div>
                      <img
                        src={
                          currentUser.pictureProfile
                            ? currentUser.pictureProfile
                            : "/src/assets/default_profile_picture.png"
                        }
                        alt="user profile picture"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="text-gray-400 ml-4">
                      <div>
                        <h1 className="font-semibold text-lg">
                          {currentUser.username}
                        </h1>
                      </div>
                      <div>
                        <h1>{currentUser.email}</h1>
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div className="mt-2">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full text-red-500 block px-4 py-2 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {toggleMenu && (
                <div className="px-4 pb-4 absolute rights-0 z-10 w-full bg-gray-900">
                  <div className="" onClick={toggleNavbar}>
                    <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide">
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/"
                          onClick={toggleNavbar}
                        >
                          Home
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/about-us"
                          onClick={toggleNavbar}
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="contact-us"
                          onClick={toggleNavbar}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="/feedback"
                          onClick={toggleNavbar}
                        >
                          Feedback
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="search-container mt-2 justify-center flex">
                    <Link
                      to="/sign-up"
                      onClick={toggleNavbar}
                      className="block text-center font-semibold text-white p-2 bg-blue-500 rounded-xl w-2/4"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  };

  const TabletView = () => {
    return (
      <>
        <div className="navbar-container bg-gray-900 flex justify-between items-center px-4 py-3">
          <div className="title-container">
            <Link to="/" className="flex items-center">
              <img
                src={insight_loop_logo}
                className="h-8"
                alt="Insight Loop Logo"
              />
              <span className=" ml-4 self-center text-2xl font-semibold whitespace-nowrap text-white">
                Insight Loop
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <form onSubmit={handleSearch} className="search-container mr-4">
              <input
                type="text"
                placeholder="Search"
                className="p-2 w-[300px]"
              />
            </form>

            {/* toggle navbar */}
            <div className="toggle-navbar-container">
              {toggleMenu ? (
                <div>
                  <svg
                    className="w-8 h-8 transition-all ease-in-out duration-300 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={toggleNavbar}
                  >
                    <path
                      stroke="currentColor"
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-8 h-8 transition-all ease-in-out duration-300 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={toggleNavbar}
                  >
                    <path stroke="currentColor" d="M5 7h14M5 12h14M5 17h14" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* check if user is logged in or not */}
        <div className="bg-gray-900">
          {currentUser ? (
            <>
              {toggleMenu && (
                <div className="px-4 pb-4 absolute right-0 z-10 w-2/5 bg-gray-900 rounded-bl-xl">
                  <Link
                    to={"/dashboard?tab=profile"}
                    className="flex justify-center items-center mb-4"
                    onClick={toggleNavbar}
                  >
                    <div>
                      <img
                        src={
                          currentUser.pictureProfile
                            ? currentUser.pictureProfile
                            : "/src/assets/default_profile_picture.png"
                        }
                        alt="user profile picture"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="text-gray-400 ml-4">
                      <div>
                        <h1 className="font-semibold">
                          {currentUser.username}
                        </h1>
                      </div>
                      <div>
                        <h1>{currentUser.email}</h1>
                      </div>
                    </div>
                  </Link>
                  <hr />
                  <div className="mt-2" onClick={toggleNavbar}>
                    <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide">
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/blogs"
                        >
                          Blogs
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/about-us"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="contact-us"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="/feedback"
                        >
                          Feedback
                        </Link>
                      </li>
                      <li className="justify-center flex">
                        <Link
                          to="/create-post"
                          onClick={toggleNavbar}
                          className="text-white py-2 w-2/3 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold block rounded-lg text-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Create Post
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <div className="mt-2">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full text-red-500 block px-4 py-2 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {toggleMenu && (
                <div className="px-4 pb-4 absolute right-0 z-10 w-2/5 bg-gray-900 rounded-bl-xl">
                  <div className="" onClick={toggleNavbar}>
                    <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide">
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/"
                          onClick={toggleNavbar}
                        >
                          Home
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-2 px-4 hover:bg-gray-700"
                          to="/about-us"
                          onClick={toggleNavbar}
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="contact-us"
                          onClick={toggleNavbar}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li className="hover:bg-gray-700">
                        <Link
                          className="block py-3 px-4 hover:bg-gray-700 "
                          to="/feedback"
                          onClick={toggleNavbar}
                        >
                          Feedback
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="search-container mt-2 justify-center flex">
                    <Link
                      to="/sign-up"
                      onClick={toggleNavbar}
                      className="block text-center font-semibold text-white p-2 bg-blue-500 rounded-xl w-2/4"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  };

  const DesktopView = () => {
    return (
      <>
        <div className="navbar-container bg-gray-900 flex justify-between items-center px-4 py-4">
          <div className="title-container">
            <Link to="/" className="flex items-center">
              <img
                src={insight_loop_logo}
                className="h-8"
                alt="Insight Loop Logo"
              />
              <span className=" ml-4 self-center text-2xl font-semibold whitespace-nowrap text-white">
                Insight Loop
              </span>
            </Link>
          </div>

          {/* nav links */}
          <div className="" onClick={toggleNavbar}>
            {currentUser ? (
              <div className="flex items-center">
                <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide flex justify-between">
                  <li className="hover:bg-gray-700">
                    <Link className=" py-2 px-4 hover:bg-gray-700" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="hover:bg-gray-700">
                    <Link className=" py-2 px-4 hover:bg-gray-700" to="/blogs">
                      Blogs
                    </Link>
                  </li>
                  <li className="hover:bg-gray-700">
                    <Link
                      className=" py-2 px-4 hover:bg-gray-700"
                      to="/about-us"
                    >
                      About Us
                    </Link>
                  </li>

                  <li className="hover:bg-gray-700">
                    <Link
                      className=" py-3 px-4 hover:bg-gray-700 "
                      to="/feedback"
                    >
                      Feedback
                    </Link>
                  </li>
                </ul>

                <form onSubmit={handleSearch} className="search-container mx-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-[300px]"
                  />
                </form>

                <div className="image-container">
                  <button
                    className="bg-gray-800 rounded-full"
                    id="user-menu-button"
                    onClick={handleShowNavLinks}
                  >
                    <img
                      className="w-[90px] h-12 rounded-full object-cover"
                      src={
                        currentUser.pictureProfile
                          ? currentUser.pictureProfile
                          : "/src/assets/default_profile_picture.png"
                      }
                      alt="user photo"
                    />
                  </button>
                </div>

                {showNavLinks && (
                  <div
                    className="absolute z-10 top-16 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-bl-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {currentUser.username}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {currentUser.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      {currentUser.isAdmin && (
                        <>
                          <li>
                            <Link
                              to={"/dashboard?tab=overview"}
                              onClick={handleShowNavLinks}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/create-post"
                              onClick={handleShowNavLinks}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                            >
                              Create Post
                            </Link>
                          </li>
                        </>
                      )}

                      <li>
                        <Link
                          to="/dashboard?tab=profile"
                          onClick={handleShowNavLinks}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-red-500 hover:text-white"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide flex justify-center">
                <li className="hover:bg-gray-700">
                  <Link className=" py-2 px-4 hover:bg-gray-700" to="/">
                    Home
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link className=" py-2 px-4 hover:bg-gray-700" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link
                    className=" py-3 px-4 hover:bg-gray-700 "
                    to="contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link
                    className=" py-3 px-4 hover:bg-gray-700 "
                    to="/feedback"
                  >
                    Feedback
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to={"/sign-up"}
                    className="py-3 px-4 hover:bg-gray-700 bg-blue-500 rounded-lg"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </>
    );
  };

  const LargeDesktopView = () => {
    return (
      <>
        <div className="navbar-container bg-gray-900 flex justify-between items-center px-4 py-4">
          <div className="title-container">
            <Link to="/" className="flex items-center">
              <img
                src={insight_loop_logo}
                className="h-8"
                alt="Insight Loop Logo"
              />
              <span className=" ml-4 self-center text-2xl font-semibold whitespace-nowrap text-white">
                Insight Loop
              </span>
            </Link>
          </div>

          {/* nav links */}
          <div className="" onClick={toggleNavbar}>
            {currentUser ? (
              <div className="flex items-center">
                <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide flex justify-between">
                  <li className="hover:bg-gray-700">
                    <Link className=" py-2 px-4 hover:bg-gray-700" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="hover:bg-gray-700">
                    <Link className=" py-2 px-4 hover:bg-gray-700" to="/blogs">
                      Blogs
                    </Link>
                  </li>
                  <li className="hover:bg-gray-700">
                    <Link
                      className=" py-2 px-4 hover:bg-gray-700"
                      to="/about-us"
                    >
                      About Us
                    </Link>
                  </li>

                  <li className="hover:bg-gray-700">
                    <Link
                      className=" py-3 px-4 hover:bg-gray-700 "
                      to="/feedback"
                    >
                      Feedback
                    </Link>
                  </li>
                </ul>

                <form onSubmit={handleSearch} className="search-container mx-4">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-[300px]"
                  />
                </form>

                <div className="image-container">
                  <button
                    className="bg-gray-800 rounded-full"
                    id="user-menu-button"
                    onClick={handleShowNavLinks}
                  >
                    <img
                      className="w-[90px] h-12 rounded-full object-cover"
                      src={
                        currentUser.pictureProfile
                          ? currentUser.pictureProfile
                          : "/src/assets/default_profile_picture.png"
                      }
                      alt="user photo"
                    />
                  </button>
                </div>

                {showNavLinks && (
                  <div
                    className="absolute z-10 top-[70px] right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-bl-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {currentUser.username}
                      </span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                        {currentUser.email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      {currentUser.isAdmin && (
                        <>
                          <li>
                            <Link
                              to={"/dashboard?tab=overview"}
                              onClick={handleShowNavLinks}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/create-post"
                              onClick={handleShowNavLinks}
                              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                            >
                              Create Post
                            </Link>
                          </li>
                        </>
                      )}

                      <li>
                        <Link
                          to="/dashboard?tab=profile"
                          onClick={handleShowNavLinks}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm hover:bg-gray-600 text-red-500 hover:text-white"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <ul className="text-white font-roboto font-semibold text-center w-full tracking-wide flex justify-center">
                <li className="hover:bg-gray-700">
                  <Link className=" py-2 px-4 hover:bg-gray-700" to="/">
                    Home
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link className=" py-2 px-4 hover:bg-gray-700" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link
                    className=" py-3 px-4 hover:bg-gray-700 "
                    to="contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="hover:bg-gray-700">
                  <Link
                    className=" py-3 px-4 hover:bg-gray-700 "
                    to="/feedback"
                  >
                    Feedback
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    to={"/sign-up"}
                    className="py-3 px-4 hover:bg-gray-700 bg-blue-500 rounded-lg"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <nav>
      {mobile && <MobileView />}

      {tablet && <TabletView />}

      {desktop && <DesktopView />}

      {largeDesktop && <LargeDesktopView />}
    </nav>
  );
};

export default NavbarComponent;
