import React,{useState} from 'react'
import { garageApi } from '../../../store/apis/garagiste'
import { useParams } from "react-router-dom";
import MySpin from "../../../components/Ui/Spin";
import ReactStars from 'react-stars'
import{TableColumnsType,Table,Popover,Carousel } from 'antd'
import moment from "moment";
import { IGaragiste, IPrestationGar } from '../../../interfaces/IGaragiste';
import GoogleMapReact from 'google-map-react';
import {GeoAltFill} from "react-bootstrap-icons"
import { getImageUrl } from '../../../util/getImageUrl';
moment.locale("fr")

const api_key="d31090c0e7mshfc096891aafee9dp191e5cjsn4b3232d706d5"



const AnyReactComponent = ({ lat,lng,text }) => <div>
  <Popover content={text}>
  <GeoAltFill size={18} color="red"/>
  </Popover>
</div>;
function Garage() {
    let { id } = useParams<{ id: string }>();
    const {data,isLoading}=garageApi.useGetOneByIDQuery({id})
    
    console.log(data?.garage?.images)
  const dynamicImages=(text)=>{
    setTimeout(() => {
      for (let i = 0; i < (data?.garage?.images?.length||0); i++) {
       document.styleSheets[i].insertRule(
      `
      .ant-carousel .slick-dots li button
          {
            background:black !important;
            height:6px;
            margin-top:5px !important;
          }
      
      `
      ,0)
        
      }
      

    
  }, 100);

    const contentStyle: React.CSSProperties = {

      
        height: '300px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundRepeat:"no-repeat",
        backgroundImage:`url(${getImageUrl(text)})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        overflow:'hidden',
        border:1,
        borderRadius:15
      };
      return contentStyle
  }    

      
      const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };

    const defaultProps = {
        center: {
          lat:33.5731104,
          lng:-7.5898434
        },
        zoom: 11
      };
    const servicesColumn:TableColumnsType<IPrestationGar>=[
        {
            title:"Catégorie",
            dataIndex:["prestation","prestationCategory","name"],
        },
        {
            title:"Prestation",
            dataIndex:["prestation","name"]
        },
        {
            title:"Prix",
            dataIndex:["price"]
        }
    ]


    if(isLoading) return <MySpin/>;
    
    return (
        <>
        <div className="row myCard">
            <div className="col-lg-6 col-md-6 ">
          <div className="p-0">
            <h3 className="myCard__title">Fiche garagiste</h3>
            <div className="myCard__line">
              <h6 className="title">Nom :</h6>
              { //@ts-ignore 
              }
              <h6>{data?.garage?.["user"]?.["lastName"]}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Prénom :</h6>
              <h6>{data?.garage?.["user"]?.["firstName"]}</h6>
            </div>
            
            <div className="myCard__line">
              <h6 className="title">Email :</h6>
              <h6>{data?.garage?.["user"]?.["email"]}</h6>
            </div>
            
            
          </div>
          
        </div>
        <div className="col-lg-6 col-md-6 ">
          <div className="p-0 mb-4">
              <div className='d-flex justify-content-between'>
            <h3 className="myCard__title">Fiche garage</h3>
            <div style={{paddingTop:-5}}>
              <ReactStars edit={false}  size={24} count={5} value={3} />
            </div>
             </div> 
            <div className="myCard__line">
              <h6 className="title">Nom du garage :</h6>
              
              <h6>{data?.garage?.name}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Email du garage:</h6>
              <h6>{data?.garage?.email}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Adresse :</h6>
              <h6>{data?.garage?.address}</h6>
            </div>
            
            <div className="myCard__line">
              <h6 className="title">Région:</h6>
              <h6>{data?.garage?.["district"]?.['name']}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Ville:</h6>
              <h6>{data?.garage?.["district"]?.['city']?.['name']}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Date d'ouverture:</h6>
              <h6>{moment(data?.garage?.openDate).format("DD/MM/YYYY")}</h6>
            </div>
            {/* <div className="myCard__line">
              <h6 className="title">Années d'expérience:</h6>
              <h6>{data?.garage?.experienceYears}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Numéro de travailleur:</h6>
              <h6>{data?.garage?.workerNumber}</h6>
            </div> */}
          </div>
          
        </div>
        </div>
        <div className="row myCard mt-4">
        <div className="col-lg-6 col-md-6 ">
          <div className="p-0">
            <h3 className="myCard__title">Heures de travail</h3>
            <div className="myCard__line">
              <h6 className="title">jour de la semaine :</h6>
              
              <h6>{data?.garage?.["businessHours"]?.["dayOfWeek"]}</h6>
            </div>
            <div className="myCard__line">
              <h6 className="title">Heure d'ouverture :</h6>
              <h6>{moment(data?.garage?.["businessHours"]?.["openTime"]).format("HH:mm")}</h6>
            </div>
            
            <div className="myCard__line">
              <h6 className="title">Heure de fermeture :</h6>
              <h6>{moment(data?.garage?.["businessHours"]?.["closeTime"]).format("HH:mm")}</h6>
            </div>
            
            
          </div>
          
        </div>
        <div className="col-lg-6 col-md-6 ">
        <h3 className="myCard__title">Services</h3>
        <div className="myTable"> 
             <Table
              columns={servicesColumn}
              dataSource={data?.garage?.prestations}
              pagination={{
                showSizeChanger: true,
              }}
              bordered
              
            /> 
    
          </div>
        </div>
        </div>
          <div className='col-12 mt-3 mb-2'>
        <h5>Les Images :</h5>
          <Carousel 
          afterChange={onChange}
          
          >
            {
              data?.garage?.images?.map((text,index)=><div>
              <h3 style={dynamicImages(text?.path)}>{index+1}</h3>
            </div>)
            }
            
            
              
    </Carousel>
          </div>
        <div style={{ height: '60vh', width: '100%' }} className="col-12">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCpSp2Aw5OlIBRHBW82leKbGG4dCjWBGPk" }}
        defaultCenter={defaultProps.center}
        
        defaultZoom={5}
                
      >
    
          <AnyReactComponent
          lat={data?.garage?.lat}
          lng={data?.garage?.lng}
          text={data?.garage?.name}
        />
       
        
      </GoogleMapReact>
          </div>
        </>
  )
}

export default Garage