import React from "react";
import CurrentStatus from "./CurrentStatus";

function Stats({ eachStats }) {
  const className = {
    main: "grid grid-cols-12 gap-6 mt-10 mb-5",
  };

  return (
    <div className={className.main}>
      {eachStats.map((item, index) => {
        return (
          <CurrentStatus
            key={index}
            name={item.name}
            count={item.count}
            bg={item.bg}
          />
        );
      })}
    </div>
  );
}

export default Stats;
