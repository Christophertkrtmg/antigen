import React, { useContext } from "react";
import CustomModal from "../../components/modals/modal";
import { AUTH_API, IMAGE_API } from "../../api";
import { trashIcon } from "../../assets/icons/icons";
import ButtonComponent from "../../components/buttons/button";
import { useFormController, useFormSubmit, useModal } from "@razzib/react-kit";
import { AppContext } from "../../context/app.context";

function PhotoVideoTable({ tableData, fetchPhotoVideoData }) {
  const { show, hide } = useModal(DeleteModal);

  return tableData.map((photovideo, index) => {
    return (
      <tr
        className="text-gray-700 dark:bg-red border-b-2 border-gray-100"
        key={index}
      >
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.heading_eng}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.heading_nep}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.caption_eng}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.caption_nep}</div>
          </div>
        </td>
        <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.category}</div>
          </div>
        </td>
        <td className={className.td}>
          {photovideo.photovideo.map((item, index) => {
            return (
              <div key={index} className={className.preview}>
                <img
                  src={`${IMAGE_API}${item}`}
                  alt=""
                  className="h-30 w-40 bg-cover bg-center"
                />
              </div>
            );
          })}
        </td>
        {/* <td className={className.td}>
          <div className="flex flex-col">
            <div className={className.topPrimary}>{photovideo.help_type}</div>
          </div>
        </td> */}
        <td className={className.td}>
          <ButtonComponent
            onClick={() => {
              show({
                hide,
                photovideo,
                fetchPhotoVideoData,
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

const DeleteModal = ({ hide, photovideo, fetchPhotoVideoData }) => {
  const { token } = useContext(AppContext);

  const controller = useFormController(
    {},
    { token: token, photovideo_id: photovideo._id },
    `${AUTH_API}/photovideo/deletephotovideo`
  );

  const submit = useFormSubmit(controller, async (response) => {
    if (response.code === "200") {
      fetchPhotoVideoData();
      hide();
    }
  });
  return (
    <CustomModal
      hide={() => {
        /* () => setSelectedHelpline({}); */
        hide();
      }}
      title="Delete PhotoVideo"
    >
      <div className={className.topPrimary}>
        Delete {photovideo.heading_eng}
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

export default PhotoVideoTable;

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
  vaccineStatus: "text-sm text-white",
  statusNormal:
    "bg-green-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
  statusUnhealthy:
    "bg-yellow-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
  statusDetected:
    "bg-red-500 rounded-full px-2 py-1 w-24 text-white  text-sm capitalize  font-semibold",
};
