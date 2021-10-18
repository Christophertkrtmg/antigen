import React from "react";
import {
  Form,
  TextParser,
  useFormController,
  useFormSubmit,
} from "@razzib/react-kit";
import InputComponent from "../../components/input/inputComponent";
import { AUTH_API } from "../../api";
import ImagePickerComponent from "../../components/input/imageUploadComponent";
import ButtonComponent from "../../components/buttons/button";
import DropdownComponent from "../../components/input/dropdownComponent";

function AddDashUserForm({hide}) {
  const def = {
    email: { parser: new TextParser() },
    password: { parser: new TextParser() },
    name: { parser: new TextParser() },
    usertype: { parser: new TextParser() },
  };
  const controller = useFormController(
    def,
    {},
    `${AUTH_API}/user/registeruser`
  );

  const submit = useFormSubmit(controller, (response) => {
    console.log(response);
    if (response.code == "200") {
      alert("Dashboar User Added Successfully");
      hide();
    } else if (response.code == "211") {
      alert("Please add all Details");
    }
  });

  return (
    <Form controller={controller}>
      <InputComponent
        label="Email"
        placeholder="Enter User Email"
        type="text"
        name="email"
      />
      <InputComponent
        label="Password"
        placeholder="Enter Password"
        type="password"
        name="password"
      />
      <InputComponent
        label="Name"
        placeholder="Enter Name"
        type="text"
        name="name"
      />
      <DropdownComponent
        name="usertype"
        dropdownItems={["superadmin", "admin"]}
      />
      <div className="mt-5">
        <ButtonComponent
          title="Save"
          color="bg-green-500"
          onClick={() => submit()}
          // onClick={() => console.log(controller.state)}
        />
      </div>
    </Form>
  );
}

export default AddDashUserForm;
