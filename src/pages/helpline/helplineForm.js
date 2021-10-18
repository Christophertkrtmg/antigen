import { useContext, useState } from "react";
import { Form, TextParser, useFormController } from "@razzib/react-kit";
import InputComponent from "../../components/input/inputComponent";
import { HELPLINE_API } from "../../api";
import ImagePickerComponent from "../../components/input/imageUploadComponent";
import ButtonComponent from "../../components/buttons/button";
import { AppContext } from "../../context/app.context";
import { appendFormData } from "../../components/utils";
import axios from "axios";
import BounceLoader from "../../components/buttons/loaders";

function AddHelplineForm({ hide, getHelpLineData }) {
  const { token } = useContext(AppContext);
  const [images, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const def = {
    organization_name_nep: { parser: new TextParser() },
    organization_name_eng: { parser: new TextParser() },
    help_type: { parser: new TextParser() },
    contact: { parser: new TextParser() },
    location: { parser: new TextParser() },
    helplinelogo: { parser: new TextParser() },
  };

  const controller = useFormController(
    def,
    {},
    `${HELPLINE_API}/registerhelpline`
  );

  const addHelplines = async () => {
    setLoading(true);
    const payload = {
      ...controller.state,
      token: token,
      helplinelogo: images,
      registerfrom: "dashboard",
    };
    const data = appendFormData(payload);
    const response = await axios.post(`${HELPLINE_API}/registerhelpline`, data);
    if (response.data.code === 200) {
      setTimeout(() => {
        setLoading(false);
        hide();
        getHelpLineData();
      }, 2000);
    } else if (response.data.code === 322) {
      alert("Please Upload Image");
      setLoading(false);
    } else if (response.data.code === 211) {
      alert("Please Add All Information");
      setLoading(false);
    } else if (response.data.code === 201) {
      alert("Please Check your details and write informations correctly");
      setLoading(false);
    }
    console.log(response.data);
  };

  return (
    <Form controller={controller}>
      <InputComponent
        label="Organization Name Nepali"
        placeholder="Add Organizaton Name In Nepali"
        type="text"
        name="organization_name_nep"
      />
      <InputComponent
        label="Organization Name English"
        placeholder="Add Organizaton Name In English"
        type="text"
        name="organization_name_eng"
      />
      <InputComponent
        label="Help Type"
        placeholder="Add HelpType"
        type="text"
        name="help_type"
      />
      <InputComponent
        label="Contact"
        placeholder="Add Contact Number"
        type="text"
        name="contact"
      />
      <InputComponent
        label="Location"
        placeholder="Add Location"
        type="text"
        name="location"
      />
      <ImagePickerComponent
        label="Helpline Logo"
        color="bg-yellow-500"
        name="helplinelogo"
        onImageChange={setImage}
      />
      <div className="mt-5">
        {loading ? (
          <BounceLoader />
        ) : (
          <ButtonComponent
            title={"Save"}
            color="bg-green-500"
            onClick={() => addHelplines()}
          />
        )}
      </div>
    </Form>
  );
}

export default AddHelplineForm;
