import React from "react";

function BloodTable({ tableData }) {
  return tableData.map((body, index) => {
    return (
      <tr className="text-gray-700 border-b-2 border-gray-100" key={index}>
        <td className={className.td}>
          <div className="flex items-center">
            <div className={className.avatar}>img</div>
            <div className="flex flex-col ml-4">
              <div className={className.topPrimary}>{body.name}</div>
              <div className={className.botSecondary}>{body.email}</div>
              <div className={className.botSecondary}>
                {body.recent_health[0].updated_at.default}
              </div>
            </div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{body.location}</div>
            <div className={className.botSecondary}>{body.phone}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className={className.topPrimary}>{body.blood_type}</div>
        </td>
        <td className={className.td}>
          <div className={className.topPrimary}>
            {body.blood_dontation_status ? "Available" : "Unavailable"}
          </div>
          <div className={className.botSecondary}>
            {/* {body.donationStatus.time} */}
          </div>
        </td>
        <td className={className.td}>
          {body.plasma_donator ? (
            <div className={className.statusNormal}>
              <p>Yes</p>
            </div>
          ) : (
            <div className={className.statusDetected}>
              <p>No</p>
            </div>
          )}
        </td>
      </tr>
    );
  });
}

export default BloodTable;

const className = {
  td: "p-4 dark:border-dark-5",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  topPrimary: "text-sm font-semibold capitalize",
  botSecondary: "text-xs text-gray-400",
  statusNormal:
    "bg-green-500 rounded-full text-center px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
  statusUnhealthy:
    "bg-yellow-500 rounded-full text-center px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
  statusDetected:
    "bg-red-500 rounded-full text-center px-2 py-1 w-24 text-white capitalize font-semibold text-sm",
};
