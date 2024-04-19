import React from "react";
import { github_icon } from "../../assets";

const Github_OAuth_btn = () => {
  return (
    <div>
      <button className=" flex justify-center items-center bg-[#f2f2f2] text-white font-semibold w-full py-2.5 px-12 rounded-lg mobile:px-6">
        <img src={github_icon} alt="" className="w-[32px]" />
      </button>
    </div>
  );
};

export default Github_OAuth_btn;
