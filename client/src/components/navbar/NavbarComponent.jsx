import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logoutSuccess } from "../../redux/user/userSlice";

const NavbarComponent = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavLinks, setShowNavLinks] = useState(false);
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

  return (
    <>
      {currentUser ? (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen flex items-center justify-between mx-auto p-2 px-12">
            <div>
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
                  Btye Tech Community
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div
                className=" items-center justify-end w-full md:flex md:w-auto md:order-1 mr-8"
                id="navbar-cta"
              >
                <ul className="flex font-medium p-2 rounded-lg md:p-0  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      onClick={() => {
                        window.location.href = "/blogs";
                      }}
                      className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      aria-current="page"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.location.href = "/about-us";
                      }}
                      className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.location.href = "/contact-us";
                      }}
                      className="block font-normal text-sm py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        window.location.href = "/feedback";
                      }}
                      className="block font-normal text-sm py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center">
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

              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mx-4"
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

              {currentUser.isAdmin && (
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
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen flex items-center justify-between px-8 py-2">
            {/* Logo */}
            <Link
              onClick={() => {
                window.location.href = "/";
              }}
              className="flex justify-start items-center w-[428px] space-x-3"
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
              className=" items-center justify-end flex w-auto"
              id="navbar-cta"
            >
              <ul className="flex font-medium mr-8 p-2 rounded-lg md:p-0  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.location.href = "/blogs";
                    }}
                    className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.location.href = "/about-us";
                    }}
                    className="block font-normal text-sm tracking-[2px] py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.location.href = "/contact-us";
                    }}
                    className="block font-normal text-sm py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
          </div>
        </nav>
      )}
    </>
  );
};

export default NavbarComponent;
