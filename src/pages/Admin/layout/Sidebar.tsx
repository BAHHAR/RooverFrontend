import React from "react";
import { NavLink } from "react-router-dom";
import {
  People,
  PersonBadge,
  Truck,
  FileEarmarkTextFill,
  BoxArrowLeft,
  Stack,
  Quote,
  CalendarCheckFill
} from "react-bootstrap-icons";
import { useAppSelector } from "../../../store/hooks";
import { getImageUrl } from "../../../util/getImageUrl";

interface props {
  toggle: boolean | null;
  Logout: () => any;
}
const Sidebar = ({ toggle ,Logout}: props) => {

  const auth = useAppSelector((state) => state.auth.user);
  return (
    <div className={toggle ? "min__SideBar SideBar" : "SideBar"}>
      <div className="sidebar__logo ">
        <img src="/assets/images/logo.png" alt="ISUZUA" className="img-fluid" />
      </div>
     
      <div className="sidebar__menu">
        <ul>
          <li className="sidebar__menu__element ">
            <NavLink to="/admin/Garages" activeClassName="active">
              
              <PersonBadge className="sidebar__menu__element__icon" />
              Garages
            </NavLink>
            
          </li>
          {
            auth?.userType?.name!=="garagiste" && (
              <>
              <li className="sidebar__menu__element ">
            <NavLink to="/admin/Utilisateurs" activeClassName="active">
              <People className="sidebar__menu__element__icon" />
              Utilisateur
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
          <NavLink to="/admin/Vehicules" activeClassName="active">
            <Truck className="sidebar__menu__element__icon" />
            Voitures
          </NavLink>
        </li>
        <li className="sidebar__menu__element ">
            <NavLink to="/admin/Prestations" activeClassName="active">
              <Stack className="sidebar__menu__element__icon" />
              Préstations
            </NavLink>
          </li>
        </>
            )
          }
          
          {/* <li className="sidebar__menu__element ">
            <NavLink to="/Factures" activeClassName="active">
              <FileEarmarkTextFill className="sidebar__menu__element__icon" />
              Factures
            </NavLink>
          </li> */}
          
          
          <li className="sidebar__menu__element ">
            <NavLink to="/admin/Bookings" activeClassName="active">
              <CalendarCheckFill className="sidebar__menu__element__icon" />
              Bookings
            </NavLink>
          </li>
          <li className="sidebar__menu__element ">
            <NavLink to="/admin/Blogs" activeClassName="active">
              <Quote className="sidebar__menu__element__icon" />
              Blogs
            </NavLink>
          </li>
          
          <li className="sidebar__menu__element " onClick={Logout}>
            <NavLink to="/"  activeClassName="" >
              <BoxArrowLeft className="sidebar__menu__element__icon" />
              Se déconnecter
            </NavLink>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default React.memo(Sidebar);
