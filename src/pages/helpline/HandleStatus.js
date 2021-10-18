import React, { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { baseUrl } from "../../api";

function HandleStatus({ verifyStatus, helplineID }) {
  const { token } = useContext(AppContext);
  const [status, setStatus] = useState(verifyStatus);

  const handleStatus = async (event) => {
    setStatus(event.target.checked);

    const data = { helpline_id: helplineID, status: status };

    const response = await axios.post(
      `${baseUrl}/helpline/updatehelpline`,
      data
    );

    if (response.data.code === 200) {
      console.log("status updated");
    } else {
      console.log("status failed to update");
    }
  };

  return (
    <td className={className.td}>
      <div className="flex flex-col">
        <div className={className.topPrimary}>
          <Switch
            checked={status}
            onChange={handleStatus}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
    </td>
  );
}

export default HandleStatus;

const className = {
  td: " p-4 dark:border-dark-5 justify-center items-center ",

  topPrimary: "text-sm font-semibold",
};
