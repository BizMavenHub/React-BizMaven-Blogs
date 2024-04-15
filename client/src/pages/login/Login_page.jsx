import React from "react";
import google_icon from "../../assets/google-icon.png";
import github_icon from "../../assets/github-icon.png";
import facebook_icon from "../../assets/facebook-icon.png";

function Login_page() {
  return (
    <div className="min-h-screen">
      <h1 className="text-7xl text-white font-poppins font-semibold text-center pt-32 pb-20 mobile:pt-16 mobile:pb-16 mobile:text-4xl">
        Hello, Welcome Back!
      </h1>
      <div className="w-[500px] drop-shadow-xl bg-white m-auto p-6 rounded-lg mobile:w-[90%]">
        <h1 className="text-4xl text-center font-bold mb-8">Login</h1>
        <form action="post">
          <div className="my-5">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
              placeholder="Email"
            />
          </div>
          <div className="my-5">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border p-2 rounded mobile:p-1.5 mobile:text-sm"
              placeholder="Password"
            />
          </div>
          <div className="mt-8 mobile:mt-4 ">
            <input
              type="submit"
              name="submit-btn"
              id="submit-btn"
              value={"Login"}
              className="w-full border p-4 rounded-lg bg-gradient-to-r from-[#F72798] to-[#EBF400] text-xl text-white font-semibold mobile:p-2"
            />
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
