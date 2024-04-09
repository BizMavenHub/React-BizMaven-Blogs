import React from "react";
import { useState } from "react";

import google_icon from "../../assets/google-icon.png";
import github_icon from "../../assets/github-icon.png";
import facebook_icon from "../../assets/facebook-icon.png";

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
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <h1 className="text-7xl text-white font-poppins font-semibold text-center pt-28 pb-20">
        Hello, Welcome!
      </h1>
      <div className="w-[500px] drop-shadow-xl border bg-white m-auto p-6 rounded-lg">
        <h1 className="text-4xl text-center font-bold mb-8">Register</h1>
        <form action="post" onSubmit={handleSubmit}>
          <div className="my-5">
            <input
              type="text"
              name="username"
              id="username"
              className="w-full border p-2 rounded"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border p-2 rounded"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border p-2 rounded"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              name="confirmed_password"
              id="confirmed_password"
              className="w-full border p-2 rounded"
              placeholder="Password again"
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
                className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold"
                onSubmit={handleSubmit}
                disabled={loading}
              >
                Loading...
              </button>
            ) : (
              <button
                className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold"
                onSubmit={handleSubmit}
              >
                Register Now
              </button>
            )}
          </div>
        </form>
        <hr className="my-6" />
        <div className="other_options flex justify-around w-full m-auto items-center mt-4">
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg">
              <img src={google_icon} alt="" className="w-[30px]" />
            </button>
          </div>
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-2.5 px-12 rounded-lg">
              <img src={github_icon} alt="" className="w-[32px]" />
            </button>
          </div>
          <div className="">
            <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg">
              <img src={facebook_icon} alt="" className="w-[30px]" />
            </button>
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
