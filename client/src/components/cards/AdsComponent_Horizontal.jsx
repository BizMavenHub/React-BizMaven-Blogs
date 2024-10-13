import React, { useEffect, useRef } from "react";

const AdsComponent_Horizontal = () => {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false); // Tracks whether the ad is already initialized

  useEffect(() => {
    if (!isAdLoaded.current) {
      try {
        const script = document.createElement("script");
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.crossOrigin = "anonymous";

        // Append the script only once
        document.body.appendChild(script);

        script.onload = () => {
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
            isAdLoaded.current = true; // Mark the ad as initialized
          } catch (e) {
            console.error("AdSense push error: ", e);
          }
        };

        return () => {
          // Cleanup to remove the script when the component unmounts
          document.body.removeChild(script);
        };
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "180px" }}
      data-ad-client="ca-pub-1874919607682854"
      data-ad-slot="1065448541"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdsComponent_Horizontal;

/*
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874919607682854"
     crossorigin="anonymous"></script>
<!-- InsightLoop Horizontal Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1874919607682854"
     data-ad-slot="1065448541"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
 */
