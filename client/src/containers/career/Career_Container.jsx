import React from "react";
import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet-async";

import {
  Picture_0_career,
  Picture_1_career,
  Picture_2_career,
  Picture_3_career,
} from "../../assets";

const Career_container = () => {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });
  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const desktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1919px)",
  });
  const largeDesktop = useMediaQuery({ query: "(min-width: 1920px)" });

  const MobileView = () => {
    return (
      <div className="w-[90%] m-auto pb-12">
        <h1 className="text-6xl font-bold text-center my-14">
          About Our Careers
        </h1>

        <div>
          <section className="mb-8">
            <div className="image-container mb-8 ">
              <img
                src={Picture_3_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Stayed Updated
              </h2>
              <div>
                <p className="text-lg">
                  Our blogs aim to share valuable information about code and the
                  internet, offering readers insights into the latest
                  developments in technology. We cover a wide range of topics,
                  from programming languages to web development trends, ensuring
                  our audience stays informed about the ever-evolving tech
                  landscape.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="image-container">
              <img
                src={Picture_2_career}
                alt="picture-0"
                className="h-[380px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Our Reader Grow & Learn
              </h2>
              <div>
                <p className="text-lg">
                  Our platform encourages knowledge sharing among our readers,
                  fostering a community where individuals can exchange ideas,
                  tips, and solutions related to code and internet technologies.
                  By creating a space for open dialogue, we aim to support
                  collective learning and problem-solving.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="image-container mb-8 ">
              <img
                src={Picture_1_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Sharing Our Knowledge
              </h2>
              <div>
                <p className="text-lg">
                  We are committed to sharing our understanding of code and the
                  internet with our readers, distilling our expertise into
                  practical, actionable insights. Our content includes deep
                  dives into programming techniques, best practices for web
                  development, and the latest innovations in internet
                  technologies.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="image-container mb-8">
              <img
                src={Picture_0_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Achieve Your Career Goals
              </h2>
              <div>
                <p className="text-lg">
                  In addition to educational content, our blogs are dedicated to
                  helping readers find their careers in technology. We provide
                  guidance on career paths, job search strategies, and
                  professional development, ensuring that our audience has the
                  resources they need to succeed in the tech industry.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const TabletView = () => {
    return (
      <div className="w-[90%] m-auto pb-12">
        <h1 className="text-5xl font-bold text-center my-14">
          About Our Careers
        </h1>

        <div>
          <section className="mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Stayed Updated
              </h2>
              <div>
                <p className="text-sx">
                  Our blogs aim to share valuable information about code and the
                  internet, offering readers insights into the latest
                  developments in technology. We cover a wide range of topics,
                  from programming languages to web development trends, ensuring
                  our audience stays informed about the ever-evolving tech
                  landscape.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_3_career}
                alt="picture-0"
                className="h-[320px] w-[100%] object-contain"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_2_career}
                alt="picture-0"
                className="h-[320px] w-[100%] object-contain"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Our Reader Grow & Learn
              </h2>
              <div>
                <p className="text-sx">
                  Our platform encourages knowledge sharing among our readers,
                  fostering a community where individuals can exchange ideas,
                  tips, and solutions related to code and internet technologies.
                  By creating a space for open dialogue, we aim to support
                  collective learning and problem-solving.
                </p>
              </div>
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Sharing Our Knowledge
              </h2>
              <div>
                <p className="text-sx">
                  We are committed to sharing our understanding of code and the
                  internet with our readers, distilling our expertise into
                  practical, actionable insights. Our content includes deep
                  dives into programming techniques, best practices for web
                  development, and the latest innovations in internet
                  technologies.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_1_career}
                alt="picture-0"
                className="h-[320px] w-[100%] object-contain"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_0_career}
                alt="picture-0"
                className="h-[320px] w-[100%] object-contain"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Achieve Your Career Goals
              </h2>
              <div>
                <p className="text-sx">
                  In addition to educational content, our blogs are dedicated to
                  helping readers find their careers in technology. We provide
                  guidance on career paths, job search strategies, and
                  professional development, ensuring that our audience has the
                  resources they need to succeed in the tech industry.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const DesktopView = () => {
    return (
      <div className="w-[90%] m-auto pb-12">
        <h1 className="text-6xl font-bold text-center my-14">
          About Our Careers
        </h1>

        <div>
          <section className="flex justify-between items-center mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Stayed Updated
              </h2>
              <div>
                <p className="text-sx">
                  Our blogs aim to share valuable information about code and the
                  internet, offering readers insights into the latest
                  developments in technology. We cover a wide range of topics,
                  from programming languages to web development trends, ensuring
                  our audience stays informed about the ever-evolving tech
                  landscape.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_3_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_2_career}
                alt="picture-0"
                className="h-[380px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Our Reader Grow & Learn
              </h2>
              <div>
                <p className="text-lg">
                  Our platform encourages knowledge sharing among our readers,
                  fostering a community where individuals can exchange ideas,
                  tips, and solutions related to code and internet technologies.
                  By creating a space for open dialogue, we aim to support
                  collective learning and problem-solving.
                </p>
              </div>
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Sharing Our Knowledge
              </h2>
              <div>
                <p className="text-lg">
                  We are committed to sharing our understanding of code and the
                  internet with our readers, distilling our expertise into
                  practical, actionable insights. Our content includes deep
                  dives into programming techniques, best practices for web
                  development, and the latest innovations in internet
                  technologies.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_1_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_0_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Achieve Your Career Goals
              </h2>
              <div>
                <p className="text-lg">
                  In addition to educational content, our blogs are dedicated to
                  helping readers find their careers in technology. We provide
                  guidance on career paths, job search strategies, and
                  professional development, ensuring that our audience has the
                  resources they need to succeed in the tech industry.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const LargeDesktopView = () => {
    return (
      <div className="w-[60%] m-auto pb-12">
        <h1 className="text-6xl font-bold text-center my-14">
          About Our Careers
        </h1>

        <div>
          <section className="flex justify-between items-center mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Stayed Updated
              </h2>
              <div>
                <p className="text-lg">
                  Our blogs aim to share valuable information about code and the
                  internet, offering readers insights into the latest
                  developments in technology. We cover a wide range of topics,
                  from programming languages to web development trends, ensuring
                  our audience stays informed about the ever-evolving tech
                  landscape.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_3_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_2_career}
                alt="picture-0"
                className="h-[380px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Our Reader Grow & Learn
              </h2>
              <div>
                <p className="text-lg">
                  Our platform encourages knowledge sharing among our readers,
                  fostering a community where individuals can exchange ideas,
                  tips, and solutions related to code and internet technologies.
                  By creating a space for open dialogue, we aim to support
                  collective learning and problem-solving.
                </p>
              </div>
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Sharing Our Knowledge
              </h2>
              <div>
                <p className="text-lg">
                  We are committed to sharing our understanding of code and the
                  internet with our readers, distilling our expertise into
                  practical, actionable insights. Our content includes deep
                  dives into programming techniques, best practices for web
                  development, and the latest innovations in internet
                  technologies.
                </p>
              </div>
            </div>
            <div className="image-container w-[50%] ">
              <img
                src={Picture_1_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
          </section>

          <section className="flex justify-between items-center mb-8">
            <div className="image-container w-[50%] ">
              <img
                src={Picture_0_career}
                alt="picture-0"
                className="h-[350px] w-[100%] object-cover"
              />
            </div>
            <div className="text-container w-[45%] ">
              <h2 className="font-inter text-3xl font-medium mb-4">
                Help Achieve Your Career Goals
              </h2>
              <div>
                <p className="text-lg">
                  In addition to educational content, our blogs are dedicated to
                  helping readers find their careers in technology. We provide
                  guidance on career paths, job search strategies, and
                  professional development, ensuring that our audience has the
                  resources they need to succeed in the tech industry.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Career</title>
      </Helmet>
      {mobile && <MobileView />}
      {tablet && <TabletView />}
      {desktop && <DesktopView />}
      {largeDesktop && <LargeDesktopView />}
    </>
  );
};

export default Career_container;
