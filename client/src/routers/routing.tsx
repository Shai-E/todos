import React from "react";
// import { Route, Switch } from 'react-router';
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../components/Reusable/AppLayout/AppLayout";

function Routing() {
  return (
    <Switch>
      <Route path="/home" render={() => <AppLayout headerTitle={"Add Task"} />} />
      <Route path="/edit-task/:taskId" render={() => <AppLayout headerTitle={"Edit Task"} />} />
      <Redirect path="*" to="/home" />
    </Switch>
  );
}

export default Routing;
