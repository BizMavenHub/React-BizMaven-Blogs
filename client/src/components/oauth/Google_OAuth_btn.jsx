import React from "react";
import { google_icon } from "../../assets/index.js";

function Google_OAuth_btn() {
  return (
    <div>
      <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-3 px-12 rounded-lg mobile:px-6">
        <img src={google_icon} alt="" className="w-[30px]" />
      </button>
    </div>
  );
}

export default Google_OAuth_btn;
