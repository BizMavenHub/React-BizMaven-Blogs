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
    <div className="w-[85%] text-lg m-auto font-montserrats">
      <h1 className="text-center text-6xl font-semibold text-navbar-text my-12">
        Feedback
      </h1>
      <div className="text-container text-white font-medium">
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
            className="w-[80%] p-4 border-[1.5px] rounded-md border-solid tablet:w-[70%] mobile:w-[90%]"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="text-white bg-navbar-bg p-2 my-8 w-[20%] font-medium rounded-lg tablet:w-[30%] mobile:w-[45%]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback_Container;
