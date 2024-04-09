import React from "react";
import { Link } from "react-router-dom";
import women from "../../assets/business-woman-working-on-laptop-in-her-office.jpg";

const HomepageContainer = () => {
  return (
    <div>
      <div className="homepage-container m-auto min-h-[100vh] desktop:w-[1300px] tablet:px-4 mobile:px-4">
        <div className="pt-20 min-h-[100vh] mobile:pt-8 tablet:pt-12">
          <h1 className="desktop:text-8xl tablet:text-6xl mobile:text-3xl text-[#ffff] font-semibold tracking-normal font-roboto">
            Welcome to <span className="text-navbar-text">BizMaven Blogs!</span>{" "}
            Explore the World of fascinating topics.
          </h1>
          <section className="mt-12 p-4 pt-8 mobile:mt-6 mobile:p-0 tablet:p-4">
            <div>
              <img
                src={women}
                alt=""
                className="w-full h-[750px] object-cover rounded-xl mobile:h-[300px] tablet:h-[500px]"
              />
            </div>
            <p className="text-[#ffff] text-4xl tracking-wide font-poppins leading-tight mt-16 mobile:text-lg mobile:mt-4 tablet:text-3xl tablet:mt-8">
              Welcome to BizMaven blog hub! Get ready to explore a world of
              diverse voices and fascinating topics. Whether you're seeking
              inspiration, advice, or just a good read, you'll find it all here.
              Join us as we dive into the wonderful realm of blogging and
              discover the power of words to connect, inspire, and enrich our
              lives.
            </p>
          </section>
        </div>
        <section className="mt-12">
          <div>
            <h1 className="text-8xl text-center font-poppins font-semibold text-white mobile:text-4xl tablet:text-7xl">
              What we care <span className=" text-navbar-text">about</span>
            </h1>
            <div className=" flex justify-center mt-12 mobile:flex-col mobile:items-center mobile:mt-8 tablet:flex-col tablet:items-center tablet:mx-8">
              <section className=" w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Best Topics
                  </h2>
                  <p className="text-xl mt-4">
                    Choose topics that our audience cares about, finds
                    interesting and understanding our audience interests.
                  </p>
                </span>
              </section>
              <section className=" w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center ">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Quality Contents
                  </h2>
                  <p className="text-xl mt-4">
                    Create content that's well-researched, well-written, and
                    valuable. It should be informative, easy to understand, and
                    offer something useful for readers.
                  </p>
                </span>
              </section>
              <section className=" w-full p-4 pt-6 bg-[#ECECEC] m-4 rounded-lg tablet:pb-6 tablet:px-4 tablet:text-center ">
                <span>
                  <h2 className="text-3xl text-center font-semibold font-overpass">
                    Useful
                  </h2>
                  <p className="text-xl mt-4">
                    Make sure your content provides practical value to our
                    audience. Whether it's solving a problem or offering helpful
                    tips, aim to empower readers with information they can use
                    in their lives.
                  </p>
                </span>
              </section>
            </div>
            <div className="mt-24 mb-24 mobile:mt-12 mobile:mb-12 tablet:mt-10 tablet:mb-10 ">
              <h1 className="text-8xl text-center font-poppins font-semibold text-white mobile:text-4xl tablet:text-6xl">
                Join Us <span className=" text-navbar-text">Now!</span>
              </h1>
              <div className="flex justify-center mt-12 mobile:mt-8">
                <Link
                  to={"/sign-up"}
                  className="text-2xl text-center bg-navbar-text text-navbar-bg font-semibold font-overpass rounded-lg py-4 px-12 mobile:px-6 "
                >
                  Getting Started Now | Free
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomepageContainer;
