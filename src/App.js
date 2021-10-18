import "./index";
import Routes from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "./context/app.context";

function App() {
  return (
    <AppContext>
      <Router>
        <Routes />
      </Router>
    </AppContext>
  );
}

export default App;
