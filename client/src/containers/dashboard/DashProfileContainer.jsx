import React from "react";
import { useSelector } from "react-redux";
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
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashProfileContainer = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setDataForm({ ...dataForm, pictureProfile: downloadURL });
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
    if (Object.keys(dataForm).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        import.meta.env.VITE_API_BASE_URL +
          "/api/user/update-profile/" +
          currentUser.user._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }
      );

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        return dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
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
            src={`${imageFileUrl || currentUser.user.pictureProfile}`}
            alt=""
            className={`rounded-full h-32 w-32 p-1 ring-2 ring-gray-400 cursor-pointer ${
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
          {currentUser.user.username}
        </h1>
        <h2 className="text-center text-lg">{currentUser.user.email}</h2>
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
              placeholder={currentUser.user.username}
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
              placeholder={currentUser.user.email}
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
              class="bg-red-500 border
              border-gray-300 text-white text-[11pt] rounded-lg font-semibold
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashProfileContainer;
