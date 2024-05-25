import React from "react";

const PreviewComponent = (prop) => {
  return (
    <div
      className="p-4 overflow-y-scroll content h-[500px] border border-gray-400 m-auto prose-lg prose-headings:my-2 prose-p:my-1 prose-ol:list-inside prose-ol:list-decimal prose-li:list-inside prose-ul:list-disc prose-li:mb-3"
      dangerouslySetInnerHTML={{ __html: prop.content }}
    ></div>
  );
};

export default PreviewComponent;
