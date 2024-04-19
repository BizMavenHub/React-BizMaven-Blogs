import React from "react";
import { google_icon } from "../../assets/index.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utilities/firebase.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user/userSlice.js";
import { useHistory } from "react-router-dom";

function Google_OAuth_btn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/login-with-google", {
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

      console.log(res);

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
      <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg mobile:px-6">
        <img
          src={google_icon}
          alt=""
          className="w-[30px]"
          onClick={handleGoogleLogin}
        />
      </button>
    </div>
  );
}

export default Google_OAuth_btn;
