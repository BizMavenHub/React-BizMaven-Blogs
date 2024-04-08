import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="footer-container bg-[#070F2B] p-4">
      <div className="footer flex justify-around">
        <div className="cols-1">
          <h1 className="text-navbar-text text-3xl font-semibold mb-4">
            BizMaven Blog
          </h1>
          <div className="mt-2 text-white text-center">
            <ul>
              <li className="text-xl mt-2">
                <Link>About Us</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Career</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Blog</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Our Project</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Feedback</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="cols-2">
          <h1 className="text-navbar-text text-3xl font-semibold mb-4">
            Social Media
          </h1>
          <div className="mt-2 text-white text-center">
            <ul>
              <li className="text-xl mt-2">
                <Link>Facebook</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Instagram</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Twitter</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Reddit</Link>
              </li>
              <li className="text-xl mt-2">
                <Link>Github</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="cols-3">
          <h1 className="text-navbar-text text-3xl font-semibold mb-4">
            More by BizMaven
          </h1>
          <div className="mt-2 text-white text-center">
            <ul>
              <li className="text-xl mt-2">
                <a href="https://google.com" target="_blank">
                  Food Recipe Finder
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="cols-4">
          <h1 className="text-navbar-text text-3xl font-semibold">
            Support Us On Patreon
          </h1>
          <div className="mt-2 text-white">
            <a
              href=""
              className="py-4 px-12 text-center bg-navbar-footer-bg flex justify-center mt-12 rounded-lg font-lato font-semibold text-[12pt] tracking-wide"
            >
              Click here to help us
            </a>
          </div>
        </div>
      </div>
      <hr className="text-white mt-6 mb-2" />
      <div className="text-white">
        <p>© 2024 BizMaven. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterComponent;
