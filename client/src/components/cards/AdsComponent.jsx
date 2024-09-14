import React, { useState, useEffect } from "react";

const AdsComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874919607682854";
    script.async = true;
    script.crossOrigin = "anonymous";

    // Appending the script tag to the DOM
    document.body.appendChild(script);

    // Adding an event listener for when the script loads
    window.addEventListener("load", function () {
      (adsbygoogle = window.adsbygoogle || []).push({});
    });

    // Cleanup if the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ width: "300px", height: "540px" }}
      data-ad-client="ca-pub-1874919607682854" // Replace with your AdSense client ID
      data-ad-slot="5848668290" // Replace with your ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdsComponent;
