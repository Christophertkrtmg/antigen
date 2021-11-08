import React, { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function PanicTable({
  id,
  location,
  name,
  coordinate_lat,
  coordinate_long,
  phone,
  response_status,
  status,
  panic_date,
  emergency_phone,
}) {
  const [responseStatus, setResponseStatus] = useState(response_status);
  const [userStatus, setUserStatus] = useState(status);

  const handleResponseStatus = (e) => {
    setResponseStatus(e.target.value);
  };

  const handleUserStatus = (e) => {
    setUserStatus(e.target.value);
  };

  return (
    <tr className="text-gray-700 border-b-2 border-gray-100" key={id}>
      <td className={className.td}>
        <div className="flex items-center">
          <div className={className.avatar}>img</div>
          <div className="flex flex-col ml-4">
            <div className={className.topPrimary}>{name}</div>
          </div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className={className.topPrimary}>{location}</div>
              <div className={className.botSecondary}>{phone}</div>
            </div>
            <div className="cursor-pointer">
              <Link
                to={{
                  pathname: `https://www.google.com/maps/search/${coordinate_lat},+${coordinate_long}/@${coordinate_lat},${coordinate_long},17z`,
                }}
                target="_blank"
              >
                <RoomIcon color="primary" fontSize="large" />
              </Link>
            </div>
          </div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>{emergency_phone}</div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>{panic_date}</div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>
            <FormControl fullWidth variant="standard">
              <Select
                defaultValue={response_status}
                labelId="survey-temp-scale-label"
                id="survey-temp-scale"
                value={responseStatus}
                label="Age"
                onChange={handleResponseStatus}
              >
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"in progress"}>In Progress</MenuItem>
                <MenuItem value={"helped"}>Helped</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>
            <FormControl fullWidth variant="standard">
              <Select
                defaultValue={status}
                labelId="survey-temp-scale-label"
                id="survey-temp-scale"
                value={userStatus}
                label="Age"
                onChange={handleUserStatus}
              >
                <MenuItem value={"healthy"}>Healthy</MenuItem>
                <MenuItem value={"unhealthy"}>Unhealthy</MenuItem>
                <MenuItem value={"detected"}>Detected</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default PanicTable;

const className = {
  td: " p-2 dark:border-dark-5 text-center",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  topPrimary: "text-sm font-semibold capitalize",
  botSecondary: "text-sm text-gray-700 font-mono",
  responseDone: "flex bg-green-500 rounded-full w-28 items-center py-1",
  responseInProgress: "flex bg-yellow-700 rounded-full w-28 items-center py-1",
  responsePending: "flex bg-gray-700 rounded-full w-28 items-center py-1",
  vaccineStatus: "text-sm text-white",
};
