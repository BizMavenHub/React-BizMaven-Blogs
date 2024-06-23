import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import {
  Girl_sitting_and_reading,
  Introduction,
  Picture_0,
  Picture_1,
  Picture_2,
  Picture_3,
  Wave,
} from "../../assets/index.js";

import { BlogCard } from "../../components/index.js";

const HomepageContainer = () => {
  // ---------------Media Queries-------------------

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

  // ---------------Views-------------------

  const MobileView = () => {
    return (
      <div>
        {/* Introduction Section */}
        <div className="introduction section">
          <section className="welcome-txt-container absolute text-white top-[40%] drop-shadow-lg">
            <h1 className="welcome-text font-inter text-5xl font-bold text-center ">
              <span className="text-6xl">Welcome to </span>Insight Loop
            </h1>
            <p className="w-[80%] m-auto text-center">
              your premier destination for captivating and enlightening blog
              content
            </p>
          </section>
          <div className="image-container">
            <img
              src={Introduction}
              alt="induction picture"
              className="h-[680px] w-[1000px] object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="features-container">
          {/* Feature 1 */}
          <div className="feature-1 bg-[#6B8BED]">
            <div className="context-container text-center text-white">
              <h2 className="font-inter text-3xl font-bold w-[80%] m-auto pt-6 tracking-wide">
                Best Articles For Everyone
              </h2>
              <p className="font-regular font-inter mt-4 w-[90%] m-auto tracking-wide">
                Offers top-quality articles for a diverse audience, including
                tech enthusiasts, travel lovers, health-conscious individuals,
                and lifestyle seekers.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_0}
                alt="best articles"
                className="h-[330px] m-auto"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-2 bg-[#F55D5D]">
            <div className="context-container text-center text-white">
              <h2 className="font-inter text-3xl font-bold w-[80%] m-auto pt-6 tracking-wide">
                Best Topics
              </h2>
              <p className="font-regular font-inter mt-4 w-[90%] m-auto tracking-wide">
                Offers a wide range of topics including technology, travel,
                health, and lifestyle. Our team continually explores fresh
                subjects to provide current and relevant content, keeping you
                informed with the latest trends and insights.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_1}
                alt="best articles"
                className="h-[400px] m-auto py-12"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-3 bg-[#9349F1]">
            <div className="context-container text-center text-white">
              <h2 className="font-inter text-3xl font-bold w-[80%] m-auto pt-6 tracking-wide">
                Regular Update
              </h2>
              <p className="font-regular font-inter mt-4 w-[90%] m-auto tracking-wide">
                Keeps content fresh with regular updates, frequently adding new
                articles and features. Stay tuned to never miss out on exciting
                content.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_2}
                alt="best articles"
                className="h-[350px] m-auto pb-5"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-4 bg-[#F5AF5D]">
            <div className="context-container text-center text-white">
              <h2 className="font-inter text-3xl font-bold w-[80%] m-auto pt-6 tracking-wide">
                Reliable Insights
              </h2>
              <p className="font-regular font-inter mt-4 w-[90%] m-auto tracking-wide">
                Prioritizes accuracy and reliability, offering well-researched
                and trustworthy insights. Our commitment to quality ensures you
                gain valuable knowledge and perspectives from every article.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_3}
                alt="best articles"
                className="h-[350px] m-auto py-5"
              />
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-us-container">
          <section className="context-container text-center bg-[#BE1818]">
            <h2 className="font-inter text-4xl font-bold w-[80%] m-auto pt-6 tracking-wide text-white">
              Explore Top Articles
            </h2>
            <div className="image-container">
              <img
                src={Girl_sitting_and_reading}
                alt=" girl reading "
                className="h-[340px] m-auto mt-6"
              />
            </div>
            <p className="font-regular font-inter mt-4 w-[90%] m-auto tracking-wide text-white">
              Join us today to enhance your blogging experience and connect with
              readers who appreciate great content.
            </p>

            <div className="join-us-btn pt-6">
              <button
                onClick={() => (window.location.href = "/sign-up")}
                className="font-inter text-xl font-semibold text-white py-3 px-8 border-[3px] border-[#E7EB21] rounded-2xl"
              >
                Join Us Today For Free
              </button>
            </div>

            <div className="wave-container">
              <img src={Wave} alt="wave" className="h-[120px] w-full" />
            </div>
          </section>
        </div>
      </div>
    );
  };

  const TabletView = () => {};

  const DesktopView = () => {};

  const LargeDesktopView = () => {};

  return (
    <>
      {mobile && <MobileView />}
      {tablet && <MobileView />}
      {desktop && <DesktopView />}
      {largeDesktop && <LargeDesktopView />}
    </>
  );
};

export default HomepageContainer;
