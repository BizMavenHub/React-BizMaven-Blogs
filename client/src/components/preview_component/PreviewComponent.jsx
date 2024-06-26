import React from "react";

const PreviewComponent = (prop) => {
  return (
    <div
      className="p-4 overflow-y-scroll content h-[500px] border border-gray-400 m-auto post-content"
      dangerouslySetInnerHTML={{ __html: prop.content }}
    ></div>
  );
};

export default PreviewComponent;
