import { useFormController, useFormSubmit, useModal } from "@razzib/react-kit";
import React, { useContext } from "react";
import { AUTH_API, IMAGE_API } from "../../api";
import { trashIcon } from "../../assets/icons/icons";
import ButtonComponent from "../../components/buttons/button";
import { AppContext } from "../../context/app.context";
import CustomModal from "../../components/modals/modal";

function SurveyTable({ tableData, fetchQuestion }) {
  const { show, hide } = useModal(DeleteModal);

  return tableData.map((question, index) => {
    return (
      <tr className="text-gray-700 border-b-2 border-gray-100" key={index}>
        {/* <td className={className.td}>
          <div className={className.textPrimary}>{question.heading_eng}</div>
        </td>
        <td className={className.td}>
          <div className={className.textPrimary}>{question.heading_nep}</div>
        </td>
        <td className={className.td}>
          <div className={className.textPrimary}>{question.caption_eng}</div>
        </td>
        <td className={className.td}>
          <div className={className.textSecondary}>{question.caption_nep}</div>
        </td>
        <td className={className.td}>
          <div className={className.preview}>
            <img src={`${IMAGE_API}${question.main_img}`} alt="" />
          </div>
        </td>
        <td className={className.td}>
          <div className={className.preview}>
            <img src={`${IMAGE_API}${question.awareness_img}`} alt="" />
          </div>
        </td> */}
        <td className={className.td}>
          <div className={className.textSecondary}>
            {question.survey[0].survey_heading}
          </div>
        </td>
        <td className={className.td}>
          <div className={className.preview}>
            <img src={`${IMAGE_API}${question.survey[0].survey_img}`} alt="" />
          </div>
        </td>
        <td className={className.td}>{question.position}</td>
        <td className={className.td}>
          <ButtonComponent
            onClick={() => {
              show({
                hide,
                question,
                fetchQuestion,
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

export default SurveyTable;

const DeleteModal = ({ hide, question, fetchQuestion }) => {
  const { token } = useContext(AppContext);

  const controller = useFormController(
    {},
    { token: token, question_id: question._id },
    `${AUTH_API}/question/deletequestion`
  );

  const submit = useFormSubmit(controller, async (response) => {
    if (response.code === "200") {
      fetchQuestion();
      hide();
    }
  });
  return (
    <CustomModal
      hide={() => {
        /* () => setSelectedHelpline({}); */
        hide();
      }}
      title="Delete Question"
    >
      <div className={className.topPrimary}>Delete {question.heading_eng}</div>
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

const className = {
  td: " p-4 dark:border-dark-5",
  textPrimary: "text-sm font-semibold capitalize ",
  textSecondary: "text-xs text-gray-400",
  preview: "h-32 w-24 object-contain flex justify-center items-center",
  statusTrue: "bg-green-700",
  statusFalse: "bg-red-500",
};
