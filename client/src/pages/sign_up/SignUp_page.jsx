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
      <div className="min-h-[100vh] my-12 mobile:my-2 tablet:my-4">
        <h1 className="text-indigo-500 font-bold text-[64pt] text-center mb-8 mobile:pt-4 mobile:text-[38pt] mobile:m-0 tablet:pt-12 ">
          {mobile ? "Register" : "Welcome"}
        </h1>
        <div className=" drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%] w-[500px] mobile:p-4 mobile:mb-6">
          <h1 className="text-4xl text-center font-bold mb-8">
            {mobile ? null : "Register"}
          </h1>
          <form action="post" onSubmit={handleSubmit}>
            <div className="my-5">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
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
            <div className="my-5 flex">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
                placeholder="Password"
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

            <div className="password-requirement">
              <h1 className="text-xl mt-4 mb-2 ml-4 font-semibold text-blue-500">
                Please use at least:
              </h1>
              <ul className=" list-disc ml-12 grid grid-cols-2 mobile:grid-cols-1">
                <li>
                  <p className="text-gray mb-2 text-lg">6 characters long</p>
                </li>
                <li>
                  <p className="text-gray mb-2 text-lg">1 number</p>
                </li>
                <li>
                  <p className="text-gray mb-2 text-lg">1 special character</p>
                </li>
              </ul>
            </div>

            {errorMessage && (
              <div className="error-container mt-4">
                <h1 className="text-red-500 text-center text-lg">
                  {errorMessage}
                </h1>
              </div>
            )}

            <div className="mt-4 ">
              {loading ? (
                <button
                  className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-8 text-center mobile:p-2"
                  onSubmit={handleSubmit}
                  disabled={loading}
                >
                  Loading...
                </button>
              ) : (
                <button
                  className="w-full border text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-base px-5 py-3 text-center mobile:p-2"
                  onSubmit={handleSubmit}
                >
                  Register Now
                </button>
              )}
            </div>
          </form>

          <div className="flex md:justify-between justify-center items-center mt-8">
            <div className="bg-gray-300 md:block w-full h-[1px]"></div>
            <p className="md:mx-2 text-xl font-light text-gray-400"> Or </p>
            <div className="bg-gray-300 md:block w-full h-[1px]"></div>
          </div>

          <div className="other_options flex justify-around w-full m-auto items-center mt-4 ">
            <div className="oauth-google-btn-container">
              <Google_OAuth_btn />
            </div>
          </div>
          <hr className="my-4" />
          <div className="already_have_account mt-4">
            <p className=" text-center text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className=" text-content-bg hover:underline hover:underline-offset-2 text-blue-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp_page;
