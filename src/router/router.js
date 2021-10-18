import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/login.js";
import Users from "../pages/users/index.js";
import MainLayout from "../components/layouts/main_layout";
import DashboardLanding from "../pages/landing/index.js";
import Panic from "../pages/panic/index";
import Qns from "../pages/qns/index";
import BloodData from "../pages/bloodData/index.js";
import { AppContext } from "../context/app.context.js";
import HelpLineMain from "../pages/helpline/index.js";
import DashUsers from "../pages/dashUser/index.js";
import PhotoVideoMain from "../pages/photoVideo/index.js";

function Routes() {
  const { session, checkSession } = useContext(AppContext);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        {session && session.isAdmin ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route path="/dashboard">
        {session && session.isAdmin ? <DashboardRoutes /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

function DashboardRoutes() {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/dashboard/users" component={Users} />
        <Route exact path="/dashboard/panic" component={Panic} />
        <Route exact path="/dashboard/bloodData" component={BloodData} />
        <Route path="/dashboard/dashUser" component={DashUsers} />
        <Route exact path="/dashboard/qns" component={Qns} />
        <Route path="/dashboard/questions" component={Users} />
        <Route path="/dashboard/helpline" component={HelpLineMain} />
        <Route path="/dashboard/photoVideo" component={PhotoVideoMain} />
        <Route path="/dashboard/" component={DashboardLanding} />
      </Switch>
    </MainLayout>
  );
}

export default Routes;
