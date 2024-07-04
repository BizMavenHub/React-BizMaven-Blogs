import React from "react";

import { Google_OAuth_btn } from "../../components/index";

import { Link, useNavigate } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import { useDispatch, useSelector } from "react-redux";

import { Helmet } from "react-helmet";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/user/userSlice";

import { useState } from "react";

function Login_page() {
  const mobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width: 767px)",
  });

  const tablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });

  const API_URL_BASE = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    if (dataForm.email && dataForm.password) {
      dispatch(loginFailure(false));
    }

    try {
      dispatch(loginStart());

      const res = await fetch(API_URL_BASE + "/api/auth/login-with-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify(dataForm),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        const errorMessage = data.message || "Login failed";
        return dispatch(loginFailure(errorMessage));
      }

      if (data.message == "User not found") {
        return dispatch(loginFailure(data.message));
      }

      console.log(res.ok);

      if (res.ok) {
        console.log("Login successful");
        dispatch(loginSuccess(data));
        navigate("/blogs");
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  const [showPass, setShowPass] = useState(false);

  const showPassword = (e) => {
    e.preventDefault();
    const password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
      setShowPass(true);
    } else {
      password.type = "password";
      setShowPass(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Insight Loop</title>
      </Helmet>
      <div className="h-full desktop:h-[100vh] largeDesktop:h-[100vh] mt-8 shadow-md mobile:mt-28 mobile:mb-32 tablet:my-28">
        {mobile ? null : (
          <h1 className="text-indigo-500 font-bold text-[64pt] text-center pt-16 pb-20 mobile:pt-16 mobile:pb-16 mobile:text-4xl tablet:pt-4">
            Welcome Back!
          </h1>
        )}
        <div className="w-[500px] drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%]">
          <h1 className="text-5xl text-center font-bold mb-12 text-gray-800 mobile:text-indigo-500">
            Login
          </h1>
          <form action="POST">
            <div className="my-5">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                placeholder="Email"
                value={dataForm.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-5 flex">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                placeholder="Password"
                value={dataForm.password}
                onChange={handleChange}
              />
              {showPass ? (
                <button
                  className="w-[80px] px-2 text-content-bg font-medium"
                  onClick={showPassword}
                >
                  Hide
                </button>
              ) : (
                <button
                  className="w-[80px] px-2 text-content-bg font-medium"
                  onClick={showPassword}
                >
                  Show
                </button>
              )}
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
                  className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-8 text-center mobile:p-2"
                  disabled={loading}
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center mobile:p-2"
                >
                  Login
                </button>
              )}
            </div>
          </form>
          <hr className="my-6" />
          <div className="other_options flex justify-around w-full m-auto items-center mt-4">
            <div className="oauth-google-btn-container">
              <Google_OAuth_btn />
            </div>
          </div>
          <div className="already_have_account mt-4">
            <p className=" text-center text-lg mobile:text-[12pt]">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className=" text-content-bg hover:underline hover:underline-offset-2 text-blue-600"
              >
                Get Started
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_page;
