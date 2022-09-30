import React,{useState} from 'react'
import moment from "moment";
import "moment/locale/fr";
import { Table, Avatar, Button,Tag, Space, TableColumnsType, TableColumnType, message, Popover } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from '../../util/getImageUrl';
import { IAuth } from '../../interfaces/IAuth';
import {TrashFill,PencilSquare,Check} from "react-bootstrap-icons"
import { userApi } from '../../store/apis/Users';
import { useAppSelector } from '../../store/hooks';
import { authApi } from '../../store/apis/auth';
interface porps{
    users:IAuth[]
}
moment.locale('fr')
function UsersTable({users}:porps) {
    const [deleteUser]=userApi.useDeleteUserMutation()
    const [activateUser]=authApi.useActivateUserMutation()

    const HandleActivate=(id)=>{
        activateUser({id:id})
        .then(()=>{
            message.success("L'utilisateur a été activé avec succés")
            window.location.reload()
        })
    }

    const handleDelete=(id:any)=>{
        deleteUser({id:id.toString()})
        .then(()=>{
            message.success("utilisateur a été supprimé avec succes")
            setTimeout(() => {
                window.location.reload()
            }, 100);
        })
    }
  
   const userColumn:TableColumnsType<IAuth>=[
        
           
            {   
                title:"Nom",
                 dataIndex:"lastName"      
             },
             {   
                title:"prénom",
                 dataIndex:"firstName"      
             },
            {
                title:"email",
                dataIndex:'email'
            },
           
            {
                title:"Rôle",
                dataIndex:['userType',"name"],
            },
            {
                title:"Status",
                dataIndex:"activated",
                render:(i)=><Tag color={i?"green":"red"}>{i?"Activé":"n'est pas activé"}</Tag>
            }
            ,{
                title:"Actions",    
                render:(i:any)=>{
                    return (
                        <Space size={"large"}>
                            <PencilSquare size={24} style={{color:"#1CBFFF",marginLeft:18,cursor:"pointer"}}/>
                            <TrashFill onClick={()=>handleDelete(i.id)} size={24} color="red" style={{cursor:"pointer"}}/>
                            {
                                !i?.activated && (
                                    <Popover content="Activer l'utilisateur">
                                        <Check onClick={()=>HandleActivate(i?.id.toString())} color='green' size={24} style={{cursor:"pointer"}}/>
                                    </Popover>
                                )
                            }
                        </Space>
                    )
                }
            }
    ]

    return (
        <div className="table__container component">
        <div className="d-flex justify-content-between mb-3">
        <h6>
          Total : {users?.length}
          </h6>
          </div>
        <div className="myTable"> 
             <Table
              columns={userColumn}
              pagination={{
                showSizeChanger: true,
              }}
              bordered
              dataSource={users}
            /> 
    
          </div>
          </div>
      )
}

export default UsersTable