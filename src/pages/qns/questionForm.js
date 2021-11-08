import React, { useContext, useState } from "react";
import { Form, TextParser, useFormController } from "@razzib/react-kit";
import InputComponent from "../../components/input/inputComponent";
import { AUTH_API, baseUrl, HELPLINE_API, QUESTION_API } from "../../api";
import ImagePickerComponent from "../../components/input/imageUploadComponent";
import ButtonComponent from "../../components/buttons/button";
import { AppContext } from "../../context/app.context";
import { appendFormData } from "../../components/utils";
import axios from "axios";

function AddQuestionForm({ hide, fetchQuestions }) {
  const { token } = useContext(AppContext);

  const [mainImage, setMainImage] = useState();
  const [awarenessImg, setAwarenessImage] = useState();
  const [surveyImg, setSurveyImage] = useState();
  const [isSurvey, setIsSurvey] = useState(false);
  const [loading, setLoading] = useState(false);

  const def = {
    main_img: { parser: new TextParser() },
    survey_img: { parser: new TextParser() },
    awareness_img: { parser: new TextParser() },
    heading_eng: { parser: new TextParser().required() },
    heading_nep: { parser: new TextParser().required() },
    caption_eng: { parser: new TextParser().required() },
    caption_nep: { parser: new TextParser().required() },
    survey_heading: { parser: new TextParser().required() },
  };
  const controller = useFormController(
    def,
    {},
    `${QUESTION_API}/registerquestion`
  );

  const addQuestion = async () => {
    const payload = {
      ...controller.state,
      token: token,
      issurvey: isSurvey,
      question_type: "question",
    };
    const data = appendFormData(payload);
    const response = await axios.post(
      `${baseUrl}/dashboard/question/registerquestion`,
      data
    );
    if (response.data.code === 200) {
      setTimeout(() => {
        setLoading(false);
        hide();
      }, 2000);
    }
    hide();
    fetchQuestions();
  };

  return (
    <Form controller={controller}>
      <InputComponent
        label="Heading English"
        placeholder=""
        type="text"
        name="heading_eng"
      />
      <InputComponent
        label="Heading Nepali"
        placeholder=""
        type="text"
        name="heading_nep"
      />
      <InputComponent
        label="Description English"
        placeholder=""
        type="text"
        name="caption_eng"
      />
      <InputComponent
        label="Description Nepali"
        placeholder=""
        type="text"
        name="caption_nep"
      />
      <InputComponent
        label="Survey Heading"
        placeholder=""
        type="text"
        name="survey_heading"
      />
      <ImagePickerComponent
        label="Main Image"
        color="bg-yellow-500"
        name="main_img"
        onImageChange={setMainImage}
      />

      <ImagePickerComponent
        label="Awareness Image"
        color="bg-red-500"
        name="awareness_img"
        onImageChange={setAwarenessImage}
      />
      <ImagePickerComponent
        label="Survey Image"
        color="bg-blue-800"
        name="survey_img"
        onImageChange={setSurveyImage}
      />
      <div className="mt-5">
        <ButtonComponent
          title="Save"
          color="bg-green-500"
          onClick={() => addQuestion()}
        />
      </div>
    </Form>
  );
}

export default AddQuestionForm;
