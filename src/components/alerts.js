import React from "react";

function SimpleAlerts({ title, description }) {
  return (
    <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="w-2 bg-gray-800"></div>
      <div class="flex items-center px-2 py-3">
        <div class="mx-3">
          <h2 class="text-xl font-semibold text-gray-800">{title}</h2>
          <p class="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default SimpleAlerts;
