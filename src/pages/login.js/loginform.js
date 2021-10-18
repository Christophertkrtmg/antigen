import React, { useContext, useState } from "react";
import {
  Form,
  TextParser,
  useFormController,
  useFormSubmit,
} from "@razzib/react-kit";
import { useHistory } from "react-router-dom";
import InputComponent from "../../components/input/inputComponent";
import ButtonComponent from "../../components/buttons/button";
import { AUTH_API } from "../../api";
import { AppContext } from "../../context/app.context";
import DropdownComponent from "../../components/input/dropdownComponent";
import jwt from "jwt-decode";
import SimpleAlerts from "../../components/alerts";
import BounceLoader from "../../components/buttons/loaders";
import moment from "moment";

const def = {
  email: { parser: new TextParser() },
  password: { parser: new TextParser() },
  // userType: { parser: new TextParser() },
};

function Loginform() {
  const { setToken, setSession, session, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const controller = useFormController(def, {}, `${AUTH_API}/user/login`);

  const submit = useFormSubmit(controller, (response) => {
    onLogin(response);
  });

  const onLogin = async (response) => {
    setLoading(true);
    if (response.code === "200") {
      setToken(response.token);
      localStorage.setItem("ggdashtok", JSON.stringify(response.token));
      setToken(response.token);
      var user = jwt(response.token);
      localStorage.setItem(
        "ggdashuser",
        JSON.stringify({
          user: user,
          isAdmin: true,
          loggedintime: moment().fromNow,
        })
      );
      setSession({ user: user, isAdmin: true });
      setLoading(false);
    } else if (response.code === "212") {
      alert(response.message);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(response);
    }
  };

  return (
    <Form className="mt-8 space-y-6" controller={controller}>
      <InputComponent
        label="Email"
        placeholder="mail@gmail.com"
        type="email"
        name="email"
      />
      <InputComponent
        label="Password"
        placeholder="Enter Password"
        type="password"
        name="password"
      />
      <div className="">
        {loading ? (
          <BounceLoader />
        ) : (
          <ButtonComponent
            title="Sign In"
            rounded={true}
            onClick={() => submit()}
          />
        )}
      </div>
    </Form>
  );
}

export default Loginform;
