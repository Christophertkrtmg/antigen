import React from "react";

function PageHeading({ title}) {
  return (
    <div className="flex">
      <h1 className="text-sm md:text-lg lg:text-xl uppercase text-black tracking-wide ">
        {title}
      </h1>
    </div>
  );
}

export default PageHeading;
