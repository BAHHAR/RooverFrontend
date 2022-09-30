import moment from 'moment'
import React from 'react'
import { Table, Avatar, Button, Space, TableColumnsType, TableColumnType, message } from "antd";
import {TrashFill,PencilSquare} from "react-bootstrap-icons"
import { IVehicule } from '../../interfaces/IVehicule'
import { vehiculeApi } from '../../store/apis/Vehicules';
interface props{
    vehicules:IVehicule[]
}
moment.locale("fr")
function VehiculesTable({vehicules}:props) {
    const [DeleteVeh]=vehiculeApi.useDeleteVehiculeMutation()
    const DeleteVehicule=(id)=>{
        DeleteVeh({id:id})
        .then(()=>{
            message.success("Vehicule a été supprimé avec succés")
            
        })
        
    }
    const vehiculeColumn:TableColumnsType<IVehicule>=[
        {
            title:"nom",
            dataIndex:"name"
        },
        {
            title:"Modèle",
            dataIndex:"carModel",
            render:(item)=>item?.name
        },
        {
            title:"Marque",
            dataIndex:"carModel",
            render:(item)=>item?.carMake?.name
        },
        {
            title:"Carburant",
            dataIndex:"carFuel",
            render:(item)=>item?.name
        },
        {
            title:"date 1",
            dataIndex:"date1",
            render:(i)=>moment(i).format("MM/YYYY")
        },
        {
            title:"date 2",
            dataIndex:"date2",
            render:(i)=>moment(i).format("MM/YYYY")
        },
        {
            title:"actions",
            render:(data)=><TrashFill onClick={()=>DeleteVehicule(data.id)} color='red' style={{cursor:'pointer'}} size={ 24}/>
        }
        
    ]
    return (
        <div className="table__container component">
    <div className="d-flex justify-content-between mb-3">
    <h6>
      Total : {vehicules?.length}
      </h6>
      </div>
    <div className="myTable"> 
         <Table
          columns={vehiculeColumn}
          pagination={{
            showSizeChanger: true,
          }}
          bordered
          dataSource={vehicules}
        /> 

      </div>
      </div>
    )
}

export default VehiculesTable