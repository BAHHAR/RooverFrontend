import React,{useState} from 'react'
import { IGaragiste } from '../../interfaces/IGaragiste'
import moment from "moment";
import "moment/locale/fr";
import { Table, Avatar, Button, Space, TableColumnsType, TableColumnType, Popover, message } from "antd";
import { Link } from "react-router-dom";
import { getImageUrl } from '../../util/getImageUrl';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import AddGaragiste from '../forms/AddGaragiste';
import { useAppSelector } from '../../store/hooks';
import { garageApi } from '../../store/apis/garagiste';
interface porps{
    garages:IGaragiste[]
}
moment.locale('fr')
function GaragesTable({garages}:porps) {
    const auth = useAppSelector((state) => state.auth.user);
    const [ToggleModal, setToggleModal] = useState(false)
    const [edit, setedit] = useState(false)
    const [DataToModel, setDataToModel] = useState()

    const userType=auth?.userType?.name
    const DataGarages=userType==="garagiste"?garages.filter((i)=>i?.user?.id === auth?.id):garages  
    const OpenModal = () => {
      setToggleModal(!ToggleModal);
        
    };

    const [DeleteGarage]=garageApi.useDeleteGarageMutation()

    const GarageDelete=(id)=>{
        DeleteGarage({id:id})
        .then(()=>{
            message.success("Garage a été supprimé avec succés")
            setTimeout(() => {
                window.location.reload()  
            }, 100);
        })
    }

    const garagisteColumn:TableColumnsType<IGaragiste>=[
        {
            title:"logo",
            dataIndex:"logo",
            render: (txt) => <Avatar src={getImageUrl(txt)} size="large" />
        },
            {
                title:"date",
                dataIndex:'openDate',
                render:(i)=>moment(i).format("DD/MM/YYYY")
            },
            {   
                title:"nom du garage",
                render:(i)=>{
                    return  <Link
            to={{
              pathname: `/admin/Garage/${i?.id}`,
            }}
            className="btn__link"
          >
            {i?.name}
          </Link>
                }           
             },
             {
                title:"Propriétaire",
                render:(i)=>i?.user?.firstName+" "+i?.user?.lastName
             },
            {
                title:"email",
                dataIndex:'email'
            },
            {
                title:"phone",
                dataIndex:"phone"
                
            },
            {
                title:"adresse",
                dataIndex:'address'
            },
            {
                title:"région",
                dataIndex:'district',
                render:(i)=>i?.name
            },
            {
                title:"ville",
                dataIndex:'district',
                render:(i)=>i?.city?.name
            },
            {
                title:"actions",
                render:(data)=>{
                    return(<Space size={"large"}>
                    
                        <Popover content="Modifier">
                            <PencilSquare onClick={()=>{
                                OpenModal()
                                setDataToModel(data)
                                setedit(true)
                            }} style={{cursor:"pointer"}} color='yellow' size={25}/>
                        </Popover>
                        <Popover content="Supprimer">
                            <TrashFill 
                                onClick={()=>GarageDelete(data?.id)}
                            color='red' style={{cursor:'pointer'}} size={ 24}/>
                        </Popover>
                        </Space>
                    )
                }
            }
    ]

    return (
        <div className="table__container component">
        <div className="d-flex justify-content-between mb-3">
        <h6>
          Total : {garages?.length}
          </h6>
          </div>
        <div className="myTable"> 
             <Table
              columns={garagisteColumn}
              pagination={{
                showSizeChanger: true,
              }}
              bordered
              dataSource={DataGarages}
            /> 
    
          </div>
          {
          ToggleModal && (
            <AddGaragiste DataToMode={DataToModel} edit={true} toggleModal={ToggleModal} settoggleModal={OpenModal}/>
          )
        }
          </div>
      )
}

export default GaragesTable