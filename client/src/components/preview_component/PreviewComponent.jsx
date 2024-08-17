import React from "react";

const PreviewComponent = (prop) => {
  return (
    <div
      className="p-4 overflow-y-scroll content h-[650px] m-auto post-content bg-[#F6F5F5]"
      dangerouslySetInnerHTML={{ __html: prop.content }}
    ></div>
  );
};

export default PreviewComponent;
