import React, { useEffect, useRef } from "react";

const TestAdSenseComponent = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      
    }
  }, []);

  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <ins
        
        style={{"display":"block"}}
        ref={adRef}
        className="adsbygoogle"
        data-ad-client="ca-app-pub-3940256099942544"
        data-ad-slot="7806394673"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {/* <div
        ref={adRef}
        className="adsbygoogle"
        data-ad-client="ca-app-pub-3940256099942544"
        data-ad-slot="7806394673"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></div> */}
    </div>
  );
};

export default TestAdSenseComponent;
