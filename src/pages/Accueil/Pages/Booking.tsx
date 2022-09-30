import { Affix, Button, Input, message, Modal,Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BookingApi } from '../../../store/apis/Bookings'
import { vehiculeApi } from '../../../store/apis/Vehicules'
import { useAppSelector } from '../../../store/hooks'
import { getImageUrl } from '../../../util/getImageUrl'
import ModaPictures from '../Components/ModaPictures'
import HeadBar from '../Layout/HeadBar'

function Booking() {
  const auth = useAppSelector((state) => state.auth.user);
  const history = useHistory();
    const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
    const [topHeader, settopHeader] = useState(1)
    const [Garages, setGarages] = useState<any[]>()
    const [ToggleModal, setToggleModal] = useState(false)
    const [Images, setImages] = useState([])
    const [date, setdate] = useState("")
    const {data:Engines}=vehiculeApi.useGetAllQuery()
    const [addBooking]=BookingApi.useCreateBookingMutation()
    const [garageID, setgarageID] = useState<any>()
    const [refresh, setrefresh] = useState(false)
    const {data:AllBookings}=BookingApi.useGetAllQuery()

    const DataBddBooking=auth? AllBookings?.booking.filter((i)=>i?.user?.id===auth.id):[]

    const OpenModal=()=>{
      setToggleModal(!ToggleModal)
    }
    const [Booking, setBooking] = useState<{
      garageId:any,
      name:any,
      logo:any
      prestations:{
        id:any;
        name:any;
        price:any
      }[]
    }[]>([])
    const [engine, setengine] = useState<{
      carMakeId: number | undefined;
    carModelId: number | undefined;
    }>()
    useEffect(() => {
      if(window.localStorage.getItem("booking"))
          setBooking(JSON.parse(window.localStorage.getItem("booking")||""))
      if(window.localStorage.getItem("vehicule"))
        setengine(JSON.parse(window.localStorage.getItem("vehicule")||""))
    }, [refresh])

    const OpenModalValid=(garageId)=>{
      setgarageID(garageId)
      setToggleModal(!ToggleModal)
    }

    const DeleteGarage=(id)=>{
        Booking.forEach((i)=>{
            if(i.garageId===id)
             { 
              setBooking(Booking.filter((i)=>!i.garageId===id))
              window.localStorage.setItem("booking",JSON.stringify(Booking.filter((i)=>!i.garageId===id)))
            }
        })
    }



    const ValiderBooking=async()=>{
      let prestations:any=[]

      const dataBooking=Booking.find((i)=>i.garageId=garageID)
      dataBooking?.prestations.forEach((i)=>{
        prestations.push({prestationId:i.id})
      })

      const engineId=Engines?.vehicules.find((i)=>i?.["carModel"]?.["id"]===engine?.carModelId)?.id
      if(!auth)
        history.push("/Login")
      else{
       let ValiderBooking={
          garageId:garageID,
          prestations:prestations,
          userId:auth.id,
          date:new Date(date).toISOString(),
          carEngineId:engineId,
          status:"waiting"
        }
        await addBooking(ValiderBooking)
            .then(()=>{
              message.success("Booking a été créé avec succés")
              DeleteGarage(ValiderBooking.garageId)
              OpenModal()
              setrefresh(!refresh)
            })
      }
    }

    if(!auth)
      return(
        <div style={{backgroundColor:"#F9F9F9",height:"100vh"}}>
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
        </Affix>
        <h3 style={{textAlign:"center",marginTop:150}}>vous n'êtes pas connecté à Roover</h3>
        </div>
      )

  return (
    <div style={{backgroundColor:"#F9F9F9",height:"100vh"}}>
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
        </Affix>
        {
          Booking.length!==0?
            Booking?.map((i)=>{
                let price=0
                    return  <>
                    <div className='d-flex mb-3 mt-4' style={{boxShadow:"0 2px 3px rgb(0 0 0 / 15%)",height:250,backgroundColor:"white",borderRadius:7,width:"50%",margin:"auto"}}>
                  <img style={{overflow:"hidden",borderTopLeftRadius:7,borderBottomLeftRadius:7}} src={getImageUrl(i?.logo)} width={250} height="100%"/>
                  <div className='p-2'>
                    <p className='pl-2' style={{fontSize:24}}>{i?.name  }</p>
                     {
                      i?.prestations.map((p)=>{
                        price+=Number(p?.price)
                        return <p className='pl-2'>{p?.name}</p>
                      })
                     }
                    
                    <div className='row'>
                      <p className='col-4'>Total :</p>
                      <p> {price} MAD</p>
                     
                    </div>
                    <Button onClick={()=>DeleteGarage(i.garageId)}  style={{backgroundColor:"green"}} className='col-7' type='primary'>
                        <p  style={{color:"white"}}>Suppimer</p></Button>
                  </div>
                  </div>
                  <Button onClick={()=>OpenModalValid(i.garageId)} className='col-5 pb-3  mb-4' style={{borderRadius:10,display:"block",margin:"auto"}} type="primary"><p className='' style={{color:"white"}}>Valider</p></Button>
                  </>
                  
            } )
            :
            DataBddBooking?.length!==0 || Booking.length!==0
            ?
            ""
            :
            <h3 className='mt-4' style={{textAlign:"center"}}>Aucun réservation</h3>
          }
          {
          DataBddBooking?.length!==0?
          DataBddBooking?.map((i)=>{
            console.log(i)
                let price=0
                    return  <>
                    <div className='d-flex mb-3 mt-4' style={{boxShadow:"0 2px 3px rgb(0 0 0 / 15%)",height:250,backgroundColor:"white",borderRadius:7,width:"50%",margin:"auto"}}>
                  <img style={{overflow:"hidden",borderTopLeftRadius:7,borderBottomLeftRadius:7}} src={getImageUrl(i?.Garage?.logo||"")} width={250} height="100%"/>
                  <div className='p-2'>
                    <p className='pl-2' style={{fontSize:24}}>{i?.Garage?.name  }</p>
                     {
                      i?.Garage?.prestations.map((p)=>{
                        console.log(i)
                        price+=Number(p?.price)
                        return <p className='pl-2'>{p?.prestation?.name}</p>
                      })
                     }
                    
                    <div className='row'>
                      <p className='col-4'>Total :</p>
                      <p> {price} MAD</p>
                     
                    </div>
                   <div className='row'>
                      <p className='col-4'>status</p>
                      <p>{i?.status==="accept"?<Tag color='green'>Accepté</Tag>:<Tag color="red">Refusé</Tag>}</p>
                   </div>
                  </div>
                  </div>
                  
                  </>
                  
            } )
            :
           ""
          } 
          {
            ToggleModal && (
              <Modal
                  title="Insérer la date" 
                closable={false}
                visible={ToggleModal}
                onCancel={OpenModal}
                centered
                width={300}
                footer={[ 
                  <button key="1" onClick={OpenModal} className="btn__secondary mr-3">
                    Cancel
                  </button>,
                   <button key="1" onClick={ValiderBooking} className="btn__primary mr-3">
                   Valider
                 </button>
                ]}
              > 
    <Input type='date' onChange={(i)=>setdate(i.target.value)}/>
    </Modal>
            )
          }
         
    </div>
  )
}

export default Booking