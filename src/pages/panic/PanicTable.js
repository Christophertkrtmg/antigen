import React from "react";
import { DotsVerticalIcon } from "../../assets/icons/icons.js";

function PanicTable({ tableData }) {
  return tableData.map((body, index) => {
    return (
      <tr className="text-gray-700 border-b-2 border-gray-100" key={index}>
        <td className={className.td}>
          <div className="flex items-center">
            <div className={className.avatar}>img</div>
            <div className="flex flex-col ml-4">
              <div className={className.topPrimary}>{body.name}</div>
              <div className={className.botSecondary}>Updated 1 day ago</div>
            </div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{body.contact.address}</div>
            <div className={className.botSecondary}>{body.contact.phone}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{body.panicTime.date}</div>
            <div className={className.botSecondary}>{body.panicTime.time}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>
              {body.responseStatus.status}
            </div>
            <div className={className.botSecondary}>
              {body.responseStatus.date}
            </div>
            <div className={className.botSecondary}>
              {body.responseStatus.time}
            </div>
          </div>
        </td>
        <td className={className.td}>
          {body.status === "Normal" ? (
            <div className="flex items-center">
              <div className={className.statusNormal}>{body.status}</div>
              <div
                className="ml-5 text-gray-400 cursor-pointer"
                onClick={() => alert(body.status)}
              >
                {DotsVerticalIcon}
              </div>
            </div>
          ) : body.status === "Unhealthy" ? (
            <div className="flex items-center">
              <div className={className.statusUnhealthy}>{body.status}</div>
              <div
                className="ml-5 text-gray-400 cursor-pointer"
                onClick={() => alert(body.status)}
              >
                {DotsVerticalIcon}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className={className.statusDetected}>{body.status}</div>
              <div
                className="ml-5 text-gray-400 cursor-pointer"
                onClick={() => alert(body.status)}
              >
                {DotsVerticalIcon}
              </div>
            </div>
          )}
        </td>
      </tr>
    );
  });
}

export default PanicTable;

const className = {
  td: " p-4 dark:border-dark-5",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  topPrimary: "text-sm font-semibold capitalize",
  botSecondary: "text-xs text-gray-400",
  responseDone: "flex bg-green-500 rounded-full w-28 items-center py-1",
  responseInProgress: "flex bg-yellow-700 rounded-full w-28 items-center py-1",
  responsePending: "flex bg-gray-700 rounded-full w-28 items-center py-1",
  vaccineStatus: "text-sm text-white",
  statusNormal:
    "bg-green-500 rounded-full px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
  statusUnhealthy:
    "bg-yellow-500 rounded-full px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
  statusDetected:
    "bg-red-500 rounded-full px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
};
