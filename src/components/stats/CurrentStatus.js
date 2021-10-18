import React from "react";

function CurrentStatus({ name, count, bg }) {
  const className = {
    main: `transform dark:bg-grey-500 hover:scale-105 transition duration-300 shadow-md border rounded-lg col-span-6
     md:col-span-4 lg:col-span-2 rounded-lg text-gray-500 flex flex-col px-4
        items-center border border-blue-100 text-xs md:text-sm lg:text-sm
        group hover:${
          bg ? bg : "bg-blue-500"
        } pointer shadow-md cursor-pointer p-5 `,
    name: "uppercase font-semibold text-xs text-center group-hover:text-white xl:text-sm py-1 md:py-2",
    count: "font-bold text-md text-black group-hover:text-white xl:text-2xl",
  };

  return (
    <div className={className.main}>
      <div className={className.name}>{name}</div>
      <div className={className.count}>{count}</div>
    </div>
  );
}

export default CurrentStatus;
