import React from "react";
import { useState } from "react";
import { Google_OAuth_btn } from "../../components/oauth";

function SignUp_page() {
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
    <div className="min-h-[100vh] mt-20">
      <h1 className="text-7xl text-white font-poppins font-semibold text-center tablet:pt-20 pt-12 pb-20 mobile:pt-12 mobile:pb-12 mobile:text-4xl">
        Hello, Welcome!
      </h1>
      <div className="w-[500px] drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%] mb-16">
        <h1 className="text-4xl text-center font-bold mb-8">Register</h1>
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
            <h1 className="text-xl mt-4 mb-2 ml-4 font-semibold text-navbar-footer-bg">
              Please use at least:
            </h1>
            <ul className=" list-disc ml-12 grid grid-cols-2">
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
              <h1 className="text-red text-center text-lg">{errorMessage}</h1>
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

        <div className="other_options flex justify-around w-full m-auto items-center mt-4 ">
          <div className="oauth-google-btn-container">
            <Google_OAuth_btn />
          </div>
        </div>
        <hr className="my-4" />
        <div className="already_have_account mt-4">
          <p className=" text-center text-lg">
            Already have an account?{" "}
            <a href="/login" className=" text-content-bg">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp_page;
