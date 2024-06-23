import React, { useEffect } from "react";

function AdComponent() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="border w-[96%] ml-2">
    <ins class="adsbygoogle"
     style={{ display: "block" }}
     data-ad-client="ca-pub-3131572833125041"
     data-ad-slot="9530969455"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    </div>
  );
}

export default AdComponent;
