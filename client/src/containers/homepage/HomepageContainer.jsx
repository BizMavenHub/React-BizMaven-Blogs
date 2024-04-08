import React from "react";
import { Link } from "react-router-dom";
import women from "../../assets/business-woman-working-on-laptop-in-her-office.jpg";

const HomepageContainer = () => {
  return (
    <div>
      <div className="homepage-container m-auto min-h-[100vh] desktop:w-[1300px]">
        <section className="pt-20 min-h-[100vh]">
          <h1 className="desktop:text-8xl text-[#ffff] font-semibold w-[1300px] tracking-normal font-roboto">
            Welcome to <span className="text-navbar-text">BizMaven Blogs!</span>{" "}
            Explore the World of fascinating topics.
          </h1>
          <section className="mt-12 p-4 pt-8">
            <div>
              <img
                src={women}
                alt=""
                className="w-full h-[750px] object-cover rounded-"
              />
            </div>
            <p className="text-[#ffff] text-4xl tracking-wide font-poppins leading-tight mt-16">
              Welcome to BizMaven blog hub! Get ready to explore a world of
              diverse voices and fascinating topics. Whether you're seeking
              inspiration, advice, or just a good read, you'll find it all here.
              Join us as we dive into the wonderful realm of blogging and
              discover the power of words to connect, inspire, and enrich our
              lives.
            </p>
          </section>
        </section>
        <section className="h-[100vh] mt-12">
          <div>
            <h1 className="text-8xl text-center font-poppins font-semibold text-white">
              What we care <span className=" text-navbar-text">about</span>
            </h1>
            <div className=" flex justify-center mt-12">
              <section className=" w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg">
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
              <section className=" w-full p-4 pt-8 bg-[#ECECEC] m-4 rounded-lg">
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
              <section className=" w-full p-4 pt-6 bg-[#ECECEC] m-4 rounded-lg">
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
            <div className="mt-24">
              <h1 className="text-8xl text-center font-poppins font-semibold text-white">
                Join Us <span className=" text-navbar-text">Now!</span>
              </h1>
              <div className="flex justify-center mt-12">
                <Link
                  to={"/sign-up"}
                  className="text-2xl text-center bg-navbar-text text-navbar-bg font-semibold font-overpass rounded-lg py-4 px-12"
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
