import React from "react";
import google_icon from "../../assets/google-icon.png";
import github_icon from "../../assets/github-icon.png";
import facebook_icon from "../../assets/facebook-icon.png";

import { NavbarComponent } from "../../components";

function SignUp_page() {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#11009E] to-[#6528F7] to-[#CF4DCE] h-screen">
        <NavbarComponent />
        <h1 className="text-7xl text-white font-poppins font-semibold text-center py-16">
          Hello, Welcome!
        </h1>
        <div className="w-[500px] drop-shadow-xl border bg-white m-auto p-6 rounded-lg">
          <h1 className="text-4xl text-center font-bold mb-8">Register</h1>
          <form action="post">
            <div className="my-5">
              <input
                type="text"
                name="username"
                id="username"
                className="w-full border p-2 rounded"
                placeholder="Username"
              />
            </div>
            <div className="my-5">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
            </div>
            <div className="my-5">
              <input
                type="password"
                name="password"
                id="password"
                className="w-full border p-2 rounded"
                placeholder="Password"
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
            <div className="mt-8 ">
              <input
                type="submit"
                name="submit-btn"
                id="submit-btn"
                value={"Register Now"}
                className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold"
              />
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
    </div>
  );
}

export default SignUp_page;
