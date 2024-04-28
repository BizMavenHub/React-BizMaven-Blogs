import React from "react";
import { google_icon } from "../../assets/index.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utilities/firebase.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user/userSlice.js";
import { useHistory } from "react-router-dom";

function Google_OAuth_btn() {
  const API_URL_BASE = import.meta.env.VITE_API_BASE_URL;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(API_URL_BASE + "/api/auth/login-with-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          google_photo_url: result.user.photoURL,
        }),
      });

      const data = await res.json();

      // if successful redirect to home
      if (res.ok) {
        dispatch(loginSuccess(data));
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0 text-[#6c40aa] hover:text-white text-base">
          <img
            src={google_icon}
            alt=""
            className="w-[30px] mr-2"
            onClick={handleGoogleLogin}
          />
          Sign in with Google
        </span>
      </button>
    </div>
  );
}

export default Google_OAuth_btn;
