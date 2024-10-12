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

  const desktop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1919px)",
  });

  const largeDesktop = useMediaQuery({
    query: "(min-width: 1920px)",
  });

  const API_URL_BASE = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const [dataForm, setDataForm] = useState({});

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
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
        body: JSON.stringify({
          email: dataForm.email,
          password: dataForm.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        const errorMessage = data.message || "Login failed";
        return dispatch(loginFailure(errorMessage));
      }

      if (data.message == "User not found") {
        return dispatch(loginFailure(data.message));
      }

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

      <div className="w-full">
        {mobile && (
          <>
            <div className="min-h-[60vh] py-12">
              <h1 className="text-center text-indigo-500 font-bold text-[34pt] pb-6">
                Login
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="">
                  <input
                    type="email"
                    name="email"
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
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Error Container */}
                <div className="error-container">
                  {errorMessage && (
                    <p className="error-message text-center mt-4 text-lg text-red-500 font-bold">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Submit Container */}
                <div className="mt-4 mobile:mt-4 ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-700 font-semibold">
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}

        {tablet && (
          <>
            <div className="min-h-[65vh] w-[55%] m-auto py-28">
              <h1 className="text-center text-indigo-500 font-bold text-[42pt] pb-10">
                Login
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="">
                  <input
                    type="email"
                    name="email"
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
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Error Container */}
                <div className="error-container">
                  {errorMessage && (
                    <p className="error-message text-center mt-4 text-lg text-red-500 font-bold">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Submit Container */}
                <div className="mt-4 mobile:mt-4 ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-700 font-semibold">
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}

        {desktop && (
          <>
            <div className="h-[75vh] py-20 w-[32%] m-auto">
              <h1 className="text-center text-indigo-500 font-bold text-[34pt] pb-6">
                Login
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="">
                  <input
                    type="email"
                    name="email"
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
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Error Container */}
                <div className="error-container">
                  {errorMessage && (
                    <p className="error-message text-center mt-4 text-lg text-red-500 font-bold">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Submit Container */}
                <div className="mt-4 mobile:mt-4 ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-700 font-semibold">
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}

        {largeDesktop && (
          <>
            <div className="h-[80vh] py-20 w-[25%] m-auto">
              <h1 className="text-center text-indigo-500 font-bold text-[48pt] pb-12">
                Login
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="">
                  <input
                    type="email"
                    name="email"
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
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="px-2 text-content-bg font-medium"
                      onClick={showPassword}
                    >
                      <svg
                        className="w-7 h-7 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-width="2"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Error Container */}
                <div className="error-container">
                  {errorMessage && (
                    <p className="error-message text-center mt-4 text-lg text-red-500 font-bold">
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Submit Container */}
                <div className="mt-4 mobile:mt-4 ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-blue-700 font-semibold">
                  Get Started
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login_page;
