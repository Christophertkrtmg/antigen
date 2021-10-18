import React from "react";
import CurrentStatus from "../../components/stats/CurrentStatus";

function TopStatusCards({ users }) {
  const landingStatus = [
    { name: "healthy", count: `${users.healthy}`, bg: "bg-green-500" },
    { name: "unhealthy", count: `${users.unhealthy}`, bg: "bg-yellow-500" },
    {
      name: "covid prediction",
      count: `${users.covid_prediction}`,
      bg: "bg-red-500",
    },
    { name: "panic", count: `${users.panic}`, bg: "bg-purple-500" },
    { name: "users", count: `${users.total}` },
  ];
  return (
    <div className="grid grid-cols-12 gap-6 mt-10 mb-5">
      {landingStatus.map((item, index) => {
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

export default TopStatusCards;
