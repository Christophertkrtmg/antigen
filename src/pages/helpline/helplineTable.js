import React, { useContext } from "react";
import CustomModal from "../../components/modals/modal";
import { HELPLINE_API, IMAGE_API } from "../../api";
import { trashIcon } from "../../assets/icons/icons";
import ButtonComponent from "../../components/buttons/button";
import { useFormController, useFormSubmit, useModal } from "@razzib/react-kit";
import { AppContext } from "../../context/app.context";

import HandleStatus from "./HandleStatus";

function HelplineTable({ tableData, getHelpLineData }) {
  const { show, hide } = useModal(DeleteModal);

  console.log(tableData);

  return tableData.map((helpline, index) => {
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
              <div className={className.topPrimary}>
                {helpline.organization_name_eng}
              </div>
            </div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>
              {helpline.organization_name_nep}
            </div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{helpline.contact}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{helpline.location}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.image}>
              <img src={`${IMAGE_API}${helpline.logo}`} alt="" />
            </div>
          </div>
        </td>
        <HandleStatus
          helplineID={helpline._id}
          verifyStatus={helpline.verified}
        />
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{helpline.help_type}</div>
          </div>
        </td>
        <td className={className.td}>
          <ButtonComponent
            onClick={() => {
              show({
                hide,
                helpline,
                getHelpLineData,
              });
            }}
            title={trashIcon}
            rounded="rounded-lg"
            color="bg-red-800"
            size="p-2"
          />
        </td>
      </tr>
    );
  });
}

const DeleteModal = ({ hide, helpline, getHelpLineData }) => {
  const { token } = useContext(AppContext);

  const controller = useFormController(
    {},
    { token: token, helpline_id: helpline._id },
    `${HELPLINE_API}/deletehelpline`
  );

  const submit = useFormSubmit(controller, async (response) => {
    if (response.code === "200") {
      getHelpLineData();
      hide();
    }
  });

  return (
    <CustomModal
      hide={() => {
        /*  () => setSelectedHelpline({}); */
        hide();
      }}
      title="Delete Helpline"
    >
      <div className={className.topPrimary}>
        Delete {helpline.organization_name_eng}
      </div>
      <br />
      <ButtonComponent
        trashIcon
        onClick={() => submit()}
        title={trashIcon}
        rounded="rounded-lg"
        color="bg-red-800"
        size="p-2"
      />
    </CustomModal>
  );
};

export default HelplineTable;

const className = {
  td: " p-4 dark:border-dark-5 justify-center items-center ",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  image: "h-40 w-40 rounded-full flex justify-center items-center object-cover",
  topPrimary: "text-sm font-semibold",
  botSecondary: "text-xs text-gray-400",
  vaccineTick:
    "flex bg-green-500 rounded-full items-center justify-center  py-1",
  vaccineWaiting:
    "flex bg-red-700 rounded-full  items-center justify-center  py-1",
  vaccinePending:
    "flex bg-gray-700 rounded-full  items-center justify-center  py-1",
  vaccineStatus: "text-sm text-white text-sm ",
  statusNormal:
    "bg-green-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold text-sm",
  statusUnhealthy:
    "bg-yellow-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold text-sm",
  statusDetected:
    "bg-red-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold text-sm",
};
