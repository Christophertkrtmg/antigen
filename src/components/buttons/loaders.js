import React from "react";

function BounceLoader() {
  return (
    <div className="bg-gray-200 flex space-x-2 p-5 rounded-full justify-center items-center">
      <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle" />
      <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle" />
      <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle" />
    </div>
  );
}

export default BounceLoader;
