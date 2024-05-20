import React from "react";

const PreviewComponent = (prop) => {
  return (
    <div
      className="p-4 overflow-y-scroll content h-[500px] border border-gray-400 m-auto prose-li:my-0 prose-h4:my-2 prose-h5:my-1  prose-ul:list-disc prose-ul:my-0 prose-ol:my-0 prose-ol:list-decimal prose-headings:my-3 prose-h1:my-1 prose-h2:my-3 prose-p:m-0"
      dangerouslySetInnerHTML={{ __html: prop.content }}
    ></div>
  );
};

export default PreviewComponent;
