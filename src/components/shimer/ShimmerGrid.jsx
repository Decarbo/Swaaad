import React from "react";
import ShimmerCard from "./ShimmerCard";

export default function ShimmerGrid({ count = 8 }) {
  return (
    <div className="min-h-screen pt-14 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
