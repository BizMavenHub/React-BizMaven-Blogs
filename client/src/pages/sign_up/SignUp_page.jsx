import React from "react";
import { useState } from "react";
import { Google_OAuth_btn } from "../../components/index";

import { useNavigate, Link } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

import { Helmet } from "react-helmet";

function SignUp_page() {
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

  const navigate = useNavigate();

  const API_URL_BASE = import.meta.env.VITE_API_BASE_URL;

  const [dataForm, setDataForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.username || !dataForm.email || !dataForm.password) {
      return setErrorMessage("All fields are required");
    }

    if (dataForm.password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters long");
    }

    if (dataForm.password !== dataForm.confirmed_password) {
      return setErrorMessage("Passwords do not match");
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChars.test(dataForm.password)) {
      return setErrorMessage("Password must not contain special characters");
    }

    if (!dataForm.email.includes("@")) {
      return setErrorMessage("Invalid email address");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch(API_URL_BASE + "/api/auth/register-with-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (data.message == "Email already exists") {
        return setErrorMessage(data.message);
      }

      setDataForm({});

      setLoading(false);

      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const [showPass, setShowPass] = useState(false);

  const showPassword = (e) => {
    e.preventDefault();
    const password = document.getElementById("password");
    const confirmedPassword = document.getElementById("confirmed_password");

    if (password.type === "password" || confirmedPassword.type === "password") {
      password.type = "text";
      confirmedPassword.type = "text";
      setShowPass(true);
    } else {
      password.type = "password";
      confirmedPassword.type = "password";
      setShowPass(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Insight Loop | Sign Up</title>
      </Helmet>
      <div className="w-full">
        {mobile && (
          <>
            <div className="h-[86vh] py-12">
              <h1 className="text-center text-indigo-500 font-bold text-[30pt] pb-6">
                Get Started
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="my-5">
                  <input
                    type="text"
                    name="username"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Username"
                    value={dataForm.username}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="my-5">
                  <input
                    type="password"
                    name="confirmed_password"
                    id="confirmed_password"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Password again"
                    onChange={handleChange}
                  />
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
                <div className="mt-4   ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="password-requirement my-6 mx-4">
                <h1 className="text-xl my-3 mx-4 font-semibold text-blue-700">
                  Please use at least:
                </h1>
                <ul className="list-none font-lato font-semibold">
                  <li className="ml-8 mb-2 list-disc">6 characters</li>
                  <li className="ml-8 mb-2 list-disc">1 number</li>
                  <li className="ml-8 mb-2 list-disc">1 special character</li>
                </ul>
              </div>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Have an account?{" "}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}

        {tablet && (
          <>
            <div className="min-h-[68vh]  py-12 w-[55%] m-auto">
              <h1 className="text-center text-indigo-500 font-bold text-[30pt] pb-6">
                Get Started
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="my-5">
                  <input
                    type="text"
                    name="username"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Username"
                    value={dataForm.username}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="my-5">
                  <input
                    type="password"
                    name="confirmed_password"
                    id="confirmed_password"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Password again"
                    onChange={handleChange}
                  />
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
                <div className="mt-4   ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="password-requirement my-6 mx-4">
                <h1 className="text-xl my-3 mx-4 font-semibold text-blue-700">
                  Please use at least:
                </h1>
                <ul className="list-none font-lato font-semibold">
                  <li className="ml-8 mb-2 list-disc">6 characters</li>
                  <li className="ml-8 mb-2 list-disc">1 number</li>
                  <li className="ml-8 mb-2 list-disc">1 special character</li>
                </ul>
              </div>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Have an account?{" "}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}

        {desktop && (
          <>
            <div className="min-h-[60vh] w-[35%] py-12 m-auto">
              <h1 className="text-center text-indigo-500 font-bold text-[30pt] pb-6">
                Get Started
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="my-5">
                  <input
                    type="text"
                    name="username"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Username"
                    value={dataForm.username}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="my-5">
                  <input
                    type="password"
                    name="confirmed_password"
                    id="confirmed_password"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Password again"
                    onChange={handleChange}
                  />
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
                <div className="mt-4   ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="password-requirement my-6 mx-4">
                <h1 className="text-xl my-3 mx-4 font-semibold text-blue-700">
                  Please use at least:
                </h1>
                <ul className="list-none font-lato font-semibold">
                  <li className="ml-8 mb-2 list-disc">6 characters</li>
                  <li className="ml-8 mb-2 list-disc">1 number</li>
                  <li className="ml-8 mb-2 list-disc">1 special character</li>
                </ul>
              </div>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Have an account?{" "}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}

        {largeDesktop && (
          <>
            <div className="min-h-[60vh] w-[25%] py-12 m-auto">
              <h1 className="text-center text-indigo-500 font-bold text-[30pt] pb-6">
                Get Started
              </h1>

              {/* Form Container */}
              <form action="post" className="w-[90%] m-auto">
                {/* Input Container */}
                <div className="my-5">
                  <input
                    type="text"
                    name="username"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Username"
                    value={dataForm.username}
                    onChange={handleChange}
                  />
                </div>
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
                <div className="my-5">
                  <input
                    type="password"
                    name="confirmed_password"
                    id="confirmed_password"
                    className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                    placeholder="Password again"
                    onChange={handleChange}
                  />
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
                <div className="mt-4   ">
                  <button
                    className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="password-requirement my-6 mx-4">
                <h1 className="text-xl my-3 mx-4 font-semibold text-blue-700">
                  Please use at least:
                </h1>
                <ul className="list-none font-lato font-semibold">
                  <li className="ml-8 mb-2 list-disc">6 characters</li>
                  <li className="ml-8 mb-2 list-disc">1 number</li>
                  <li className="ml-8 mb-2 list-disc">1 special character</li>
                </ul>
              </div>

              {/* Oauth Google Container */}
              <div className="text-center mt-8">
                <Google_OAuth_btn />
              </div>

              <hr className="my-4" />

              {/* No Account Container */}
              <div className="text-center mt-4">
                <p className="mt-4 text-lg font-medium"></p>
                Have an account?{" "}
                <Link to="/login" className="text-blue-700 font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SignUp_page;
