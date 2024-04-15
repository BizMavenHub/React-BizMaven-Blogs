import React from "react";
import google_icon from "../../assets/google-icon.png";
import github_icon from "../../assets/github-icon.png";
import facebook_icon from "../../assets/facebook-icon.png";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";

import { useState } from "react";

function Login_page() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const [dataForm, setDataForm] = useState({});

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.email || !dataForm.password) {
      return dispatch(loginFailure("All fields are required"));
    }

    try {
      dispatch(loginStart());

      const res = await fetch("/api/auth/login-with-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        return dispatch(loginFailure(data.message));
      }

      if (data.message == "User not found") {
        return dispatch(loginFailure(data.message));
      }

      if (res.ok) {
        dispatch(loginSuccess(data));
        history.push("/");
        console.log("login success");
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-7xl text-white font-poppins font-semibold text-center pt-32 pb-20 mobile:pt-16 mobile:pb-16 mobile:text-4xl">
        Hello, Welcome Back!
      </h1>
      <div className="w-[500px] drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%]">
        <h1 className="text-4xl text-center font-bold mb-8">Login</h1>
        <form action="post" onSubmit={handleSubmit}>
          <div className="my-5">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="error-container">
            {errorMessage && (
              <p className="error-message text-center mt-4 text-xl text-red">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="mt-4 mobile:mt-4 ">
            {loading ? (
              <button
                className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold mobile:p-2"
                onSubmit={handleSubmit}
                disabled={loading}
              >
                Loading...
              </button>
            ) : (
              <button
                className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold mobile:p-2"
                onSubmit={handleSubmit}
              >
                Login
              </button>
            )}
          </div>
        </form>
        <hr className="my-6" />
        <div className="other_options flex justify-around w-full m-auto items-center mt-4">
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg mobile:px-6">
              <img src={google_icon} alt="" className="w-[30px]" />
            </button>
          </div>
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-2.5 px-12 rounded-lg mobile:px-6">
              <img src={github_icon} alt="" className="w-[32px]" />
            </button>
          </div>
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg mobile:px-6">
              <img src={facebook_icon} alt="" className="w-[30px]" />
            </button>
          </div>
        </div>
        <div className="already_have_account mt-4">
          <p className=" text-center text-lg">
            Don't have an account?{" "}
            <a href="/sign-up" className=" text-content-bg">
              Get Started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login_page;
