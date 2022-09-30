import React,{useState} from 'react'
import { vehiculeApi } from '../../../store/apis/Vehicules';
import MySpin from "../../../components/Ui/Spin";
import MyBreadcrumb from "../../../components/Ui/MyBreadcrumb";
import GaragesTable from '../../../components/tables/GaragesTable';
import { IAuth } from '../../../interfaces/IAuth';
import AddGaragiste from '../../../components/forms/AddGaragiste';
import {GeoAltFill} from 'react-bootstrap-icons'
import {Space} from 'antd'
import VehiculesTable from '../../../components/tables/VehiculesTable';
import AddVehicule from '../../../components/forms/AddVehicule';

function Vehicules() {
    const {data,isLoading}=vehiculeApi.useGetAllQuery()
    const [ToggleModal, setToggleModal] = useState(false)
    const OpenModal = () => {
      setToggleModal(!ToggleModal);
    };
     if(isLoading) return <MySpin />;
     return (
         <div>
           <MyBreadcrumb link={{ link: "/Vehicules", title: "Vehicules" }} />
           <button
          className="btn__primary"
          onClick={OpenModal}
        >
          Ajouter
        </button>
          <VehiculesTable vehicules={data?.vehicules!}  />
          {
          ToggleModal && (
            //@ts-ignore
            <AddVehicule toggleModal={ToggleModal} settoggleModal={OpenModal}/>
          )
        }
         </div>
     )
}

export default Vehicules