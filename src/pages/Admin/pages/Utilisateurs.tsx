import React,{useState,useEffect} from 'react'
import { garageApi } from '../../../store/apis/garagiste';
import MySpin from "../../../components/Ui/Spin";
import MyBreadcrumb from "../../../components/Ui/MyBreadcrumb";
import GaragesTable from '../../../components/tables/GaragesTable';
import { IAuth } from '../../../interfaces/IAuth';
import AddGaragiste from '../../../components/forms/AddGaragiste';
import {GeoAltFill} from 'react-bootstrap-icons'
import {Space} from 'antd'
import { userApi } from '../../../store/apis/Users';
import UsersTable from '../../../components/tables/UsersTable';
import AddUser from '../../../components/forms/AddUser';
import axios from "axios"
function Garages() {
    let {data,isLoading}=userApi.useGetAllQuery()
    const [Data, setData] = useState()
    const [ToggleModal, setToggleModal] = useState(false)
    const [edit, setedit] = useState(false)
     const OpenModal = () => {
       setToggleModal(!ToggleModal);
     };
    
     
     

    if(isLoading) return <MySpin />;
    return (
        <div>
          <MyBreadcrumb link={{ link: "/Utilisateurs", title: "Utilisateurs" }} />
          <button
          className="btn__primary"
          onClick={OpenModal}
        >
          Ajouter
        </button>
          <UsersTable users={data?.users!}/>
       {
        ToggleModal && (
          <AddUser edit={edit} settoggleModal={OpenModal} toggleModal={ToggleModal} DataToMode={null}/>
        )
       }
        </div>
    )
}

export default Garages