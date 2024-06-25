import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import {
  Picture_0_about_us,
  Picture_1_about_us,
  Picture_2_about_us,
} from "../../assets";

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
        <div className="px-4 w-[60%] m-auto">
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
      {mobile && <MobileView />}

      {tablet && <TabletView />}

      {desktop && <DesktopView />}

      {largeDesktop && <LargeDesktopView />}

      {/* <div className="about_us_container desktop:w-[1300px] w-[90%] m-auto">
        <h1 className="text-6xl text-center font-semibold my-12 text-blue-500">
          About Us
        </h1>
        <div className="paragraph_container text-black de mobile:text-lg">
          <section className="mb-4 tracking-wide">
            In the boundless expanse of the digital landscape, our blog stands
            as a beacon of exploration, a sanctuary for the curious soul. Here,
            amidst the infinite possibilities of the internet, we invite you to
            embark on a journey of discovery unlike any other. Our team of
            dedicated writers, each a seeker of knowledge and purveyor of
            insight, comes together to curate a tapestry of words that inspire,
            provoke, and enlighten. With every article, we aim to create an
            oasis of thought where ideas flow freely and imaginations take
            flight.
          </section>
          <section className="mb-4 tracking-wide">
            At the heart of our blog lies a deep reverence for the pursuit of
            understanding in all its forms. From the intricate complexities of
            quantum mechanics to the timeless beauty of classical literature, we
            traverse the diverse landscapes of human knowledge with boundless
            enthusiasm. Our articles serve as guideposts along this intellectual
            odyssey, offering insights, analyses, and perspectives that
            illuminate the world around us.
          </section>
          <section className="mb-4 tracking-wide">
            But our blog is more than just a repository of information; it is a
            community—a gathering place for minds eager to engage in meaningful
            discourse. Through comments, discussions, and shared experiences, we
            foster connections that transcend geographical boundaries and
            cultural divides. Here, diversity is celebrated, and every voice has
            the power to shape the conversation.
          </section>
          <section className="mb-4 tracking-wide">
            So, whether you're a seasoned scholar or a curious newcomer, we
            extend a warm invitation to join us on this journey of discovery.
            Together, let us explore the depths of human knowledge, revel in the
            beauty of human creativity, and chart a course towards a future
            filled with wonder and possibility. Welcome to our blog—where the
            adventure begins.
          </section>
          <section className="mb-4 tracking-wide">
            Step into our digital realm and immerse yourself in a kaleidoscope
            of topics that span the spectrum of human experience. Dive into the
            latest scientific breakthroughs that redefine our understanding of
            the universe, or lose yourself in the intricacies of historical
            events that have shaped the course of civilization. Wander through
            the corridors of art galleries, where masterpieces whisper tales of
            beauty and emotion, or embark on culinary escapades that tantalize
            the taste buds and ignite the senses. From practical tips for
            everyday life to philosophical musings on the nature of existence,
            our blog offers a smorgasbord of content designed to both inform and
            inspire.
          </section>
          <section className="mb-4 tracking-wide">
            But beyond the mere dissemination of information, our blog is a
            platform for voices to be heard, stories to be shared, and
            perspectives to be explored. We believe in the power of storytelling
            to bridge gaps, foster empathy, and spark meaningful dialogue.
            Through the lens of personal narratives, we aim to shed light on the
            universal truths that connect us all, transcending barriers of
            culture, language, and ideology.
          </section>
          <section className="mb-4 tracking-wide">
            So, whether you're seeking enlightenment, entertainment, or simply a
            moment of respite from the chaos of everyday life, we invite you to
            make yourself at home in our digital sanctuary. Join us as we embark
            on a never-ending quest for knowledge, understanding, and
            connection. Together, let us unravel the mysteries of the universe
            and celebrate the rich tapestry of human experience that binds us
            all. Welcome to our blog—where the journey never ends, and every
            discovery is a cause for celebration.
          </section>
          <section className="mb-16 tracking-wide">
            In conclusion, our blog is more than just a collection of
            articles—it's a living, breathing ecosystem of ideas, stories, and
            connections. It's a testament to the power of human curiosity and
            the boundless potential of the digital age. As we navigate the
            ever-expanding landscape of knowledge and discourse, we invite you
            to join us in this ongoing exploration. Together, let's embrace the
            adventure, celebrate the diversity of human experience, and continue
            to seek out the truths that unite us all. Thank you for being a part
            of our journey.
          </section>
        </div>
      </div> */}
    </>
  );
}

export default About_us_Container;
