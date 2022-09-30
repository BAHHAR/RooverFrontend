import { Affix, Button, message, Popover, Space } from 'antd';
import React,{useState,useEffect} from 'react'
import HeadBar from '../Layout/HeadBar';
import {ArrowLeft, GeoAltFill} from "react-bootstrap-icons"
import { garageApi } from '../../../store/apis/garagiste';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';
import { getImageUrl } from '../../../util/getImageUrl';
import ModaPictures from '../Components/ModaPictures';
import { useAppSelector } from '../../../store/hooks';
import Login from './Login';
import { NavLink, useHistory } from 'react-router-dom';
interface props{
    prestationIds:(string|undefined)[];
    carMakeId:number|undefined;
    carModelId:number|undefined;
    lat:number|undefined;
    lng:number|undefined
    ValidateComponent:()=>any
}
const AnyReactComponent = ({ lat,lng,text }) => <div>
  <Popover content={text}>
  <GeoAltFill size={18} color="red"/>
  </Popover>
</div>;
function FindGarages({carMakeId,carModelId,prestationIds,ValidateComponent,lat,lng}:props) {
  const history = useHistory();
    const auth = useAppSelector((state) => state.auth.user);
    const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
    const [topHeader, settopHeader] = useState(1)
    const [FindGarage]=garageApi.useFindGaragesMutation()
    const [Garages, setGarages] = useState<any[]>()
    const [ToggleModal, setToggleModal] = useState(false)
    const [Images, setImages] = useState([])
    const [checkLogin, setcheckLogin] = useState(false)
    const [booking, setbooking] = useState<{
      garageId:any,
      name:any,
      logo:any
      prestations:{
        id:any;
        name:any;
        price:any;
      }[]
    }[]>([])
    const Coord={lat,lng}
  const DataGarages=Garages?.filter((i)=>i?.prestations?.[0]?.carMakeId===carMakeId && i?.prestations?.[0]?.carModelId===carModelId)
  

    const OpenModal=()=>{
      setToggleModal(!ToggleModal)
    }

    useEffect(  () => { 
        FindGarage({
            lat:33.564441,
            lng:-7.537245,
            prestationIds:prestationIds
        })
       //@ts-ignore
        .then((i)=>setGarages(i?.data))
    }, [])

    const addBooking=(garageId,presId,presName,Name,logo,price)=>{
      
      const pres=[{
        id:presId,
        name:presName,
        price:price
      }]
      if(booking.length!==0)
          booking?.map((d)=>{
            if(d?.garageId ===garageId){
              console.log(d?.prestations.filter((i)=>i===presId).length===0)
              if(d?.prestations.filter((i)=>i===presId).length===0)
                {
                  d?.prestations.push({
                    id:presId,
                    name:presName,
                    price:price
                  })
                }
            }else
              {
                
                setbooking(booking ?.concat({garageId:garageId,name:Name,logo:logo,prestations:[...pres]}))}
          }  )
        else
        setbooking(booking ?.concat({garageId:garageId,name:Name,logo:logo,prestations:[...pres]}))

        message.success("Cette préstations a été ajouté avec succés")
    }

    
    const finish=()=>{
        window.localStorage.setItem("booking",JSON.stringify(booking))
        const vehicule={carMakeId,carModelId}
        window.localStorage.setItem("vehicule",JSON.stringify(vehicule))
        history.push("/Bookings")
    }

  return (
    <div style={{backgroundColor:"#F9F9F9",height:"100vh"}} >
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>  
      <Affix offsetTop={15} >
            <div  style={{backgroundColor:"white",boxShadow:"0 2px 3px rgb(0 0 0 / 15%)"}} className="p-3 d-flex justify-content-between">
            <p onClick={ValidateComponent} className="col-2" style={{color:"#5E626E",cursor:"pointer"}}>une autre prestations ?</p>
           {
           ( booking.length!==0 || window.localStorage.getItem("booking")) && (
              <Space size={"large"}>
                <NavLink to={"/Bookings"}>Mes réservations</NavLink>
                <Button onClick={finish} type='primary'  style={{backgroundColor:"green"}}><p style={{color:"white"}}>Terminé</p></Button>
              </Space>
            )
           }
            </div>
      </Affix>
      
      <div className='p-2 mt-2' style={{  width: '60%',float:"left",clear:"both"}}>
        {
          Garages?.length!==0 ? 
          <>
          <p className='pl-5 pt-3'>{Garages?.length} garage trouvés</p>
          {
           prestationIds.map((data)=>{
           return DataGarages?.map((i)=>{
              if(i?.prestations.filter((y)=>y?.prestation?.id===data)?.lenght!==0)
                  {
                    const pres=i?.prestations.filter((y)=>y?.prestation?.id===data)
                    return <div className='d-flex mb-3' style={{boxShadow:"0 2px 3px rgb(0 0 0 / 15%)",height:250,backgroundColor:"white",borderRadius:7}}>
                  <img style={{overflow:"hidden",borderTopLeftRadius:7,borderBottomLeftRadius:7}} src={getImageUrl(i?.logo)} width={250} height="100%"/>
                  <div className='p-2'>
                    <p className='pl-2' style={{fontSize:24}}>{i?.name  }</p>
                    <p>{pres?.[0]?.prestation?.name}</p>
                    <div className='row'>
                        <p className='col-3'>Address</p>
                        <p className='col-9'>: {i?.address} {i?.distance.toPrecision(3)}Km</p>
                    </div>
                    <div className='row'>
                    <p className='col-7'>Heure d'ouverture</p>
                        <p className='col-3'> : {moment(i?.businessHours?.[0]?.openTime).format("HH:mm")}</p>
                    </div>
                    <div className='row'>
                    <p className='col-7'>Heure de fermeture</p>
                        <p className='col-3'> : {moment(i?.businessHours?.[0]?.closeTime).format("HH:mm")}</p>
                    </div>
                    <div className='row'>
                      <p className='col-3'>Prix {pres?.[0]?.price}</p>
                      <p onClick={()=>{setImages(i?.images);setToggleModal(true)}} className='col-6' style={{color:"#2BB2C0",cursor:"pointer"}}>Afficher les images</p>
                      <Button onClick={()=>{addBooking(i?.id,pres?.[0]?.prestation?.id,pres?.[0]?.prestation?.name,i?.name,i?.logo,pres?.[0]?.price)} } className='col-3' type='primary'>
                        <p  style={{color:"white"}}>Reserver</p></Button>
                    </div>
                  </div>
                  
                  </div>
                  }
            } )
           })
          } 
          </>
          : 
          <div>
              <div style={{textAlign:"center",boxShadow:"0 2px 3px rgb(0 0 0 / 15%)",height:150,backgroundColor:"white",borderRadius:7}}>
                <p style={{fontSize:24}}> Roover arrive prochainement près de chez vous</p>
                <p>Nous n’avons pas encore certifié de garages dans votre région. Contactez directement les garages ci-dessous pour obtenir un renseignement.</p>
                </div>
                <p style={{textAlign:"center"}}>Aucun garage trouvé</p>
            </div>
        }
      </div>
      <div style={{ height: '80vh', width: '40%',float:"right"}} className="col-12 mt-2">
            
        <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCpSp2Aw5OlIBRHBW82leKbGG4dCjWBGPk" }}
                defaultCenter={Coord}
                defaultZoom={11}      
            >
            {
            DataGarages?.map((data)=><AnyReactComponent
            lat={data?.lat}
            lng={data.lng}
            text={data.name}
          />)
          } 
            </GoogleMapReact>  
          
            </div>

            {
            ToggleModal && (
              <ModaPictures images={Images} settoggleModal={OpenModal} toggleModal={ToggleModal}/>
            )
          }
          
    </div>
  )
}

export default FindGarages