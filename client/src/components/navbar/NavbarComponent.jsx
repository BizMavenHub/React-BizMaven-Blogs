import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <header className="navbar-container p-2 flex justify-around items-center ">
      <Link to="/" className="text-3xl font-semibold text-[#FBDF07]">
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
  );
};

export default NavbarComponent;
