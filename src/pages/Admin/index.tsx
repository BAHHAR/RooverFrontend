import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../../styles/DashBoard/index.scss";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import useAuth from "../../hooks/useAuth";

import MySpin from "../../components/Ui/Spin";

import ChangePassword from "../ChangePassword";
import { useAppSelector } from "../../store/hooks";



const ForgetPassword = React.lazy(() => import("../ForgetPassword"));
const Garages=React.lazy(()=>import("../Admin/pages/Garages"))
const Garage=React.lazy(()=>import("../Admin/pages/Garage"))
const Users=React.lazy(()=>import("../Admin/pages/Utilisateurs"))
const Vehicules=React.lazy(()=>import("../Admin/pages/Vehicules"))
const Prestations=React.lazy(()=>import("../Admin/pages/Prestations"))
const Bookings=React.lazy(()=>import("../Admin/pages/Bookings"))

function App() {
  const auth = useAppSelector((state) => state.auth.user);
  const [toggle, setToggle] = useState<boolean | null>(null);
  const [toggle_logo, setToggle_logo] = useState<boolean | null>(null);
  const { Logout } = useAuth();
  useEffect(() => {
    const sidebar = JSON.parse(localStorage.getItem("Sidebare") as any);
    if (sidebar) setToggle(sidebar["value"]);
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/admin/ChangePassword" component={ChangePassword} exact/>
      </Switch>
                    <div className="Student__area">
        <Header toggle={toggle} setToggle={setToggle} Logout={Logout} toggle_logo={toggle_logo} setToggle_logo={setToggle_logo}/>
        <Sidebar toggle={toggle} Logout={Logout}/>
        <div className={toggle ? " full__content content" : "content"}>
          <Switch>
            <Route path={"/admin/Garages"} component={Garages} exact/>
            <Route path={"/admin/Garage/:id"} component={Garage} exact/>
            <Route path={"/admin/Utilisateurs"} component={Users} exact/>
            <Route path={"/admin/Vehicules"} component={Vehicules} exact/>
            <Route path={"/admin/Prestations"} component={Prestations} exact/>
            <Route path={"/admin/Bookings"} component={Bookings} exact/>
          </Switch>
          {/* {isLoading ? (
            <MySpin />
          ) : (
            <Switch>

              
              <Route path="/" component={Clients} exact />

              <Route path="/Commerciaux" component={Commerciaux} exact />
             <Route path="/ForgetPassword" component={ForgetPassword} exact />
            </Switch>
          )} */}
          </div> </div>
    </Router>
  );
}

export default App;
