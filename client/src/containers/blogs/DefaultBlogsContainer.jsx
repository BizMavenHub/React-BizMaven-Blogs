import React from "react";
import { BlogCard, BlogCard_1 } from "../../components";

const DefaultBlogsContainer = () => {
  let blogCard = [];
  let blogCard_1 = [];

  for (let i = 0; i < 10; i++) {
    blogCard.push(
      <BlogCard
        img="https://beebom.com/wp-content/uploads/2024/04/cillian-murphy-peaky-blinders.jpg?resize=300%2C180&quality=75&strip=all"
        title="Noteworthy technology acquisitions 2021"
        desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
      />
    );
  }

  for (let i = 0; i < 9; i++) {
    blogCard_1.push(
      <BlogCard_1
        img="https://beebom.com/wp-content/uploads/2024/04/cillian-murphy-peaky-blinders.jpg?resize=300%2C180&quality=75&strip=all"
        title="Noteworthy technology acquisitions 2021"
        desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
      />
    );
  }

  return (
    <div className="blogs-container my-12">
      <h1 className="mb-12 text-6xl text-center  leading-none tracking-tight text-indigo-600 md:text-5xl lg:text-6xl">
        Our Blogs For You
      </h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recommend Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-3 gap-6">
          {blogCard_1}
        </div>
      </section>

      <hr className="mb-8" />

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Latest Blogs Published On Our Website
        </h2>
        <div className="card-container grid grid-cols-2 gap-6 my-6">
          {blogCard}
        </div>
      </section>
    </div>
  );
};

export default DefaultBlogsContainer;
