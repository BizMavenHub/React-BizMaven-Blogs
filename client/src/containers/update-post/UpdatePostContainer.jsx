import React from "react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";

import { PreviewComponent } from "../../components";

import { Helmet } from "react-helmet-async";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utilities/firebase";

import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import "quill-image-uploader/dist/quill.imageUploader.min.css";
import "react-quill/dist/quill.snow.css";

import "react-circular-progressbar/dist/styles.css";

const UpdatePostContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { postId } = useParams();

  const [file, setFile] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const [publishError, setPublishError] = useState(null);

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (currentUser.isAdmin) {
      handleGetPostInfo();
    }
  }, [postId]);

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
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.keys(dataForm).length === 0) {
        return setPublishError("No changes were made");
      }

      if (imageUploadProgress) {
        return setPublishError("Please wait while image is being uploaded");
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/post/update-post/${postId}/${
          currentUser._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(dataForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setPublishError(data.message);
      }

      if (data.success === false) {
        return setPublishError(data.message);
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  const handleGetPostInfo = async () => {
    const API_URL = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/post/get-post?postId=${postId}`;
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
      }

      setDataForm(data.posts[0]);
    } catch (error) {
      setPublishError(error.message);
    }
  };

  const handleShowPreview = (e) => {
    e.preventDefault();
    if (showPreview) {
      setShowPreview(false);
    } else {
      setShowPreview(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Update Post</title>
      </Helmet>
      <div className="w-[1000px] h-auto p-8 my-4 m-auto">
        <h1 className="text-6xl font-bold text-center my-12">Update Post</h1>
        <div className="flex my-8 gap-3">
          <input
            onChange={(e) =>
              setDataForm({ ...dataForm, title: e.target.value })
            }
            value={dataForm.title}
            type="text"
            placeholder="Title"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <select
            onChange={(e) =>
              setDataForm({ ...dataForm, category: e.target.value })
            }
            value={dataForm.category || "uncategorized"}
            className="w-[30%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="uncategory">Select a categories</option>
            <option value="art">Art</option>
            <option value="books">Books</option>
            <option value="business">Business</option>
            <option value="code">Code</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="gaming">Gaming</option>
            <option value="health">Health</option>
            <option value="movie">Movie</option>
            <option value="music">Music</option>
            <option value="pets">Pets</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex my-8 gap-3">
          <textarea
            onChange={(e) =>
              setDataForm({ ...dataForm, keywords: e.target.value })
            }
            value={dataForm.keywords}
            placeholder="Keywords (comma separated)"
            className="w-full h-[250px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
              disabled={imageUploadProgress !== null}
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

        <form onSubmit={handleSubmit}>
          <div className="my-12">
            <div className="w-full flex justify-end">
              {!showPreview ? (
                <button
                  className="text-blue-500  hover:text-blue-700 font-bold px-2 py-2 rounded-lg"
                  onClick={handleShowPreview}
                >
                  Preview
                </button>
              ) : (
                <button
                  className="text-blue-500  hover:text-blue-700 font-bold px-2 py-2 rounded-lg"
                  onClick={handleShowPreview}
                >
                  Edit
                </button>
              )}
            </div>
            <div>
              {showPreview ? (
                <PreviewComponent content={dataForm.content} />
              ) : (
                <ReactQuill
                  className="h-[500px]"
                  theme="snow"
                  placeholder="Write something..."
                  value={dataForm.content}
                  onChange={(value) =>
                    setDataForm({ ...dataForm, content: value })
                  }
                  modules={{
                    toolbar: {
                      container: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],

                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],

                        ["code-block"],
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
                    "list",
                    "bullet",
                    "link",
                    "image",
                    "code-block",

                    "code",
                  ]}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center *:">
            <button className="my-8 w-4/12 px-5 py-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Edit Post
            </button>
          </div>

          {publishError ? (
            <div className="publish-error-container my-4 rounded-xl">
              <p className="publish-error-message p-4 bg-red-300 text-sm text-red-700 font-semibold">
                {publishError}
              </p>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default UpdatePostContainer;
