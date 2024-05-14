import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utilities/firebase";

import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "react-quill/dist/quill.snow.css";

import "react-circular-progressbar/dist/styles.css";

import "./style.css";

const CreatePostContainer = () => {
  const [file, setFile] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        return setImageUploadError("Please select an image file");
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(
            "Couldn't upload image file (File must be less than 2 MB)"
          );
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setDataForm({ ...dataForm, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Upload failed");
    }
  };

  return (
    <div className="w-[1000px] h-auto p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 m-auto">
      <h1 className="text-6xl font-bold text-center my-12">Create Post</h1>
      <div className="flex my-8 gap-3">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setDataForm({ ...dataForm, title: e.target.value })}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <select
          onChange={(e) =>
            setDataForm({ ...dataForm, category: e.target.value })
          }
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
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
      <div className="flex justify-center items-center border border-dashed border-gray-700 p-4 gap-3 rounded-lg">
        <div className="w-full">
          <input
            className=" block  w-full text-lg py-3 text-gray-700 focus:outline-none"
            id="large_size"
            type="file"
            accept="image/*"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="upload-image-btn">
          <button
            className="bg-blue-500 w-[150px] h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            type="button"
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress ? (
              <p className="upload-progress">{imageUploadProgress}%</p>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
      </div>
      <div className="error-container my-4 rounded-lg">
        {imageUploadError && (
          <p className="error-message p-4 bg-red-300 text-sm text-red-700 font-semibold">
            {imageUploadError}
          </p>
        )}
      </div>

      {dataForm.image && (
        <div className="flex justify-center">
          <img
            src={dataForm.image}
            className=" aspect-1/1 h-[280px] object-fill rounded-lg"
          />
        </div>
      )}

      <form>
        <div className="my-12">
          <ReactQuill
            className="h-[500px]"
            theme="snow"
            placeholder="Write something..."
            onChange={(value) => setDataForm({ ...dataForm, content: value })}
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
              "clean",
              "code",
            ]}
          />
        </div>

        <div className="flex justify-center *:">
          <button
            type="submit"
            className="my-8 w-4/12 px-5 py-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostContainer;
