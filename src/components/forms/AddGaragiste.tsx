import React,{ useState,useEffect,useRef } from "react";
import { Modal, Select, Form, Input, Upload, message ,DatePicker,Space,Steps,Popover,TimePicker,TableColumnsType } from "antd";
import { MiscellaneousApi } from "../../store/apis/miscellaneous";
import GoogleMapReact from 'google-map-react';
import { getImageUrl } from "../../util/getImageUrl";
import { userApi } from "../../store/apis/Users";
import {GeoAltFill} from "react-bootstrap-icons"
import { garageApi } from "../../store/apis/garagiste";
import moment from 'moment';
import { PrestationApi } from "../../store/apis/Prestations";
import { authApi } from "../../store/apis/auth";
import  { UploadFile,UploadChangeParam } from 'antd/es/upload/interface';
import {UploadProps } from 'antd/es/upload';
import { vehiculeApi } from "../../store/apis/Vehicules";
import { useAppSelector } from "../../store/hooks";
const { Step } = Steps;
const format = 'HH:mm';
interface props {
  settoggleModal: () => any;
  toggleModal : boolean;
  edit:boolean;
  DataToMode:any|null
}
const AnyReactComponent = ({ lat,lng,text }) => <div>
  <Popover content={text}>
  <GeoAltFill size={18} color="red"/>
  </Popover>
</div>;
const AddGaragiste = ({ toggleModal,settoggleModal,edit ,DataToMode}: props) => {
  const auth = useAppSelector((state) => state.auth.user);
  const defaultProps = {
    center: {
      lat: 31.791702,
      lng: -7.09262
    },
    zoom: 11
  };
  const { Option } = Select;
  const [form] = Form.useForm();
  const{data:miscellaneous}=MiscellaneousApi.useGetAllQuery()
  const {data:Users}=userApi.useGetAllQuery()
  const Garagistes=Users?.users.filter((i)=>i?.['userType']?.name==="garagiste")
  const [AddUser]=userApi.useAddUserMutation()
  const [AddGarage]=garageApi.useAddGarageMutation()
  const [AddLogo]=garageApi.useAddLogoMutation()
  const [addImage]=garageApi.useAddImageMutation()
  const [addGaragePrest]=garageApi.useAddGaragePrestMutation()
  const  [addGarageBusinessHour]=garageApi.useAddBusinesshourMutation()
  const [UpdateGaragiste]=authApi.useUpdateGaragisteMutation()
  const [UpdateGarage]=garageApi.useUpdateGarageMutation()
  const [deleteImage]=garageApi.useImageDeleteMutation()
  const {data:Marques}=vehiculeApi.useGetMarqueQuery()
  const Models=vehiculeApi.useGetModelQuery().data
  const [MarqueID, setMarqueID] = useState("")
  const DataModels=Models?.filter((i)=>i.carMakeId===MarqueID)
  const districts=miscellaneous?.miscellaneous?.district
  const prestationCategories=PrestationApi.useGetCategoriesQuery().data?.prestations
  const services=PrestationApi.useGetAllQuery().data?.prestations
  const [index, setindex] = useState(0)
  const [id, setid] = useState(0)
  const [Coord, setCoord] = useState({
    lat:33.5731104,
    lng:-7.5898434
  })
  
  const [ClickMap, setClickMap] = useState(false)

  const [districtId, setdistrictId] = useState("")
  const [garageId, setgarageId] = useState(0)
  const [prestationCategorieId, setprestationCategorieId] = useState("")
  const servicesFiltrer=services?.filter((i)=>i?.prestationCategory?.name===prestationCategorieId)
  
  const BusinessHour=edit?DataToMode.businessHours[0]:[]

   
   const DataImages:UploadFile[]=edit?DataToMode.images.map((i,index)=>{
    let dataImages:UploadFile={
      uid:(-1-index).toString(),
      name:`image${index}.jpg`,
      url:getImageUrl(i?.path),
      status:"done"
     }
     return dataImages
   }) :[]
   
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos)=>{
        setCoord({
          lat:pos.coords.latitude,
          lng:pos.coords.longitude
        })
      })
  }, [])
  
  
  const handleAddServie=()=>{
    let dataService:any={}
    form
      .validateFields()
      .then((data)=>{
          dataService['price']=data['price']
          dataService['prestationId']=data['prestationId']
          dataService['garageId']=garageId.toString()
          addGaragePrest(dataService)
          .then(()=>message.success("Service a été ajouté avec succès"))
      })
  }

 
  const HandelSubmit = (methode?: string | any) => {
    
     if(index===0){
      form.validateFields()
      .then((data)=>{
        if(edit){
          data['lat']=Coord.lat
          data['lng']=Coord.lng
          data['districtId']=districtId
          data['userId']=id
          data.openDate=new Date(data.openDate).toISOString()
          UpdateGarage(data)
          .then((i)=>{
            message.success("Garage a été ajouté avec succès")
            //@ts-ignore
            setgarageId(i.data.id)
            settoggleModal()
          })
        }else{
          data['lat']=Coord.lat
        data['lng']=Coord.lng
        data['districtId']=districtId
        data['userId']=auth?.userType?.name==="garagiste"?auth?.id:id
        data.openDate=new Date(data.openDate).toISOString()
         AddGarage(data)
        .then((i)=>{
          message.success("Garage a été ajouté avec succès")
          //@ts-ignore
          setgarageId(i.data.id)
          setindex(index+1)
        })
        }
      })
    }
    else if(index===2){
      form.validateFields()
      .then((data)=>{
          
          delete data["price"]
          delete data['prestationId']
          delete data['carModelId']
          delete data['carMakeId']
          data["open_time"]=new Date(data.open_time).toISOString()
          data["close_time"]=new Date(data.close_time).toISOString()
          data['garageId']=garageId.toString()
          addGarageBusinessHour(data)
          .then(()=>{
            message.success("Heures de travail a été ajouté avec succès")
            settoggleModal()
          })
        })
    }
    else{
      form.validateFields()
      .then((data)=>{
        if(typeof data.logo !=="undefined"){
          let logo=data['logo']
          let formdata=new FormData()
          formdata.append("garageId",garageId.toString())
          formdata.append("logo",logo?.[0]?.originFileObj, logo?.[0]?.name)
          AddLogo(formdata)
          .then(()=>message.success("Logo a été télécharger avec succés"))
        }
        if(typeof data.image !=="undefined"){

          let images=data['image']
           let formdata=new FormData()
           images.forEach((i)=>{
            formdata.append('garageId',garageId.toString())
            formdata.append("image",i?.originFileObj, i?.name)
            addImage(formdata)
            .then(()=>{
              message.success("Image a été ajouté avec succes")
            })
            formdata=new FormData()
          })
        }
        setindex(index+1)
      })
    }
  };

  return (
    <Modal
       title={index===0?"Ajouter un garagiste":index===1?"Ajouter Garage":index===2?"Ajouter Logo et images":"Ajouter des services et Heures de travail"} 
      closable={false}
      visible={toggleModal}
      onCancel={settoggleModal}
      onOk={HandelSubmit}
      centered
      width={900}
      footer={[ 
        <button key="1" onClick={settoggleModal} className="btn__secondary mr-3">
          Cancel
        </button>,
        
          <button onClick={HandelSubmit} key="3" className="btn__primary">
            Ajouter
          </button>
       /*  ), */
      ]}
    >
      
      {
       
        index===0?
        <Form className="personneForm" form={form} layout="vertical">
       {
        !edit? 
          (
            auth?.userType?.name!=="garagiste" ?
            <div className="row">
        <div className="col-6">
        <Form.Item
            label="Garagiste"
            name="userId"
            rules={[
              { required: true, message: "Nom est obligatoire" },
            ]}
            /* initialValue={dataToModel?.userName} */
          >
            <Select className="input__form" placeholder="Garagiste">
              {

                //@ts-ignore
                Garagistes?.map((i)=><Option value={i?.id}>{i?.firstName+" "+i?.lastName}</Option>)
              }
            </Select>
          </Form.Item>
        </div>
      </div>:""
          )
        :""
       }
        <div className="row">
          <div className="col-6">
            <Form.Item
              label="Nom"
              name="name"
              initialValue={edit?DataToMode.name:""}
              rules={[
                { required: true, message: "Nom est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
              <Input value={edit?DataToMode.name:""} name="name" className="input__form" placeholder="Nom" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
              label="Téléphone"
              name="phone"
              initialValue={edit?DataToMode.phone:""}
              rules={[
                { required: true, message: "tél est obligatoire " },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
              <Input value={edit?DataToMode.phone:""} name="phone" className="input__form" placeholder="0600000000" />
            </Form.Item>
          </div>
          
        </div>
        <div className="row">
        <div className="col-6 ">
            <Form.Item
              label="Email"
              name="email"
              initialValue={edit?DataToMode.email:""}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "email est obligatoire",
                },
              ]}
              /* initialValue={dataToModel?.email} */
            >
              <Input  name="email" className="input__form" placeholder="email@ex.ma" />
            </Form.Item>
          </div>
          <div className="col-6 ">
            <Form.Item
              label="Adresse"
              name="address"
              initialValue={edit?DataToMode?.address:""}
              rules={[
                {
                  required: true,
                  message: "adresse est obligatoire",
                },
              ]}
              /* initialValue={dataToModel?.email} */
            >
              <Input value={edit?DataToMode?.address:""} name="address" className="input__form" placeholder="Adresse" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className={ "col-6"}>
            <Form.Item
              label="Date d'ouverture"
              name="openDate"
              rules={[{ required: true, message: "Date d'ouverture est obligatoire" }]}
              //@ts-ignore
              
            >
              <DatePicker defaultValue={moment(edit?DataToMode.openDate:"2000/12/08", "YYYY/MM/DD")} className="input__form" name="openDate" />
             
            </Form.Item>
          </div>
         
          <div className="col-6">
          <Form.Item
              label="Quartier"
              name="districtId"
              initialValue={edit?DataToMode.districtId:""}
              rules={[{ required: true, message: "Date d'ouverture est obligatoire" }]}
              //@ts-ignore
              
            >
              <Select value={edit?DataToMode.districtId:""} onChange={(v)=>setdistrictId(v)} placeholder="Ville">
                {districts?.map((i)=>{
                  return <Option value={i.id}>{i.name}</Option>
                })}
              </Select>
             
            </Form.Item>
            
          </div>
        </div>
        {/* <div className="row">
              <div className="col-6">
              <Form.Item
              label="Années d'expérience"
              name="experienceYears"
              rules={[{ required: true, message: "Années d'expérience est obligatoire" }]}
              //@ts-ignore
              
            >
              <Input type="number" className="input__form" name="experienceYears" placeholder="0"/>
             
            </Form.Item>
              </div>
          <div className="col-6">
          <Form.Item
              label="Nombre de travailleurs"
              name="workerNumber"
              rules={[{ required: true, message: "Nombre de travailleurs est obligatoire" }]}
              //@ts-ignore
              
            >
              <Input type="number" className="input__form" name="workerNumber" placeholder="0"/>
             
            </Form.Item>
          </div>
          </div>     */} 
             <div className="row">
             
          
          <div style={{ height: '60vh', width: '100%' }} className="col-12">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCpSp2Aw5OlIBRHBW82leKbGG4dCjWBGPk" }}
        defaultCenter={Coord}
        onClick={(i)=>{
          setCoord({
            lat:i.lat,
            lng:i.lng
          })
        setClickMap(true)
        }
        }
        defaultZoom={defaultProps.zoom}
                
      >
        {edit && !ClickMap && (
          <AnyReactComponent
          lat={DataToMode.lat}
          lng={DataToMode.lng}
          text={DataToMode.name}
        />
        ) }
        {ClickMap && (
          <AnyReactComponent
          lat={Coord.lat}
          lng={Coord.lng}
          text="here"
        />
        )}
        
      </GoogleMapReact>
          </div>
              </div>   
        {/* <div className="row">
          <div className="col-12 d-flex justify-content-between py-3">
            <span>Active</span>
            <Form.Item
              name="active"
              valuePropName="checked"
              noStyle
              initialValue={dataToModel?.id ? dataToModel?.active : true}
            >
              <Switch />
            </Form.Item>
          </div>
        </div> */}
      </Form>:
      index===1
      ?
      <Form className="personneForm" form={form} layout="vertical">
        <div className="row">
          <div className="col-12">
            <Form.Item
              label="Logo"
              name="logo"
              
              //valuePropName="defaultFileList"
              valuePropName="file"
              getValueFromEvent={normFile}
            >
              <Upload
                name="logo"
                listType="picture-card"
                //customRequest={customUpload}
                defaultFileList={edit?[{ url:getImageUrl(DataToMode.logo),
                  uid:"-1",
                  name:"image.png",
                  status:"done"}]:[]}
                beforeUpload={() => false}
                customRequest={() => {}}
                maxCount={1}
              >
                { "Ajouter un logo"}
              </Upload>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Form.Item
              label="Images"
              name="image"
              
              //valuePropName="defaultFileList"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="image"
                listType="picture-card"
                //customRequest={customUpload}
                beforeUpload={() => false}
                customRequest={() => {}}
                defaultFileList={DataImages}
                maxCount={20}
                
                onRemove={async(i)=>{
                  const url=i.url||""
                  const idGarage=url?.split("static/garages/")[1].split("/")[0]
                  await deleteImage({id:idGarage,ImageName:url})
                  .then()
                  message.success("image a été supprimé avec succé")
                }}
              >
                { "Ajouter des images"}
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
      :
      <Form className="personneForm" form={form} layout="vertical">
        
        <h5>Services :</h5>
        <div className="row mt-3">
                <div className="col-6">
                <Form.Item
              label="Marque voiture "
              name="carMakeId"
              //@ts-ignore
              
            >
              <Select  placeholder="Marques" className="input__form" onChange={(i)=>setMarqueID(i)}>
                {
                  //@ts-ignore
                  Marques?.marques.map((i)=><Option name="carMakeId" value={i?.id} >{i?.name}</Option>)
                }
              </Select>
             </Form.Item>                  
                </div>
                <div className="col-6">
                <Form.Item
              label="Modele voiture "
              name="carModelId"
              //@ts-ignore
              
            >
              <Select placeholder="Models" className="input__form" >
                {
                  DataModels?.map((i)=><Option name="carModelId" value={i?.id} >{i?.name}</Option>)
                }
              </Select>
             </Form.Item>                  
                </div>
        </div>
        <div className="row ">

          <div className="col-6 ">
          <Form.Item
              label="Catégories "
              //@ts-ignore
              
            >
              <Select placeholder="Categories" className="input__form" onChange={(i)=>setprestationCategorieId(i)}>
                {
                  prestationCategories?.map((i)=><Option value={i?.name} >{i?.name}</Option>)
                }
              </Select>
             </Form.Item>
          </div>
          <div className="col-6">
          <Form.Item
              label="Services "
              name="prestationId"
              //@ts-ignore
              
            >
                <Select className="input__form">
                  {
                    servicesFiltrer?.map((i)=><Option name="prestationId" value={i?.id} >{i?.name}</Option>)
                  }
                </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
          <Form.Item
              label="Prix "
              name="price"
              //@ts-ignore
            >
                <Input name="price" type={"number"}  className="input__form"/>
            </Form.Item>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">

          <button onClick={handleAddServie} className="btn__primary col-6" >
              Ajouter Service
            </button>
          </div>
        </div>
        
        <h5>Heures de travail :</h5>
        <div className="row">
              <div className="col-6">
              <Form.Item
              label="Nombre de jour par semaine "
              name="day_of_week"
              //@ts-ignore
              
            >
              <Input type="number" defaultValue={edit?BusinessHour.dayOfWeek:0} className="input__form" name="day_of_week" placeholder="0"/>
             
            </Form.Item>
              </div>
              <div className="col-6">
              <Form.Item  
              label="Heure d'ouverture "
              name="open_time"
              //@ts-ignore
            >
              <TimePicker  className="input__form" name="open_time" defaultValue={edit?moment(BusinessHour.openTime, format):undefined} format={format} />
             
            </Form.Item>
              </div>
        </div>
        <div className="row">
        <div className="col-6">
              <Form.Item  
              label="Heure de fermeture "
              name="close_time"
              //@ts-ignore
            >
              <TimePicker className="input__form" name="close_time" defaultValue={edit?moment(BusinessHour.closeTime, format):undefined} format={format} />
             
            </Form.Item>
              </div>
        </div>
      </Form>
      }
        <Steps className="pt-4" size="small" current={index}>
          {
            edit ?(
              <>
    <Step title="Ajouter Garage" style={{cursor:"pointer"}} onClick={()=>setindex(0)}/>
    <Step title="Ajouter Logo et images" style={{cursor:"pointer"}} onClick={()=>setindex(1)}/>
    <Step title="Ajouter des services" style={{cursor:"pointer"}} onClick={()=>setindex(2)}/>
              </>
            ):(
              <>
    <Step title="Ajouter Garage" />
    <Step title="Ajouter Logo et images" />
    <Step title="Ajouter des services" />
              </>
            )
          }
    
  </Steps>
    </Modal>
  );
};

export default AddGaragiste;

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


