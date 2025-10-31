import React from "react";

export default function ShimmerCard() {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 shadow-xl backdrop-blur-md w-full max-w-xs mx-auto">
      {/* Image Placeholder */}
      <div className="h-40 w-full rounded-xl bg-gray-800 shimmer mb-4"></div>

      {/* Text Lines */}
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-gray-800 shimmer rounded"></div>
        <div className="h-3 w-1/2 bg-gray-800 shimmer rounded"></div>
        <div className="h-5 w-1/3 bg-gray-700 shimmer rounded"></div>
      </div>
    </div>
  );
}
