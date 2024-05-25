import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utilities/firebase";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashProfileContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataForm, setDataForm] = useState({});
  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Couldn't upload image file (File must be less than 2 MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setDataForm({ ...dataForm, pictureProfile: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateUserSuccess(null);
    setImageFileUploadError(null);

    if (Object.keys(dataForm).length === 0) {
      setUpdateUserError("No changes were made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait while image is being uploaded");
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/user/update-profile/" +
          currentUser._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
          body: JSON.stringify(dataForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        document.getElementById("default-input").value = "";
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/user/delete-user/" +
          currentUser._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess());
        navigate("/login");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="w-[60%] m-auto">
      <div className=" mt-14">
        <h1 className="text-center text-4xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Profile
        </h1>
        <div
          className="flex justify-center my-4"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            ref={filePickerRef}
            className="hidden"
          />

          <img
            src={imageFileUrl || currentUser.pictureProfile}
            alt=""
            className={`rounded-full h-32 w-32 p-1 ring-2 ring-gray-400 cursor-pointer object-contain ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-100"
            }`}
          />
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "8rem",
                  height: "8rem",
                  position: "absolute",
                  display: "flex",
                },
                path: { stroke: "blue" },
              }}
              className={`${imageFileUploadProgress >= 100 && "opacity-0"}`}
            />
          )}
        </div>

        {/* Check for errors */}
        {imageFileUploadError && (
          <p className="text-red-500 text-center">{imageFileUploadError}</p>
        )}
        {imageFileUploadProgress && imageFileUploadProgress >= 100 && (
          <p className="text-green-500 text-center">Image uploaded</p>
        )}

        <h1 className="text-center text-3xl mb-2 font-lato">
          {currentUser.username}
        </h1>
        <h2 className="text-center text-lg">{currentUser.email}</h2>
      </div>
      <div className="mt-20">
        <h1 className="text-center text-2xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="w-[40%] m-auto mt-2">
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              name="username"
              placeholder={currentUser.username}
              onChange={handleChange}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              name="email"
              placeholder={currentUser.email}
              onChange={handleChange}
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="text"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mt-6">
            <button
              type="submit"
              id="default-input"
              class="bg-indigo-500 border
              border-gray-300 text-white text-[11pt] rounded-lg font-semibold
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 
              "
            >
              Update
            </button>
          </div>
        </form>

        {updateUserSuccess && (
          <div className="display-success bg-green-200 w-[40%] m-auto p-4 rounded-lg mt-4">
            <p className="text-green-500 text-center font-medium">
              {updateUserSuccess}
            </p>
          </div>
        )}

        {updateUserError && (
          <div className="display-success bg-red-200 w-[40%] m-auto p-4 rounded-lg mt-4">
            <p className="text-red-500 text-center font-medium">
              {updateUserError}
            </p>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-center text-xl tracking-wide text-indigo-500 font-montserrat font-semibold mt-16">
          Delete Account
        </h1>
        <div className="w-[40%] m-auto mt-2">
          <div className="mt-4">
            <button
              type="submit"
              id="default-input"
              className="bg-red-500 border
              border-gray-300 text-white text-[11pt] rounded-lg font-semibold
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 
              "
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="absolute top-[50%] left-[44.5%] bg-slate-200 p-4 w-[450px] rounded-lg">
          <div className="flex justify-center">
            <svg
              className="w-[60px] h-[60px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="red"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <h1 className="text-center text-xl tracking-wide text-red-500 font-montserrat font-semibold mt-4">
            Are you sure you want to delete your account?
          </h1>
          <div className="options flex justify-between mt-10">
            <div>
              <button
                className="delete bg-red-500 text-white font-semibold rounded-lg w-[150px] h-[50px]"
                onClick={handleDelete}
              >
                Yes, I'm sure
              </button>
            </div>
            <div>
              <button
                className="close border-2 border-red-500 text-red-500 font-semibold rounded-lg w-[150px] h-[50px]"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashProfileContainer;
