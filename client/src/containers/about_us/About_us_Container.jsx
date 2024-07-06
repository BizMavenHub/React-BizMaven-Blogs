import React from "react";

import { useMediaQuery } from "react-responsive";

import { Link } from "react-router-dom";

import {
  Picture_0_about_us,
  Picture_1_about_us,
  Picture_2_about_us,
} from "../../assets";

import { Ad_Card } from "../../components";

import { Helmet } from "react-helmet";

function About_us_Container() {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  const desktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1919px)",
  });

  const largeDesktop = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  const MobileView = () => {
    return (
      <div className="about-us-container">
        <div className="w-[90%] m-auto">
          <div className="title-container">
            <h1 className="text-[32pt] text-left mb-4 mt-8 font-semibold">
              About Our Website
            </h1>
          </div>
          <div className="paragraph-container text-lg text-[#4B4B4B]">
            {/* Paragraph 1 */}
            <div className="paragraph-1">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Welcome to our blog, where we pride ourselves on delivering
                high-quality content that caters to a wide range of interests.
                Our topics span various general content areas, ensuring there's
                something for everyone. We aim to create an engaging and
                informative space for our readers, offering insights and updates
                that keep you well-informed.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="paragraph-2">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Our dedicated team of writers works tirelessly to provide the
                latest information on a variety of subjects. From current events
                to practical tips and thought-provoking articles, we cover it
                all. We believe in the power of knowledge and strive to share
                content that is both useful and interesting to our audience.
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="paragraph-3">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                We understand the importance of staying up-to-date in today's
                fast-paced world. That's why we make it our mission to deliver
                timely updates and fresh perspectives. Whether you're looking
                for news, lifestyle tips, or deep dives into trending topics,
                our blog is designed to be your reliable source of information.
              </p>
            </div>

            {/* Paragraph 4 */}
            <div className="paragraph-4">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Thank you for visiting our blog. We hope you find our content
                enriching and enjoyable. Your feedback is valuable to us, and we
                look forward to building a community of well-informed readers.
                Stay tuned for more exciting posts and join us on this journey
                of discovery and learning.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="what-we-offer-container">
            <h1 className="text-[20pt] text-left mb-4 mt-8 font-semibold">
              What We Offer
            </h1>

            <div className="offers-container w-full mt-8">
              {/* Offer 1 */}
              <div className="offer-1 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[50px] w-[72%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_0_about_us}
                    alt="up to date"
                    className="h-32"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Up to Date
                </h2>
              </div>

              {/* Offer 2 */}
              <div className="offer-2 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[50px] w-[72%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_1_about_us}
                    alt="up to date"
                    className="h-32"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Expert Writers
                </h2>
              </div>

              {/* Offer 3 */}
              <div className="offer-3 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[50px] w-[72%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_2_about_us}
                    alt="up to date"
                    className="h-32"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Quality Contents
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Become our member */}
        <div className="become-our-member-container">
          <div className="bg-[#FF5C00] px-4 py-6">
            <h2 className="text-[24pt] text-center font-inter font-bold text-white tracking-widest">
              Become One of Our Members Now!
            </h2>

            <div className="btn-container flex justify-center items-center my-8">
              <Link
                onClick={() => {
                  window.location.href = "/sign-up";
                }}
                className="text-[#FF5C00] bg-white hover:bg-[#FF5C00] font-bold py-2 px-16 text-xl rounded-xl"
              >
                Join Us Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="about-us-container ">
        <div className="px-4">
          <div className="title-container">
            <h1 className="text-[32pt] text-left mb-4 mt-8 font-semibold">
              About Our Website
            </h1>
          </div>
          <div className="paragraph-container text-lg text-[#4B4B4B]">
            {/* Paragraph 1 */}
            <div className="paragraph-1">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Welcome to our blog, where we pride ourselves on delivering
                high-quality content that caters to a wide range of interests.
                Our topics span various general content areas, ensuring there's
                something for everyone. We aim to create an engaging and
                informative space for our readers, offering insights and updates
                that keep you well-informed.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="paragraph-2">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Our dedicated team of writers works tirelessly to provide the
                latest information on a variety of subjects. From current events
                to practical tips and thought-provoking articles, we cover it
                all. We believe in the power of knowledge and strive to share
                content that is both useful and interesting to our audience.
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="paragraph-3">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                We understand the importance of staying up-to-date in today's
                fast-paced world. That's why we make it our mission to deliver
                timely updates and fresh perspectives. Whether you're looking
                for news, lifestyle tips, or deep dives into trending topics,
                our blog is designed to be your reliable source of information.
              </p>
            </div>

            {/* Paragraph 4 */}
            <div className="paragraph-4">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Thank you for visiting our blog. We hope you find our content
                enriching and enjoyable. Your feedback is valuable to us, and we
                look forward to building a community of well-informed readers.
                Stay tuned for more exciting posts and join us on this journey
                of discovery and learning.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="what-we-offer-container">
            <h1 className="text-[20pt] text-left mb-4 mt-8 font-semibold">
              What We Offer
            </h1>

            <div className="offers-container w-full mt-8 flex flex-col-3 gap-x-8">
              {/* Offer 1 */}
              <div className="offer-1 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_0_about_us}
                    alt="up to date"
                    className="h-20"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Up to Date
                </h2>
              </div>

              {/* Offer 2 */}
              <div className="offer-2 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_1_about_us}
                    alt="up to date"
                    className="h-20"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Expert Writers
                </h2>
              </div>

              {/* Offer 3 */}
              <div className="offer-3 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 px-[23px] py-[37px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_2_about_us}
                    alt="up to date"
                    className="h-24"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Quality Contents
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Become our member */}
        <div className="become-our-member-container">
          <div className="bg-[#FF5C00] px-4 py-6">
            <h2 className="text-[24pt] text-center font-inter font-bold text-white tracking-widest">
              Become One of Our Members Now!
            </h2>

            <div className="btn-container flex justify-center items-center my-8">
              <Link
                onClick={() => {
                  window.location.href = "/sign-up";
                }}
                className="text-[#FF5C00] bg-white hover:bg-[#FF5C00] font-bold py-2 px-16 text-xl rounded-xl"
              >
                Join Us Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="about-us-container ">
        <div className="px-4 w-[70%] m-auto">
          <div className="title-container">
            <h1 className="text-[38pt] text-center mb-4 mt-8 font-bold">
              About Our Website
            </h1>
          </div>
          <div className="paragraph-container text-lg text-[#4B4B4B]">
            {/* Paragraph 1 */}
            <div className="paragraph-1">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Welcome to our blog, where we pride ourselves on delivering
                high-quality content that caters to a wide range of interests.
                Our topics span various general content areas, ensuring there's
                something for everyone. We aim to create an engaging and
                informative space for our readers, offering insights and updates
                that keep you well-informed.
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="paragraph-2">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Our dedicated team of writers works tirelessly to provide the
                latest information on a variety of subjects. From current events
                to practical tips and thought-provoking articles, we cover it
                all. We believe in the power of knowledge and strive to share
                content that is both useful and interesting to our audience.
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="paragraph-3">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                We understand the importance of staying up-to-date in today's
                fast-paced world. That's why we make it our mission to deliver
                timely updates and fresh perspectives. Whether you're looking
                for news, lifestyle tips, or deep dives into trending topics,
                our blog is designed to be your reliable source of information.
              </p>
            </div>

            {/* Paragraph 4 */}
            <div className="paragraph-4">
              <p className="text-[#4B4B4B] tracking-wide mt-5">
                Thank you for visiting our blog. We hope you find our content
                enriching and enjoyable. Your feedback is valuable to us, and we
                look forward to building a community of well-informed readers.
                Stay tuned for more exciting posts and join us on this journey
                of discovery and learning.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="what-we-offer-container">
            <h1 className="text-[20pt] text-left mb-4 mt-8 font-semibold">
              What We Offer
            </h1>

            <div className="offers-container w-full mt-8 flex flex-col-3 gap-x-8">
              {/* Offer 1 */}
              <div className="offer-1 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_0_about_us}
                    alt="up to date"
                    className="h-20"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Up to Date
                </h2>
              </div>

              {/* Offer 2 */}
              <div className="offer-2 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_1_about_us}
                    alt="up to date"
                    className="h-20"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Expert Writers
                </h2>
              </div>

              {/* Offer 3 */}
              <div className="offer-3 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 px-[23px] py-[37px] w-[35%] rounded-xl">
                <div className="image-container">
                  <img
                    src={Picture_2_about_us}
                    alt="up to date"
                    className="h-24"
                  />
                </div>
                <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                  Quality Contents
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Become our member */}
        <div className="become-our-member-container">
          <div className="bg-[#FF5C00] px-4 py-6 flex justify-between items-center">
            <h2 className="text-[18pt] text-center font-inter font-bold text-white tracking-widest">
              Become One of Our Members Now!
            </h2>

            <div className="btn-container flex justify-center items-center my-8">
              <Link
                onClick={() => {
                  window.location.href = "/sign-up";
                }}
                className="text-[#FF5C00] bg-white hover:bg-[#FF5C00] font-bold py-2 px-16 text-xl rounded-xl"
              >
                Join Us Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="about-us-container ">
        <div className=" w-full m-auto flex justify-evenly">
          <div className="ad-container mt-[150px]">
            <Ad_Card />
          </div>

          <div className="content-container w-[60%]">
            <div className="title-container">
              <h1 className="text-[38pt] text-center mb-4 mt-8 font-bold">
                About Our Website
              </h1>
            </div>
            <div className="paragraph-container text-lg text-[#4B4B4B]">
              {/* Paragraph 1 */}
              <div className="paragraph-1">
                <p className="text-[#4B4B4B] tracking-wide mt-5">
                  Welcome to our blog, where we pride ourselves on delivering
                  high-quality content that caters to a wide range of interests.
                  Our topics span various general content areas, ensuring
                  there's something for everyone. We aim to create an engaging
                  and informative space for our readers, offering insights and
                  updates that keep you well-informed.
                </p>
              </div>

              {/* Paragraph 2 */}
              <div className="paragraph-2">
                <p className="text-[#4B4B4B] tracking-wide mt-5">
                  Our dedicated team of writers works tirelessly to provide the
                  latest information on a variety of subjects. From current
                  events to practical tips and thought-provoking articles, we
                  cover it all. We believe in the power of knowledge and strive
                  to share content that is both useful and interesting to our
                  audience.
                </p>
              </div>

              {/* Paragraph 3 */}
              <div className="paragraph-3">
                <p className="text-[#4B4B4B] tracking-wide mt-5">
                  We understand the importance of staying up-to-date in today's
                  fast-paced world. That's why we make it our mission to deliver
                  timely updates and fresh perspectives. Whether you're looking
                  for news, lifestyle tips, or deep dives into trending topics,
                  our blog is designed to be your reliable source of
                  information.
                </p>
              </div>

              {/* Paragraph 4 */}
              <div className="paragraph-4">
                <p className="text-[#4B4B4B] tracking-wide mt-5">
                  Thank you for visiting our blog. We hope you find our content
                  enriching and enjoyable. Your feedback is valuable to us, and
                  we look forward to building a community of well-informed
                  readers. Stay tuned for more exciting posts and join us on
                  this journey of discovery and learning.
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div className="what-we-offer-container">
              <h1 className="text-[20pt] text-left mb-4 mt-8 font-semibold">
                What We Offer
              </h1>

              <div className="offers-container w-full mt-8 flex flex-col-3 gap-x-8">
                {/* Offer 1 */}
                <div className="offer-1 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                  <div className="image-container">
                    <img
                      src={Picture_0_about_us}
                      alt="up to date"
                      className="h-20"
                    />
                  </div>
                  <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                    Up to Date
                  </h2>
                </div>

                {/* Offer 2 */}
                <div className="offer-2 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 p-[45px] w-[35%] rounded-xl">
                  <div className="image-container">
                    <img
                      src={Picture_1_about_us}
                      alt="up to date"
                      className="h-20"
                    />
                  </div>
                  <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                    Expert Writers
                  </h2>
                </div>

                {/* Offer 3 */}
                <div className="offer-3 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.3)] bg-[#F2F2F2] flex flex-col justify-center items-center m-auto mb-12 px-[23px] py-[37px] w-[35%] rounded-xl">
                  <div className="image-container">
                    <img
                      src={Picture_2_about_us}
                      alt="up to date"
                      className="h-24"
                    />
                  </div>
                  <h2 className="text-[16pt] text-center mt-4 font-bold text-[#4B4B4B]">
                    Quality Contents
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="ad-container mt-[150px]">
            <Ad_Card />
          </div>
        </div>
        {/* Become our member */}
        <div className="become-our-member-container">
          <div className="bg-[#FF5C00] px-4 py-6 flex justify-between items-center">
            <h2 className="text-[24pt] text-center font-inter font-bold text-white tracking-widest">
              Become One of Our Members Now!
            </h2>

            <div className="btn-container flex justify-center items-center my-8">
              <Link
                onClick={() => {
                  window.location.href = "/sign-up";
                }}
                className="text-[#FF5C00] bg-white font-bold py-3 px-14 text-xl rounded-2xl"
              >
                Join Us Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <Link rel="canonical" href="https://www.insightloop.blog/about-us" />
        <Link
          rel="favicon"
          href="/assets/insight_Loop_Logo-only_white-Bg-transparent.png"
        />
      </Helmet>

      {mobile && <MobileView />}

      {tablet && <TabletView />}

      {desktop && <DesktopView />}

      {largeDesktop && <LargeDesktopView />}
    </>
  );
}

export default About_us_Container;
