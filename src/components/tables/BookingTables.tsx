import React,{useState} from 'react'
import { Table, Input, Button, Space, TableColumnsType, Popover, Tag, message } from "antd";
import { IBookingAdmin } from '../../interfaces/IBooking';
import moment from 'moment';
import { useAppSelector } from '../../store/hooks';
import { Check ,X} from 'react-bootstrap-icons';
import { BookingApi } from '../../store/apis/Bookings';
moment.locale("fr")
interface props{
    bookings:IBookingAdmin[]
}



function BookingTables({bookings}:props) {
  const auth = useAppSelector((state) => state.auth.user);
  const DataBookings=auth?.userType?.name==="garagiste"?bookings.filter((i)=>i?.Garage?.userId===auth.id):bookings
  const [UpdateStatus]=BookingApi.useUpdateStatusMutation()

  let toggle=false

  const HandleUpdateStatus=(status,id)=>{
    UpdateStatus({
      id:id,
      status:status
    })
    .then(()=>{
      message.success(status==="accept"?"booking a été accepté":"booking a été refusé")
      window.location.reload()
    })
  }

    let BookingTableColumns:TableColumnsType<IBookingAdmin>=[
        {
            title:"date",
            dataIndex:'date',
            render:(i)=>moment(i).format("D/MM/YYYY")
        },
        {
          title:'Garage',
          dataIndex:["Garage","name"]
        },
        {
          title:'Nom voiture',
          dataIndex:["CarEngine","name"]
        },
        {
            title:'marque voiture',
            dataIndex:["CarEngine","carModel","carMake","name"]
        },
        {
          title:"prestation",
          dataIndex:["Garage","prestations"],
          render:(i)=>i?.map((j)=><p>{j?.prestation?.name}</p>)
        },
        {
            title:"prestation catégorie",
            dataIndex:["Garage","prestations"],
          render:(i)=>i?.map((j)=><p>{j?.prestation?.prestationCategory?.name}</p>)
        },
        {
            title:"Utilisateur",
            dataIndex:'user',
            render:(i)=>i?.lastName+' '+i?.firstName
        },
        {
          title:"Status",
          dataIndex:"status",
          render:(i)=>{
            if(i==="waiting")
              return <Tag color={"orange"}>waiting</Tag>
            else if(i==="accept")
              return <Tag color="green">Accepté</Tag>
            return <Tag color="red">Refusé</Tag>
          }
        },
        
        
      ]

  if(!toggle && auth?.userType?.name==="garagiste"){
      BookingTableColumns.push({
        title:"actions",
        render:(i)=>{
           return i?.status==="waiting"?
           <Space size={"large"}>

           <Popover content="accepté">
             <Check style={{cursor:"pointer"}} onClick={()=>HandleUpdateStatus("accept",i?.id)} size={24} color="green"/>
           </Popover>
          
            <Popover content="refusé">
              <X style={{cursor:"pointer"}} onClick={()=>HandleUpdateStatus("refuse",i?.id)} size={24} color="red"/>
            </Popover>
             </Space>
            :""
        }
      })
      toggle=true
  }    

      return (
        <div className="table__container component">
        <div className="d-flex justify-content-between mb-3">
        <h6>
          Total : {bookings.length}
          </h6>
          </div>
        <div className="myTable"> 
             <Table
              columns={BookingTableColumns}
              dataSource={DataBookings}
              pagination={{
                showSizeChanger: true,
              }}
              bordered
            /> 
    
          </div>
          </div>
      )
}

export default BookingTables