import { useHistory, Redirect } from "react-router-dom";
import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

export const AppContext = createContext({});

const AppContextComponent = (props) => {
  const [session, setSession] = useState({ user: {}, isAdmin: false });
  const [token, setToken] = useState("");
  const [mode, setMode] = useState(false);
  let history = useHistory();
  const [goalValue, setGoalValue] = useState(50000);
  const [collected, setCollected] = useState(18700);

  const toogleMode = () => setMode(!mode);

  const logout = () => {
    setSession({ isAdmin: false, user: {}, loggedintime: "" });
    localStorage.removeItem("ggdashtok");
    localStorage.removeItem("ggdashuser");
    <Redirect to="/" />;
  };

  const checkSession = () => {
    var usertoken = localStorage.getItem("ggdashtok");
    var userSession = JSON.parse(localStorage.getItem("ggdashuser"));
    setToken(usertoken);
    setSession(userSession);
  };

  const stateValue = {
    session,
    setSession,
    checkSession,
    mode,
    toogleMode,
    token,
    setToken,
    logout,
    goalValue,
    setGoalValue,
    collected,
    setCollected,
  };

  return (
    <AppContext.Provider value={stateValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;
