import React from "react";
import { Redirect, Route, Switch } from "react-router";
import MainComponent from "./components/MainComponent/MainComponent";
import AutorisationFormComponent from "./components/autorisationComponent/autorisationComponent";
import RegistrationFormComponent from "./components/RegistrationComponent/RegistrationComponent";

import "./App.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/registration">
          <RegistrationFormComponent />
        </Route>
        <Route path="/autorisation">
          <AutorisationFormComponent />
        </Route>
        <Route path="/main">
          <MainComponent />
        </Route>
        <Redirect from="/" to="/registration"></Redirect>
      </Switch>
    </div>
  );
};

export default App;
