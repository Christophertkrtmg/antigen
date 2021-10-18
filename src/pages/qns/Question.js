import React, { useContext, useEffect, useState } from "react";
import {
  AddIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
} from "../../assets/icons/icons.js";
import PageHeading from "../../components/header/pageHeading.js";
import TableComponent from "../../components/tables/index.js";
import QuestionTable from "./QuestionTable.js";
import { useModal } from "@razzib/react-kit";
import CustomModal from "../../components/modals/modal";
import AddQuestionForm from "./questionForm.js";
import { AppContext } from "../../context/app.context.js";

function Question({ allQuestions, fetchQuestions }) {
  const [sort, setSort] = useState(false);
  const { show, hide } = useModal(AddQuestionsModal);

  return (
    <div className="">
      <div className="flex justify-between mx-5 py-5">
        <PageHeading title="Question" />
        <div className="flex text-gray-700">
          <div className="flex mx-2 items-center cursor-pointer text-red-700">
            {AddIcon}{" "}
            <div
              className="ml-1"
              onClick={() => show({ hide, fetchQuestions })}
            >
              Add Questions
            </div>
          </div>
          <div
            className="flex mx-2 items-center cursor-pointer"
            onClick={() => setSort(!sort)}
          >
            {sort ? SortAscIcon : SortDescIcon}
            <div className="ml-1">Sort</div>
          </div>
          <div className="flex mx-2 items-center cursor-pointer">
            {FilterIcon} <div className="ml-1">Filter</div>
          </div>
        </div>
      </div>
      <TableComponent
        thead={[
          "Heading",
          "Heading Nepali",
          "Caption",
          "Caption Nepali",
          "Main Image",
          "Awareness Image",
          "Survey Heading",
          "Survey Image",
          "Position",
          "Actions",
        ]}
      >
        <QuestionTable
          tableData={allQuestions}
          fetchQuestion={fetchQuestions}
        />
      </TableComponent>
    </div>
  );
}

export default Question;

const AddQuestionsModal = ({ hide, fetchQuestions }) => {
  return (
    <CustomModal title="Add Questions" hide={hide}>
      <AddQuestionForm hide={hide} fetchQuestions={fetchQuestions} />
    </CustomModal>
  );
};
