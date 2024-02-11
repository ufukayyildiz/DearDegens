"use client"
import React from "react";
import { Adsense } from "@ctrl/react-adsense";

export function Ads() {
  return (
    <div className="text-center adsbygoogle my-3">
      <Adsense
        client="ca-pub-8040318911928921"
        slot="7694999443"
        style={{ width: 500, height: 300 }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}
