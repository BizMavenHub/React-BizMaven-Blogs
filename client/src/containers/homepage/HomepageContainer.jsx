import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import {
  Girl_sitting_and_reading,
  Introduction,
  Picture_0_homepage,
  Picture_1_homepage,
  Picture_2_homepage,
  Picture_3_homepage,
  Wave,
} from "../../assets/index.js";

import { BlogCard } from "../../components/index.js";

import { Helmet } from "react-helmet";

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
                src={Picture_0_homepage}
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
                src={Picture_1_homepage}
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
                src={Picture_2_homepage}
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
                src={Picture_3_homepage}
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
              <Link
                to="/sign-up"
                className="font-inter text-xl font-semibold text-white py-3 px-8 border-[3px] border-[#E7EB21] rounded-2xl"
              >
                Join Us Today For Free
              </Link>
            </div>

            <div className="wave-container">
              <img src={Wave} alt="wave" className="h-[120px] w-full" />
            </div>
          </section>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div>
        {/* Introduction Section */}
        <div className="introduction section">
          <section className="welcome-txt-container absolute text-white top-1/4 text-center drop-shadow-lg m-auto w-full">
            <h1 className="welcome-text font-inter text-6xl font-bold ">
              Welcome to Insight Loop
            </h1>
            <p className="w-[60%] m-auto text-2xl mt-2">
              your premier destination for captivating and enlightening blog
              content
            </p>
          </section>
          <div className="image-container">
            <img
              src={Introduction}
              alt="induction picture"
              className="h-[600px] w-full object-cover"
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
                src={Picture_0_homepage}
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
                src={Picture_1_homepage}
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
                src={Picture_2_homepage}
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
                src={Picture_3_homepage}
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
              <Link
                to="/sign-up"
                className="font-inter text-xl font-semibold text-white py-3 px-8 border-[3px] border-[#E7EB21] rounded-2xl"
              >
                Join Us Today For Free
              </Link>
            </div>

            <div className="wave-container">
              <img src={Wave} alt="wave" className="h-[120px] w-full" />
            </div>
          </section>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div>
        {/* Introduction Section */}
        <div className="introduction section">
          <section className="welcome-txt-container absolute text-white top-[40%] drop-shadow-2xl w-full m-auto">
            <h1 className="welcome-text font-inter text-[76pt] font-bold text-center ">
              Welcome to Insight Loop
            </h1>
            <p className="w-[60%] m-auto text-center text-[26pt]">
              your premier destination for captivating and enlightening blog
              content
            </p>
          </section>
          <div className="image-container ">
            <img
              src={Introduction}
              alt="induction picture"
              className="h-[900px] w-[100%] object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="features-container">
          {/* Feature 1 */}
          <div className="feature-1 bg-[#6B8BED] flex items-center justify-evenly">
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-6xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Best Articles For Everyone
              </h2>
              <p className="font-light font-inter mt-4 w-[90%] text-3xl m-auto tracking-wide text-left leading-[1.4]">
                Offers top-quality articles for a diverse audience, including
                tech enthusiasts, travel lovers, health-conscious individuals,
                and lifestyle seekers.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_0_homepage}
                alt="best articles"
                className="h-[700px] m-auto"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-2 bg-[#F55D5D] flex items-center justify-evenly">
            <div className="image-container">
              <img
                src={Picture_1_homepage}
                alt="best articles"
                className="h-[680px] m-auto py-16"
              />
            </div>
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-6xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Best Topics
              </h2>
              <p className="font-light font-inter mt-4 w-[90%] text-3xl m-auto tracking-wide text-left leading-[1.4]">
                Offers a wide range of topics including technology, travel,
                health, and lifestyle. Our team continually explores fresh
                subjects to provide current and relevant content, keeping you
                informed with the latest trends and insights.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-3 bg-[#9349F1] flex items-center justify-evenly">
            <div className="context-container text-center text-white w-[50%] ">
              <h2 className="font-inter text-6xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Regular Update
              </h2>
              <p className="font-light font-inter mt-4 w-[90%] text-3xl m-auto tracking-wide text-left leading-[1.4]">
                Keeps content fresh with regular updates, frequently adding new
                articles and features. Stay tuned to never miss out on exciting
                content.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_2_homepage}
                alt="best articles"
                className="h-[700px] m-auto pb-5"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-4 bg-[#F5AF5D] flex items-center justify-evenly">
            <div className="image-container">
              <img
                src={Picture_3_homepage}
                alt="best articles"
                className="h-[620px] m-auto py-5"
              />
            </div>
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-6xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Reliable Insights
              </h2>
              <p className="font-light font-inter mt-4 w-[90%] text-3xl m-auto tracking-wide text-left leading-[1.4]">
                Prioritizes accuracy and reliability, offering well-researched
                and trustworthy insights. Our commitment to quality ensures you
                gain valuable knowledge and perspectives from every article.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-us-container bg-[#BE1818]">
          <section className="context-container text-center flex justify-evenly items-center">
            <div className="context-container w-[60%]">
              <h2 className="font-inter text-7xl font-semibold w-full m-auto pb-8 tracking-wide text-white">
                Explore Top Articles
              </h2>
              <p className="font-regular font-inter mt-4 w-[75%] m-auto tracking-wide text-white text-2xl leading-[1.3]">
                Join us today to enhance your blogging experience and connect
                with readers who appreciate great content.
              </p>
              <div className="join-us-btn mt-8">
                <Link
                  to="/sign-up"
                  className="font-inter text-xl font-semibold text-white py-3 px-8 border-[3px] border-[#E7EB21] rounded-2xl"
                >
                  Join Us Today For Free
                </Link>
              </div>
            </div>
            <div className="image-container">
              <img
                src={Girl_sitting_and_reading}
                alt=" girl reading "
                className="h-[500px] m-auto mt-14"
              />
            </div>
          </section>
          <div className="wave-container">
            <img
              src={Wave}
              alt="wave"
              className="h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div>
        {/* Introduction Section */}
        <div className="introduction section">
          <div className="welcome-txt-container absolute text-white top-[40%] drop-shadow-2xl w-full m-auto">
            <h1 className="welcome-text font-inter text-[82pt] font-bold text-center">
              Welcome to Insight Loop
            </h1>
            <p className="w-[60%] m-auto text-center text-[28pt]">
              your premier destination for captivating and enlightening blog
              content
            </p>
          </div>
          <div className="image-container ">
            <img
              src={Introduction}
              alt="induction picture"
              className="h-[1000px] w-[100%] object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="features-container">
          {/* Feature 1 */}
          <div className="feature-1 bg-[#6B8BED] flex items-center justify-evenly">
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-7xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Best Articles For Everyone
              </h2>
              <p className="font-light font-inter mt-4 w-[78%] text-3xl m-auto tracking-wide text-left leading-[1.5]  ">
                Offers top-quality articles for a diverse audience, including
                tech enthusiasts, travel lovers, health-conscious individuals,
                and lifestyle seekers.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_0_homepage}
                alt="best articles"
                className="h-[700px] m-auto"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-2 bg-[#F55D5D] flex items-center justify-evenly">
            <div className="image-container">
              <img
                src={Picture_1_homepage}
                alt="best articles"
                className="h-[650px] m-auto py-12"
              />
            </div>
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-7xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Best Topics
              </h2>
              <p className="font-light font-inter mt-4 w-[80%] text-3xl m-auto tracking-wide text-left leading-[1.5]">
                Offers a wide range of topics including technology, travel,
                health, and lifestyle. Our team continually explores fresh
                subjects to provide current and relevant content, keeping you
                informed with the latest trends and insights.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-3 bg-[#9349F1] flex items-center justify-evenly">
            <div className="context-container text-center text-white w-[50%] ">
              <h2 className="font-inter text-7xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Regular Update
              </h2>
              <p className="font-light font-inter mt-4 w-[78%] text-3xl m-auto tracking-wide text-left leading-[1.5]">
                Keeps content fresh with regular updates, frequently adding new
                articles and features. Stay tuned to never miss out on exciting
                content.
              </p>
            </div>
            <div className="image-container">
              <img
                src={Picture_2_homepage}
                alt="best articles"
                className="h-[660px] m-auto pb-5"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-4 bg-[#F5AF5D] flex items-center justify-evenly">
            <div className="image-container">
              <img
                src={Picture_3_homepage}
                alt="best articles"
                className="h-[630px] m-auto py-5"
              />
            </div>
            <div className="context-container text-center text-white w-[50%]">
              <h2 className="font-inter text-7xl font-semibold w-[80%] m-auto pb-8 tracking-wide">
                Reliable Insights
              </h2>
              <p className="font-light font-inter mt-4 w-[85%] text-3xl m-auto tracking-wide text-left leading-[1.5]">
                Prioritizes accuracy and reliability, offering well-researched
                and trustworthy insights. Our commitment to quality ensures you
                gain valuable knowledge and perspectives from every article.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-us-container bg-[#BE1818]">
          <section className="context-container text-center flex justify-evenly items-center">
            <div className="context-container w-[50%]">
              <h2 className="font-inter text-7xl font-semibold w-full m-auto pb-8 tracking-wide text-white">
                Explore Top Articles
              </h2>
              <p className="font-regular font-inter mt-4 w-[55%] m-auto tracking-wide text-white text-2xl leading-[1.5]">
                Join us today to enhance your blogging experience and connect
                with readers who appreciate great content.
              </p>
              <div className="join-us-btn mt-8">
                <Link
                  to="/sign-up"
                  className="font-inter text-xl font-semibold text-white py-3 px-8 border-[3px] border-[#E7EB21] rounded-2xl"
                >
                  Join Us Today For Free
                </Link>
              </div>
            </div>
            <div className="image-container">
              <img
                src={Girl_sitting_and_reading}
                alt=" girl reading "
                className="h-[600px] m-auto mt-14"
              />
            </div>
          </section>
          <div className="wave-container">
            <img
              src={Wave}
              alt="wave"
              className="h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Welcome to Insight Loop</title>
        {/* <!-- % SEO Meta Tags --> */}
        <meta
          name="keywords"
          content="Insight Loop, Insight Loop Blog, blogging, blog templates, blog post, blogger com website, blog site templates, blog, blogs, "
        />
        <meta
          name="description"
          content="Discover premium quality insights, top-notch discussions, and exceptional analysis on a variety of trending topics and essential themes."
        />
      </Helmet>
      {mobile && <MobileView />}
      {tablet && <TabletView />}
      {desktop && <DesktopView />}
      {largeDesktop && <LargeDesktopView />}
    </>
  );
};

export default HomepageContainer;
