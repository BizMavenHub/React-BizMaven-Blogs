import React from "react";

import { Helmet } from "react-helmet-async";

const Contact_Container_ = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="Contact_Container_ desktop:w-[1300px] w-[90%] m-auto">
        <h1 className="text-6xl text-center font-semibold my-12 text-blue-500">
          Contact us
        </h1>
        <div className="paragraph_container text-black mb-20 text-xl tracking-wide mobile:text-lg ">
          <section className="mb-4 tracking-wide">
            In the digital age, where virtual interactions often dominate our
            daily lives, the importance of genuine connections cannot be
            overstated. As we introduce our Contact page, we're excited to
            bridge the gap between the digital realm and the tangible world,
            inviting our readers to engage with us in meaningful ways beyond the
            confines of the screen.
          </section>
          <section className="mb-4 tracking-wide">
            Our Contact page serves as a gateway to a multitude of
            possibilities, offering a direct line of communication between our
            readers and the creators behind the content. Whether you have
            questions, suggestions, or simply want to say hello, this page is
            your portal to reach out and connect with us on a personal level.
          </section>
          <section className="mb-4 tracking-wide">
            One of the key features of our Contact page is the contact form, a
            user-friendly interface designed to streamline the communication
            process. Simply fill out the required fields, hit send, and your
            message will be delivered straight to our inbox. Whether you're a
            first-time visitor or a longtime reader, we welcome your feedback,
            inquiries, and thoughts with open arms.
          </section>
          <section className="mb-4 tracking-wide">
            In addition to the contact form, our Contact page also provides
            alternative methods of communication, including email addresses,
            social media handles, and even physical mailing addresses. We
            understand that everyone has their preferred mode of communication,
            and we're committed to accommodating diverse preferences to ensure
            that every voice is heard.
          </section>
          <section className="mb-4 tracking-wide">
            But our Contact page is more than just a means of communication—it's
            a symbol of our commitment to fostering genuine connections and
            building a vibrant community. Beyond the exchange of information, we
            see each interaction as an opportunity to forge meaningful
            relationships, cultivate trust, and enrich the collective experience
            of our readership.
          </section>
          <section className="mb-4 tracking-wide">
            As we unveil our Contact page, we invite you to take full advantage
            of this opportunity to connect with us. Whether you have a burning
            question, a brilliant idea, or simply want to share your thoughts,
            we're here to listen, engage, and connect with you on a deeper
            level. Together, let's embark on a journey of discovery, dialogue,
            and mutual respect. Thank you for being a part of our community—we
            look forward to hearing from you soon.
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact_Container_;
