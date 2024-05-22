import React from "react";
import { Link } from "react-router-dom";

import { BlogCard } from "../../components/index.js";

const HomepageContainer = () => {
  let element = [];
  for (let i = 0; i < 8; i++) {
    element.push(
      <BlogCard
        img="https://beebom.com/wp-content/uploads/2024/04/cillian-murphy-peaky-blinders.jpg?resize=300%2C180&quality=75&strip=all"
        title="Noteworthy technology acquisitions 2021"
        desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        index={i}
      />
    );
  }

  return (
    <div className="homepage-container mx-auto min-h-[100vh] w-full ">
      <div className="w-full mx-auto ">
        {/* Section 1 - Hero */}
        <section className=" min-h-[50vh] bg-blue-500 py-32">
          <div className="h-2/4 ">
            {/* Block 1 - Intro */}
            <div className=" w-[67%] m-auto ">
              <h1 className=" text-white text-[58pt] font-medium font-roboto leading-none tracking-tight md:text-5xl lg:text-6xl">
                Welcome to{" "}
                <span className=" text-yellow-400 dark:text-yellow-500">
                  Byte Tech Community
                </span>{" "}
                Explore the world of fascinating topics.
              </h1>
              <p className=" w-[90%] text-white font-meduim  text-2xl tracking-[1px] font-poppins leading-tight mt-6">
                Get ready to explore a world of diverse voices and fascinating
                topics. Whether you're seeking inspiration, advice, or just a
                good read, you'll find it all here.
              </p>
            </div>
          </div>
        </section>
        <section className=" min-h-[60vh] py-20 bg-blue-950">
          <div className="">
            <h1 className="text-8xl text-center font-roboto font-semibold text-yellow-400 mobile:text-4xl tablet:text-7xl">
              What we care <span className=" text-navbar-text">about</span>
            </h1>
            <div className=" flex justify-center mt-12 mobile:flex-col mobile:items-center mobile:mt-8 tablet:flex-col tablet:items-center tablet:mx-8 w-[1200px] m-auto">
              <section className=" shadow-lg w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Best Topics
                  </h2>
                  <p className="text-xl mt-4 text-center">
                    Choose topics that our audience cares about, finds
                    interesting and understanding our audience interests.
                  </p>
                </span>
              </section>
              <section className=" shadow-lg w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center ">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Quality Contents
                  </h2>
                  <p className="text-xl mt-4 text-center">
                    Create content that's well-researched, well-written, and
                    valuable. It should be informative, easy to understand, and
                    offer something useful for readers.
                  </p>
                </span>
              </section>
              <section className=" shadow-lg w-full p-4 pt-6 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center ">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Useful
                  </h2>
                  <p className="text-xl mt-4 text-center">
                    Make sure your content provides practical value to our
                    audience. Whether it's solving a problem or offering helpful
                    tips, aim to empower readers with information they can use
                    in their lives.
                  </p>
                </span>
              </section>
            </div>
          </div>
        </section>
        <section className="min-h-[35vh] py-20 bg-yellow-300">
          <div className=" mobile:mt-12 mobile:mb-12 tablet:mt-10 tablet:mb-10 ">
            <h1 className=" mx-auto w-[40%] text-6xl text-center font-roboto font-bold text-blue-500 mobile:text-4xl tablet:text-6xl">
              Start Reading & Sharing your thoughts{" "}
              <span className=" text-blue-950">Now!</span>
            </h1>
            <div className="flex justify-center mt-12 mobile:mt-8">
              <Link
                to="/sign-up"
                relative="path"
                className="text-2xl text-center bg-purple-500 shadow-lg text-white font-semibold font-overpass rounded-lg py-4 px-12 mobile:px-6 "
              >
                Getting Started Now | Free
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomepageContainer;
