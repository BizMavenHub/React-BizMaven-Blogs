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

const DashProfileContainer = () => {
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateProfile = () => {};

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  console.log(imageFileUploadProgress, imageFileUploadError);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="w-[60%] m-auto">
      <div className=" mt-14">
        <h1 className="text-center text-4xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Profile
        </h1>
        <div className="flex justify-center my-4">
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
            className={`rounded-full h-32 w-32 p-1 ring-2 ring-gray-400 cursor-pointer`}
            onClick={() => {
              filePickerRef.current.click();
            }}
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
            />
          )}
        </div>
        <h1 className="text-center text-3xl mb-2 font-lato">
          {currentUser.username}
        </h1>
        <h2 className="text-center text-lg">{currentUser.email}</h2>
      </div>
      <div className="mt-20">
        <h1 className="text-center text-2xl tracking-wide text-indigo-500 font-montserrat font-semibold">
          Update Profile
        </h1>
        <div className="w-[40%] m-auto mt-2">
          <div class="mb-3">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              placeholder={currentUser.username}
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
              placeholder={currentUser.email}
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
        </div>
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
