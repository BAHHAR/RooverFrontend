import React,{useState} from 'react'
import { Table, Input, Button, Space, TableColumnsType, message, } from "antd";
import { IPrestations, IPrestationsCategory } from '../../interfaces/IPrestation';
import { TrashFill } from 'react-bootstrap-icons';
import { PrestationApi } from '../../store/apis/Prestations';

interface props{
  prestations:IPrestationsCategory[]
}

function PrestationsTable({prestations}:props) {

  const [DeletePrest]=PrestationApi.useDeletePrestMutation()
  const GarageDelete=(id)=>{
    DeletePrest({id:id})
    .then(()=>{
      message.success("Prestation a été supprimé avec succés")
      setTimeout(() => {
        window.location.reload()
      }, 100);
    })
  }

  const PrestationsTableColumns:TableColumnsType<IPrestationsCategory>=[
    {
      title:'catégorie',
      dataIndex:["prestationCategory","name"],
    },
    {
      title:'Prestation',
      dataIndex:'name',
      
    },
    {
      title:"actions",
      render:(data)=><TrashFill onClick={()=>GarageDelete(data?.id)} color='red' style={{cursor:'pointer'}} size={ 24}/>
    }
    
  ]
  return (
    <div className="table__container component">
    <div className="d-flex justify-content-between mb-3">
    <h6>
      Total : {prestations.length}
      </h6>
      </div>
    <div className="myTable"> 
         <Table
          columns={PrestationsTableColumns}
          dataSource={prestations}
          pagination={{
            showSizeChanger: true,
          }}
          bordered
        /> 

      </div>
      </div>
  )
}

export default PrestationsTable