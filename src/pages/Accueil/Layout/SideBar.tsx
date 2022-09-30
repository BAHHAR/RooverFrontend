import { useState, useRef, useEffect } from "react";
import { X } from "react-bootstrap-icons";
import {Drawer} from "antd"
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
interface props{
  settoggleModal: () => any;
  toggle:boolean
}


function SideBar({settoggleModal,toggle}:props) {
  
  const auth = useAppSelector((state) => state.auth.user);
  const closeNav=()=>{
    //@ts-ignore
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(() => {
      settoggleModal()
    }, 500);
  }
  

  const onClose = () => {
    settoggleModal()
  };
  /* if(toggle){

    setTimeout(() => {
      //@ts-ignore
    document.getElementById("mySidenav").style.width = "250px";
  }, 20);
} */
  return (
    
<Drawer
placement={"left"}
closable={false}
onClose={onClose}
visible={toggle}

>
  <X style={{cursor:"pointer",color:"black"}} onClick={settoggleModal} size={35}/>
  <div className="p-4 mt-5">
  <NavLink to="/" activeClassName="active">
      <h6>Acceuil</h6>
  </NavLink>
  </div>
  <div className="p-4">
  <NavLink to="/Prestations" activeClassName="active">
      <h6>Préstations</h6>
  </NavLink>
  </div>
  <div className="p-4">
  <NavLink to="/Marques" activeClassName="active">
      <h6>Marques</h6>
  </NavLink>
  </div>
  <div className="p-4">
  <NavLink to="/Blogs" activeClassName="active">
      <h6>Blog</h6>
  </NavLink>
  </div>
  {
            auth && (
                <div className="p-4">
            <NavLink to="/Bookings" activeClassName="active">
                <h6>Mes Bookings</h6>
            </NavLink>
            </div>
            )
          }

</Drawer>
  )

  
}

export default SideBar