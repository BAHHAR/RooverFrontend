import React from "react";
import { TextIndentLeft, TextIndentRight ,BoxArrowInLeft,ArrowCounterclockwise,CaretUpFill} from "react-bootstrap-icons";
import { useAppSelector } from "../../../store/hooks";
import { getImageUrl } from "../../../util/getImageUrl";
import { useHistory } from "react-router-dom"
import { authApi } from "../../../store/apis/auth";
import { message } from "antd";

interface props {
  toggle: boolean | null;
  toggle_logo:boolean | null;
  setToggle: (v: boolean | null) => any;
  setToggle_logo: (v: boolean | null) => any;
  Logout: () => any;
}

function Header({ setToggle, toggle,setToggle_logo,toggle_logo ,Logout}: props) {
  const auth = useAppSelector((state) => state.auth.user);
  const history=useHistory();
  const toggeleSidebare = () => {
    localStorage.setItem("Sidebare", JSON.stringify({ value: !toggle }));
    setToggle(!toggle);
  };

  
  const forget_password=()=>{
    history.push('/ForgetPassword')
  }

  const toggle_logo_header=()=>{
    setToggle_logo(!toggle_logo);
  }
  
  return (
    <header className={toggle ? " full__header header" : "header"}>
      {toggle ? (
        <TextIndentLeft
          onClick={toggeleSidebare}
          className="ico__toggele"
          size={26}
        />
      ) : (
        <TextIndentRight
          onClick={toggeleSidebare}
          className="ico__toggele"
          size={26}
        />
      )}
      <ul className="header__elements">
      <div className="">
        <div className={toggle_logo?"header__dropdown":"header__dropdown__none"}>
          <CaretUpFill className="header__caret" />
        <div className="header__logout" style={{cursor: "pointer"}} onClick={forget_password}>
        <ArrowCounterclockwise size={30} className="header__dropdown__icon"/>
       Change Password
         </div>
        <div className="header__logout" style={{cursor: "pointer"}} onClick={Logout}>
        <BoxArrowInLeft size={30} className="header__dropdown__icon"/>
       Logout
      </div>
        </div>
      </div>
      </ul>
    </header>
  );
}

export default Header;
