import React, { useEffect } from "react";

// Highlight js
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

// Utils
import {
  headingModules,
  listModules,
  blockQuoteModule,
} from "../../utilities/js/contentHandleModule";

// styles
import "../../styles/previewComponent.css";

const PreviewComponent = (prop) => {
  useEffect(() => {
    handleHighlight();
  }, []);

  const handleHighlight = () => {
    const pre = document.querySelectorAll(".post-content .ql-syntax");

    pre.forEach((block) => {
      console.log(block);
      hljs.highlightBlock(block);
    });
  };

  return (
    <div
      className={`post-content ${headingModules} ${listModules} ${blockQuoteModule} p-4 overflow-y-scroll content h-[650px] m-auto bg-[#F6F5F5]  prose-a:text-blue-500 prose-code:px-1 prose-code:rounded prose-code:bg-gray-200 prose-code:text-black prose-code:text-sm`}
      dangerouslySetInnerHTML={{ __html: prop.content }}
    ></div>
  );
};

export default PreviewComponent;
