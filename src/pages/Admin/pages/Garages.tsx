import React,{useState} from 'react'
import { garageApi } from '../../../store/apis/garagiste';
import MySpin from "../../../components/Ui/Spin";
import MyBreadcrumb from "../../../components/Ui/MyBreadcrumb";
import GaragesTable from '../../../components/tables/GaragesTable';
import { IAuth } from '../../../interfaces/IAuth';
import AddGaragiste from '../../../components/forms/AddGaragiste';
import {GeoAltFill} from 'react-bootstrap-icons'
import {Space} from 'antd'
import { NavLink } from "react-router-dom";
import MapAllGarages from './MapAllGarages';
function Garages() {
    const {data,isLoading}=garageApi.useGetAllQuery()
   const [ToggleModal, setToggleModal] = useState(false)
   const [ToggleModalMap, setToggleModalMap] = useState(false)
    const OpenModal = () => {
      setToggleModal(!ToggleModal);
    };

   const OpenModalMap = () => {
      setToggleModalMap(!ToggleModalMap);
    };
    if(isLoading) return <MySpin />;
    return (
        <div>
          <MyBreadcrumb link={{ link: "/Garages", title: "Garages" }} />
          <button
          className="btn__primary"
          onClick={OpenModal}
        >
          Ajouter
        </button>
        <button className='btn__primary ml-5 '
          onClick={OpenModalMap}
        >
                <Space size={'small'}>
                <GeoAltFill size={15} style={{marginTop:-2}}/>
                Map
                </Space>
        </button>

                
          <GaragesTable garages={data?.garages!}/>
        {
          ToggleModal && (
            //@ts-ignore
            <AddGaragiste DataToMode={null} edit={false} toggleModal={ToggleModal} settoggleModal={OpenModal}/>
          )
        }
        {
          ToggleModalMap && (
            //@ts-ignore
            <MapAllGarages garages={data?.garages!} toggleModal={ToggleModalMap} settoggleModal={OpenModalMap}/>
          )
        }
        </div>
    )
}

export default Garages