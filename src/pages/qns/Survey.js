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
import ButtonComponent from "../../components/buttons/button";
import Button from "@mui/material/Button";

/*----Material UI imports---*/
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import ImagePickerComponent from "../../components/input/imageUploadComponent";
import { appendFormData } from "../../components/utils";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseUrl } from "../../api";
import SurveyTable from "./SurveyTable.js";

function Question({ allQuestions, fetchQuestions }) {
  const [sort, setSort] = useState(false);
  const { show, hide } = useModal(AddQuestionsModal);
  const [mainImage, setMainImage] = useState();
  const { token } = useContext(AppContext);

  const [open, setOpen] = useState(false); //Used to open survey option - 1st dialog box
  const [openTemp, setOpenTemp] = useState(false); //temperature dialog box state
  const [openOxymeter, setOpenOxymeter] = useState(false); //oxymeter dialog box state

  //open 1st dialog box
  const openSurveyOption = () => {
    setOpen(true);
  };

  //open temp dialog
  const addTemp = () => {
    setOpenTemp(true);
    setOpen(false);
  };

  const closeSurvey = () => {
    setOpenTemp(false);
    setOpen(false);
    setOpenOxymeter(false);
  };

  const addOxymeter = () => {
    setOpenOxymeter(true);
  };

  const [surveyTempValue, setSurveyTempValue] = useState("");
  const [surveyType, setSurveyType] = useState("");

  const handleTempScale = (event) => {
    setSurveyTempValue(event.target.value);
  };

  const handleType = (event) => {
    setSurveyType(event.target.value);
  };

  const handleSurveyTemp = async () => {
    /* const data = {
      token: token,
      temperatureScale: surveyTempValue,
      inputType: surveyType,
      surveyImage: mainImage,
      surveyHeading: "Temperature",
    };

    var formData = appendFormData(data);

    const response = await axios.post(`${baseUrl}/`, formData);

    if (response.data.code === 200) {
      console.log("survey data saved");
    }
 */
    setOpen(false);
    setOpenTemp(false);
  };

  const handleSurveyOxymeter = async () => {
    /*  const data = {
      token : token,
      inputType: surveyType,
      surveyImage: mainImage,
      surveyHeading: "Oxymeter"
    }

    var formData = appendFormData(data);

    const response = await axios.post(`${baseUrl}/`,formData);

    if(response.data.code === 200){
      console.log("survey data saved")
    } */

    setOpen(false);
    setOpenOxymeter(false);
  };

  return (
    <div className="">
      <div className="flex justify-between mx-5 py-5">
        <PageHeading title="Survey" />
        <div className="flex text-gray-700">
          <div className="flex mx-2 items-center cursor-pointer text-red-700">
            {AddIcon}{" "}
            <div className="ml-1" onClick={openSurveyOption}>
              Add Survey
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
        thead={["Survey Heading", "Survey Image", "Input Type", "Actions"]}
      >
        <SurveyTable tableData={allQuestions} fetchQuestion={fetchQuestions} />
      </TableComponent>
      <Dialog
        open={open}
        onClose={closeSurvey}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className="balance__title">
          Select Survey Option
        </DialogTitle>
        <DialogContent>
          <div className="mb-4 h-full w-80 flex flex-col items-center">
            <div className="my-1" onClick={addTemp}>
              <Button variant="contained" color="primary">
                Temperature
              </Button>
            </div>
            <div className="my-1" onClick={addOxymeter}>
              <Button variant="contained" color="primary">
                Oxymeter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/*Temperature form dialog */}
      <Dialog
        open={openTemp}
        onClose={closeSurvey}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div style={{ width: "400px" }}>
            <FormControl fullWidth>
              <InputLabel id="survey-temp-scale-label">
                Choose temperature scale
              </InputLabel>
              <Select
                defaultValue="Fahrenheit"
                labelId="survey-temp-scale-label"
                id="survey-temp-scale"
                value={surveyTempValue}
                label="Age"
                onChange={handleTempScale}
              >
                <MenuItem value={"Celsius"}>°C</MenuItem>
                <MenuItem value={"Fahrenheit"}>°F</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ width: "400px" }}>
            <FormControl fullWidth>
              <InputLabel id="survey-temp-type-label">Input Type</InputLabel>
              <Select
                defaultValue="text"
                labelId="survey-temp-type-label"
                id="survey-temp-type"
                value={surveyType}
                label="Age"
                onChange={handleType}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Numeric</MenuItem>
              </Select>
            </FormControl>
            <ImagePickerComponent
              label="Select Image"
              color="bg-yellow-500"
              name="main_img"
              onImageChange={setMainImage}
            />
            <div className="mt-5">
              <ButtonComponent
                title="Save Survey"
                color="bg-green-500"
                onClick={handleSurveyTemp}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/*Oxymeter Dialog box */}
      <Dialog
        open={openOxymeter}
        onClose={closeSurvey}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div style={{ width: "400px" }}>
            <FormControl fullWidth>
              <InputLabel id="survey-oxymeter-type-label">
                Oxymeter Value
              </InputLabel>
              <Select
                defaultValue="text"
                labelId="survey-oxymeter-type-label"
                id="survey-oxymeter-type"
                value={surveyType}
                label="Age"
                onChange={handleType}
              >
                <MenuItem value={"text"}>Text</MenuItem>
                <MenuItem value={"number"}>Numeric</MenuItem>
              </Select>
            </FormControl>
            <ImagePickerComponent
              label="Select Image"
              color="bg-yellow-500"
              name="main_img"
              onImageChange={setMainImage}
            />
            <div className="mt-5">
              <ButtonComponent
                title="Save Survey"
                color="bg-green-500"
                onClick={handleSurveyOxymeter}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
