// router.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login2 from "../paginas/login";
import Registro from "../paginas/registroUsuario";
import Tabla from '../paginas/tabla'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login2} />
        <Route path="/registro" component={Registro} />
        <Route path="/tabla" component={Tabla} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
