import React from "react";

const RecentUserSection = ({ latestUser }) => {
  return (
    <div className="col-span-1 border p-5">
      <span className="font-bold  text-md md:text-sm lg:text-xl p-2">New Users</span>
      <div>
        {latestUser.map((item, index) => {
          return (
            <div key={index}>
              <RecentUsers name={item.name} address={item.country} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RecentUsers = ({ name, image, address }) => {
  return (
    <div className="w-full flex bg-white p-2  my-2 ">
      <img
        alt="avatar"
        className="w-15 h-10 lg:w-16 h-16 md:w-12 h-12 rounded-full"
        src="https://assets.webiconspng.com/uploads/2016/12/User-Icon.png"
      />
      <div id="header" className="flex pl-5">
        <div id="body" className="flex flex-col ml-5">
          <p id="name" className="text-sm md:text-sm lg:text-sm  font-semibold">
            {name}
          </p>
          <p id="job" className="text-xs text-gray-800">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentUserSection;
