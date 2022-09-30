import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../../styles/DashBoard/index.scss";

import useAuth from "../../hooks/useAuth";

import MySpin from "../../components/Ui/Spin";


import { useAppSelector } from "../../store/hooks";

import Accueil from "./Pages/Accueil";
import Blogs from "./Pages/Blogs";
import Login from "./Pages/Login";
import Prestations from "./Pages/Prestations";
import Register from "./Pages/Register";
import Marques from "./Pages/Marques";
import FindGarages from "./Pages/FindGarages";
import Booking from "./Pages/Booking";


function App() {
  const auth = useAppSelector((state) => state.auth.user);
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [toggle_logo, setToggle_logo] = useState<boolean | null>(null);
  const { Logout } = useAuth();
  return (
    <div>
      <Router>
      
          <Switch>
            <Route path={"/"} component={Accueil} exact/>
            <Route path={"/Blogs"} component={Blogs} exact/>
            <Route path={"/Prestations"} component={Prestations} exact/>
            <Route path={"/Register"} component={Register} exact/>
            <Route path={"/Login"} component={Login} exact/>
            <Route path={"/Marques"} component={Marques} exact/>
            <Route path={"/FindGarages"} component={FindGarages} exact/>
            <Route path={"/Bookings"} component={Booking} exact/>
          </Switch>
          
    </Router>
    </div>
    
  );
}

export default App;
