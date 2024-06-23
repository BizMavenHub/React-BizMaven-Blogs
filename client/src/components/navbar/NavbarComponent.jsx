import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { insight_loop_logo } from "../../assets";

import { logoutSuccess } from "../../redux/user/userSlice";

const NavbarComponent = () => {
  const desktop = useMediaQuery({
    query: "(min-width: 1280px)",
  });

  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
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
    if (showNavLinks) {
      setShowNavLinks(false);
    } else {
      setShowNavLinks(true);
    }
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
        navigate("/login");
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

  return (
    <>
      {currentUser ? (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen flex items-center justify-between mx-auto p-2 px-12 mobile:px-3 tablet:px-4">
            <div>
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src={insight_loop_logo}
                  className="h-6"
                  alt="Insight Loop Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white mobile:text-[14pt]">
                  Insight Loop
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div
                className=" items-center justify-end w-full mr-8 mobile:m-0"
                id="navbar-cta"
              >
                {tablet && (
                  <ul className="flex font-medium p-2 rounded-lg rtl:space-x-reverse dark:border-gray-700 mobile:flex-col">
                    <li>
                      <Link
                        to="/blogs"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:border-gray-700"
                        aria-current="page"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="about-us"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="contact-us"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="feedback"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Feedback
                      </Link>
                    </li>
                  </ul>
                )}

                {desktop && (
                  <ul className="flex font-medium p-2 rounded-lg rtl:space-x-reverse dark:border-gray-700 mobile:flex-col">
                    <li>
                      <Link
                        to="/blogs"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:border-gray-700"
                        aria-current="page"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="about-us"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="contact-us"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="feedback"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Feedback
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            <div className="flex items-center">
              {desktop && (
                <div className="flex items-center justify-center mx-4">
                  <form action="" onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="p-2 w-[350px] rounded outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
              )}

              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mx-4"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={handleShowNavLinks}
              >
                <img
                  className="w-10 h-10 rounded-full object-cover "
                  src={
                    currentUser.pictureProfile
                      ? currentUser.pictureProfile
                      : "/src/assets/default_profile_picture.png"
                  }
                  alt="user photo"
                />
              </button>

              {mobile && (
                <div>
                  {toggleMenu ? (
                    <div>
                      <svg
                        className="w-8 h-8 mr-2 transition-all ease-in-out duration-300 text-gray-800 dark:text-white"
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
                        className="w-8 h-8 transition-all ease-in-out duration-300 text-gray-800 dark:text-white mr-2"
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
                          d="M5 7h14M5 12h14M5 17h14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {currentUser.isAdmin && desktop && (
                <button
                  onClick={() => (window.location.href = "/create-post")}
                  className="text-white ml-4   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm h-[40px] w-[120px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Create Post
                </button>
              )}

              {/* <!-- Dropdown menu --> */}
              {showNavLinks && (
                <div
                  className="absolute z-10 top-12 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
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
                      <li>
                        <Link
                          onClick={() => {
                            window.location.href = "/dashboard?tab=overview";
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        onClick={() => {
                          window.location.href = "/dashboard?tab=profile";
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                    {currentUser.isAdmin && tablet && (
                      <button
                        onClick={() => (window.location.href = "/create-post")}
                        className="text-white mx-4 mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm h-[40px] w-[85%] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Create Post
                      </button>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <>
            {toggleMenu && (
              <div className=" bg-gray-900 mobile:p-3">
                <div className=" w-full flex  mx-4 mobile:mx-0">
                  <form
                    action=""
                    onSubmit={handleSearch}
                    className="w-full mobile:flex mobile:justify-center"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      className="p-2 w-[350px] rounded outline-none mobile:w-[80%]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
                <ul className="flex font-medium mr-8 p-2 rounded-lg dark:border-gray-700 mobile:flex mobile:flex-col mobile:m-0 mobile:text-center">
                  <li>
                    <Link
                      to={"/"}
                      className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blogs"
                      className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about-us"
                      className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="feedback"
                      className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                    >
                      Feedback
                    </Link>
                  </li>
                </ul>
                <div className="mobile:flex mobile:justify-center">
                  {currentUser.isAdmin && (
                    <button
                      onClick={() => (window.location.href = "/create-post")}
                      className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm h-[40px] w-[120px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mobile:m-0 mobile:"
                    >
                      Create Post
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        </nav>
      ) : (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 py-2 ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              onClick={() => {
                window.location.href = "/";
              }}
              className="flex justify-start items-center w-[428px] space-x-3 ml-4"
            >
              <img
                src={insight_loop_logo}
                className="h-8 mobile:h-6"
                alt="Insight Loop Logo"
              />
              <span className="self-center mobile:text-[14pt] desktop:text-[14  pt] largeDesktop:text-[16pt] font-semibold whitespace-nowrap dark:text-white">
                Insight Loop
              </span>
            </Link>

            {/* Navbar links */}

            <div
              className=" items-center justify-end flex w-auto"
              id="navbar-cta"
            >
              {mobile && (
                <div>
                  {toggleMenu ? (
                    <div>
                      <svg
                        className="w-8 h-8 mr-2 transition-all ease-in-out duration-300 text-gray-800 dark:text-white"
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
                        className="w-8 h-8 transition-all ease-in-out duration-300 text-gray-800 dark:text-white mr-2"
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
                          d="M5 7h14M5 12h14M5 17h14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {tablet && (
                <div>
                  {toggleMenu ? (
                    <div>
                      <svg
                        className="w-8 h-8 mr-2 transition-all ease-in-out duration-300 text-gray-800 dark:text-white"
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
                        className="w-8 h-8 transition-all ease-in-out duration-300 text-gray-800 dark:text-white mr-2"
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
                          d="M5 7h14M5 12h14M5 17h14"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {desktop && (
                <div className="flex">
                  <ul className="flex font-medium mr-4 p-2 rounded-lg dark:border-gray-700 gap-2">
                    <li>
                      <Link
                        to="/"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blogs"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us"
                        className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact-us"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="feedback"
                        className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                      >
                        Feedback
                      </Link>
                    </li>
                  </ul>
                  <div className="flex space-x-3 rtl:space-x-reverse mr-4">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = "/sign-up";
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Get started
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <>
            {toggleMenu && (
              <span className="">
                {mobile && (
                  <div className=" bg-gray-900 p-4 rounded-bl-lg absolute top-[6.5%] right-[0%] z-10 ">
                    <ul className="flex font-medium mr-8 p-2 rounded-lg dark:border-gray-700 mobile:flex mobile:flex-col mobile:m-0 mobile:text-center">
                      <li>
                        <Link
                          to={"/"}
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blogs"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about-us"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact-us"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="feedback"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Feedback
                        </Link>
                      </li>
                    </ul>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = "/sign-up";
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                )}

                {tablet && (
                  <div className="w-[100%] bg-gray-900 absolute top-[3%] right-[0%] z-10 ">
                    <ul className="flex font-medium mr-8 pt-8 pb-3 rounded-lg dark:border-gray-700 mobile:flex mobile:flex-col mobile:m-0 mobile:text-center tablet:flex tablet:justify-around tablet:m-0 tablet:items-center">
                      <li>
                        <Link
                          to={"/"}
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/blogs"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about-us"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm tracking-[2px] py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact-us"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="feedback"
                          onClick={toggleNavbar}
                          className="block font-normal text-sm py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"
                        >
                          Feedback
                        </Link>
                      </li>
                      <div className="">
                        <button
                          type="button"
                          onClick={() => {
                            window.location.href = "/sign-up";
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-12 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Get started
                        </button>
                      </div>
                    </ul>
                  </div>
                )}
              </span>
            )}
          </>
        </nav>
      )}
    </>
  );
};

export default NavbarComponent;
