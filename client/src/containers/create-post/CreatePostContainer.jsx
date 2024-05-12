import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";

import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "react-quill/dist/quill.snow.css";

const CreatePostContainer = () => {
  return (
    <div className="w-[1000px] h-auto p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 m-auto">
      <h1 className="text-6xl font-bold text-center my-12">Create Post</h1>
      <div className="flex my-8 gap-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="Category">Select a categories</option>
          <option value="Art">Art</option>
          <option value="Books">Books</option>
          <option value="Business">Business</option>
          <option value="Code">Code</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Fashion">Fashion</option>
          <option value="Food">Food</option>
          <option value="Gaming">Gaming</option>
          <option value="Health">Health</option>
          <option value="Movie">Movie</option>
          <option value="Music">Music</option>
          <option value="Pets">Pets</option>
          <option value="Science">Science</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <form>
        <div className="">
          <ReactQuill
            className="h-72 mb-16"
            theme="snow"
            placeholder="Write something..."
            modules={{
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],

                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["code-block"],
                  ["clean"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                ],
              },
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
              "code-block",
              "color",
              "background",
              "align",
            ]}
          />
        </div>
        <button
          type="submit"
          className=" w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Publish post
        </button>
      </form>
    </div>
  );
};

export default CreatePostContainer;
