import React from "react";
import ShimmerCard from "./ShimmerCard";

export default function ShimmerGrid({ count = 8 }) {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-10 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8 pt-16">
          {Array.from({ length: count }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
