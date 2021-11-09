//simple user table to show the data of users

import React from "react";
import { PendingStatusIcon, TickIcon } from "../../assets/icons/icons.js";

function UserTable({ tableData }) {
  return tableData.map((user, index) => {
    return (
      <tr
        className="text-gray-700 dark:bg-red border-b-2 border-gray-100"
        key={index}
      >
        <td className={className.td}>
          <div className="flex items-center">
            <div className={className.avatar}>
              <img
                src="http://cduk.lk/wp-content/uploads/2020/10/man-300x300-1.png"
                alt=""
              />
            </div>
            <div className="flex flex-col ml-4">
              <div className={className.topPrimary}>{user.name}</div>
            </div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{user.phone}</div>
            <div className={className.botSecondary}>{user.country}</div>
          </div>
        </td>
        <td className={className.td}>
          {user.vaccine !== null ? (
            <div className={className.vaccineTick}>
              <div className="px-2">{TickIcon}</div>
              <div className={className.vaccineStatus}>{user.vaccine}</div>
            </div>
          ) : (
            <div className={className.vaccineWaiting}>
              <div className="px-2">{PendingStatusIcon}</div>
              <div className={className.vaccineStatus}>Not Vaccinated</div>
            </div>
          )}
        </td>
        <td className={className.td}>
          <div className="flex flex-col text-sm">
            <div className={className.topPrimary}>
              {user.recent_health[0].updated_at.default}
            </div>
          </div>
        </td>
        <td className={className.td}>
          {user.recent_health[0].status.default === 0 ? (
            <div className="flex items-center  text-center jusify-center">
              <div className={className.statusNormal}>Healthy</div>
            </div>
          ) : user.recent_health[0].status.default === 1 ? (
            <div className="flex items-center  text-center jusify-center">
              <div className={className.statusUnhealthy}>Unhealthy</div>
            </div>
          ) : (
            <div className="flex items-center text-center jusify-center">
              <div className={className.statusDetected}>Detected</div>
            </div>
          )}
        </td>
      </tr>
    );
  });
}

export default UserTable;

const className = {
  td: " p-4 dark:border-dark-5 justify-center items-center ",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  topPrimary: "text-sm font-semibold",
  botSecondary: "text-xs text-gray-400",
  vaccineTick:
    "flex bg-green-500 rounded-full items-center justify-center  py-1",
  vaccineWaiting:
    "flex bg-red-700 rounded-full  items-center justify-center  py-1",
  vaccinePending:
    "flex bg-gray-700 rounded-full  items-center justify-center  py-1",
  vaccineStatus: "text-sm text-white",
  statusNormal:
    "bg-green-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
  statusUnhealthy:
    "bg-yellow-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
  statusDetected:
    "bg-red-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
};
