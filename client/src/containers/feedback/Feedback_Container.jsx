import React, { useState } from "react";

const Feedback_Container = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message === "" || !message) {
      return alert("Please enter a message");
    } else {
      alert("Thank you for your feedback!");
      setMessage("");
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-24 w-screen h-screen bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div className="mb-8">
              <h1 className="text-indigo-500 font-bold text-[64pt] text-center">
                Send Us A Message
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-2 mt-4">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Username"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="mt-4">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="my-4">
              <textarea
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="my-3 w-1/2 lg:w-1/4 m-auto">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Drop in our office
              </h1>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                tincidunt arcu diam, eu feugiat felis fermentum id. Curabitur
                vitae nibh viverra, auctor turpis sed, scelerisque ex.
              </p>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-map-marker-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Main Office</h2>
                  <p className="text-gray-400">
                    5555 Tailwind RD, Pleasant Grove, UT 73533
                  </p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Call Us</h2>
                  <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                  <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/ENLIGHTENEERING/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-facebook-f text-blue-900" />
                </a>
                <a
                  href="https://www.linkedin.com/company/enlighteneering-inc-"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-linkedin-in text-blue-900" />
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <div className="text-container text-black text-2xl tracking-wide mobile:text-lg">
        <section>
          <p>
            Feedback—it's a simple word with profound implications. In the realm
            of blogging, it serves as the lifeblood of growth, improvement, and
            community engagement. As we launch our new Feedback page, we're
            excited to emphasize the importance of this two-way dialogue between
            creators and readers. Here's why feedback matters and how it plays a
            pivotal role in shaping the future of our blog.
          </p>
        </section>
        <br />
        <section>
          <p>
            First and foremost, feedback fosters a sense of belonging and
            ownership within our community. By actively soliciting input from
            our readers, we acknowledge their invaluable role as stakeholders in
            the content we produce. Whether it's through comments, surveys, or
            direct messages, every piece of feedback is a testament to the
            shared passion and commitment that binds us together.
          </p>
        </section>
        <br />
        <section>
          <p>
            Moreover, feedback serves as a compass, guiding us towards areas of
            improvement and innovation. Constructive criticism highlights blind
            spots, challenges assumptions, and encourages us to push the
            boundaries of creativity and relevance. Embracing feedback isn't a
            sign of weakness—it's a testament to our willingness to evolve,
            adapt, and strive for excellence in everything we do.
          </p>
        </section>
        <br />
        <section>
          <p>
            Additionally, feedback cultivates trust and credibility within our
            community. When readers feel heard and valued, they're more likely
            to engage with our content, share their perspectives, and recommend
            our blog to others. In turn, this organic growth strengthens our
            reputation as a trusted source of information and inspiration in an
            increasingly crowded digital landscape.
          </p>
        </section>
        <br />
        <section>
          <p>
            But perhaps most importantly, feedback humanizes the blogging
            experience, transforming it from a one-way monologue into a dynamic
            conversation. Behind every comment, suggestion, or critique is a
            real person with unique experiences, perspectives, and emotions. By
            actively listening and responding to feedback, we demonstrate our
            respect for the diverse voices that enrich our community.
          </p>
        </section>
        <br />
        <section>
          <p>
            As we launch our Feedback page, we invite you to join us in this
            journey of collaboration and co-creation. Your insights, ideas, and
            observations are invaluable to us, and we're committed to leveraging
            them to make our blog the best it can be. Together, let's harness
            the power of feedback to build a vibrant, inclusive, and thriving
            community—one comment at a time. Thank you for being a part of our
            story.
          </p>
        </section>
      </div>
      <div className="write-feedback-container">
        <h1 className="text-center text-4xl font-semibold text-navbar-text my-12">
          Write Feedback Here
        </h1>
        <div className="input-container flex flex-col justify-center items-center">
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-[80%] p-4 border-[1.5px] rounded-md border-solid tablet:w-[70%] mobile:w-[90%] mobile:h-[200px]"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="text-white bg-navbar-bg p-2 my-8 w-[20%] font-medium rounded-lg tablet:w-[30%] mobile:w-[45%]"
          >
            Submit
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Feedback_Container;
