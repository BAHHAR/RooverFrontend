import { Space } from 'antd';
import React from 'react'
import { BoxArrowInLeft ,BoxArrowInRight} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAppSelector } from '../../../store/hooks';

interface props{
    color:string;
}

function LoginButton({color}:props) {
    const auth = useAppSelector((state) => state.auth.user);
    const {Logout} =useAuth()
    if(auth)
        return (
            <Space size={"middle"} style={{cursor:"pointer"}}>
                <BoxArrowInRight color={color} size={18}/>
                <NavLink onClick={Logout} style={{color:color}}  to={"/"}>Se déconnecter</NavLink>

            </Space>
        )
  return (
    <Space size={"middle"} style={{cursor:"pointer"}}>
                <BoxArrowInRight color={color} size={18}/>
                <NavLink  style={{color:color}}  to={"/Login"}>Se connecter</NavLink>
            </Space>
  )
}

export default LoginButton