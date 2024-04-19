import React from "react";
import { useState } from "react";
import {
  Google_OAuth_btn,
  Github_OAuth_btn,
  Facebook_OAuth_btn,
} from "../../components/oauth";

function SignUp_page() {
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

      const res = await fetch("/api/auth/register-with-email", {
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

  return (
    <div className="min-h-screen mb-4">
      <h1 className="text-7xl text-white font-poppins font-semibold text-center tablet:pt-20 pt-28 pb-20 mobile:pt-12 mobile:pb-12 mobile:text-4xl">
        Hello, Welcome!
      </h1>
      <div className="w-[500px] drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%]">
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
          <div className="my-5">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
              placeholder="Password"
              onChange={handleChange}
            />
            <p className="text-gray mt-2 ml-2 text-sm">
              Password must be at least 6 characters long
            </p>
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

          {errorMessage && (
            <div className="error-container mt-4">
              <h1 className="text-red text-center text-lg">{errorMessage}</h1>
            </div>
          )}

          <div className="mt-4 ">
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
                Register Now
              </button>
            )}
          </div>
        </form>
        <hr className="my-6" />
        <div className="other_options flex justify-around w-full m-auto items-center mt-4">
          <div className="oauth-google-btn-container">
            <Google_OAuth_btn />
          </div>
          <div className="oauth-facebook-btn-container">
            <Facebook_OAuth_btn />
          </div>
          <div className="oauth-github-btn-container">
            <Github_OAuth_btn />
          </div>
        </div>
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
