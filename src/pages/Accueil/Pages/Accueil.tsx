import React from 'react'
import HeadBar from '../Layout/HeadBar'
import {Input,Affix,Steps,Avatar, Space,Select,Tag,Button} from 'antd'
import {useState,useEffect,useRef} from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { NavLink } from 'react-router-dom';
import { marqueVehiculeApi } from '../../../store/apis/Marques/index';
import {vehiculeApi} from "../../../store/apis/Vehicules/index"
import { garageApi } from '../../../store/apis/garagiste';
import { PrestationApi } from '../../../store/apis/Prestations';
import {X,CheckLg} from "react-bootstrap-icons"
import FindGarages from './FindGarages';
import background from "../../../Images/bannerAcc.jpg"



import entretien from "../../../Images/entretien.webp"
import freinage from "../../../Images/freinage.jpg"
import moteur from "../../../Images/moteur.webp"
import batterie from "../../../Images/batterie.jpg"
import Suspensions from "../../../Images/Suspensions.jpg"
import Echappement from "../../../Images/Echappement.jpg"
import Embrayage from "../../../Images/Embrayage.jpg"
import Distribution  from "../../../Images/Distribution.jpg"
import Climatisation  from "../../../Images/Climatisation.png"
import Direction  from "../../../Images/Direction.png"
import Roues  from "../../../Images/Roues.jpg"
import Carrosserie from "../../../Images/Carrosserie.webp"




const {Step}=Steps
function Accueil() {
  const { Option } = Select;
  const [top, setTop] = useState(40);
  const [topHeader, settopHeader] = useState(0)
  const [affixChange, setaffixChange] = useState<boolean|undefined>()
  const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
  const [Recherche, setRecherche] = useState(false)
  const [idMarque, setidMarque] = useState<number>()
  const [idModel, setidModel] = useState<number>()
  const {data:DataMarques}=marqueVehiculeApi.useGetMarqueQuery()
  const {data:DataModeles}=vehiculeApi.useGetModelQuery()
  const {data:DataPrestationsCar}=garageApi.useGetPrestationsQuery()
  const {data:DataPrestations}=PrestationApi.useGetAllQuery()
  const Modeles=DataModeles?.filter((i)=>i?.carMakeId===idMarque)
  const CarPrestations=DataPrestationsCar?.prestations.filter((i)=>i?.carMakeId===idMarque && i?.carModelId===idModel)
  const prestations=DataPrestations?.prestations.filter((i)=>{
    return CarPrestations?.filter((d)=>d?.prestationId===i?.id).length!=0
  })
  const [AddPrestations, setAddPrestations] = useState<{id:string|undefined;name:string|undefined}[]>([])
  const [Validate, setValidate] = useState(false)
  
  const setValidateComponent=()=>{
      setValidate(!Validate)
  }
  const PrestationsIds=AddPrestations.map((i)=>i.id)

  const [Coord, setCoord] = useState<{ lat: number; lng: number; }>()
  
useEffect(() => {
  const success=(pos)=>{
    setCoord({lat:pos.coords.latitude,lng:pos.coords.longitude})
    //console.log(pos)
    }
    navigator.geolocation.getCurrentPosition(success)
}, [])

  if(Validate)
    return <FindGarages 
        ValidateComponent={setValidateComponent} 
        carMakeId={idMarque}
        carModelId={idModel}
        prestationIds={PrestationsIds}
        lat={Coord?.lat}
        lng={Coord?.lng}
        />
  return (
    <div style={Recherche?{backgroundColor:"#F9F9F9",height:"100vh"}:{}}>
      <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>
     
     {
      Recherche?
      (
        <>
        <Affix offsetTop={top} onChange={(i)=>setaffixChange(i)}>
        
        <div className={`d-flex justify-content-center  ${affixChange?"mt-4":""} `} style={{backgroundColor:"white",paddingBottom:27,paddingTop:25,boxShadow:"0 2px 3px rgb(0 0 0 / 15%)"}}>
        
          <Select  value={idMarque} onChange={(i)=>setidMarque(i)} placeholder='marque'  className='input__form col-2'>
              {
                DataMarques?.marques.map((i)=><Option value={i?.id}>{i?.name}</Option>)
              }
          </Select>
          <Select value={idModel} onChange={(i)=>setidModel(i)} placeholder='model' className='input__form col-2 ml-2' >
            {
              Modeles?.map((i)=><Option value={i?.id}>{i?.name}</Option>)
            }
          </Select>
          <button onClick={()=>{
            if(idMarque && idModel){
            setRecherche(true)
            }else 
              return
          }} className='btn__primary ml-4 col-2'>Comparer les prix</button>
        </div>
      </Affix>
      <div style={{height:"100%",paddingTop:50,backgroundColor:"#F9F9F9",marginTop:15}} >
            <h3 style={{textAlign:"center",marginTop:25}} >Quelles prestations souhaitez-vous réaliser ?</h3>
            <hr/>
            {
              AddPrestations.length!==0 && (
                <div className='col-6' style={{margin:"auto"}}>
                  <h6 className='mt-4'>Prestations sélectionnées</h6>
                  <div className='row pl-3 pb-3'>
                      {
                        AddPrestations.map((i)=>
                          <Tag className='mt-2 p-1' color={"geekblue"} style={{borderRadius:5}}>
                            <Space size={"middle"}>
                              {i.name}
                            <X onClick={()=>{
                              AddPrestations.forEach((y)=>{
                                if(y.id===i.id)
                                  setAddPrestations(AddPrestations.filter(function(ele){ 
                                    return ele.id != y.id; 
                                }))
                              })
                            }} style={{cursor:"pointer"}} size={18}/>
                            </Space>
                            </Tag>
                          
                        )
                      }
                  </div>
                  <Button onClick={setValidateComponent} type="primary"  className='col-12 mb-4' shape="default" style={{color:"white",margin:"0 auto"}}   size={"large"}>
        <p style={{color:"white"}}>Valider cette préstations</p>
      </Button>
                </div>
              )
            }
            
              <div className='col-4 ' style={{marginTop:45,margin:"auto"}}>
                {
                  prestations?.map((i)=><div className='d-flex justify-content-between ' style={{textAlign:"start"}}>
                    <b><p>{i?.name}</p></b>
                    {
                      
                      AddPrestations.filter((data)=>data.id===i?.id && data?.name === i?.name).length!==0?
                      <CheckLg size={18} style={{color:"green"}}/>
                      :
                      <p onClick={()=>setAddPrestations(AddPrestations.concat({id:i?.id||"",name:i?.name||""}))} className='' style={{color:"#2BB2B6",cursor:"pointer"}}>Ajouter</p>
                    }
                  </div>)
                }
              </div>
      </div>
    </>    
     
      ):(
        <>
         <div style={{
      backgroundImage:`url(${background})`,
      backgroundRepeat:"no-repeat",
      height:"80vh",
      marginTop:-130,
      backgroundSize:"cover",
      backgroundPositionY:-120
    }}>
      
      <h1 style={{paddingTop:330 ,textAlign:"center",color:"white"} }>Comparez le prix des meilleurs garages près de chez vous</h1>
      <h5 style={{textAlign:"center",color:"white"}}>Faites le bon choix : comparez les garages auto près de chez vous et choisissez le meilleur !</h5>
      <Affix offsetTop={top} onChange={(i)=>setaffixChange(i)}>
        <>
        
        <div className={`d-flex justify-content-center mt-4 ${affixChange?"affixIn":""}`} style={affixChange?{backgroundColor:"white",paddingBottom:25,paddingTop:25}:{}}>
        
        <Select value={idMarque} onChange={(i)=>setidMarque(i)} placeholder='marque'  className='input__form col-2'>
              {
                DataMarques?.marques.map((i)=><Option value={i?.id}>{i?.name}</Option>)
              }
          </Select>
          <Select value={idModel} onChange={(i)=>setidModel(i)} placeholder='model' className='input__form col-2 ml-2' >
            {
              Modeles?.map((i)=><Option value={i?.id}>{i?.name}</Option>)
            }
          </Select>
          <button  onClick={()=>{
            if(idMarque && idModel){
              settopHeader(1)
            setRecherche(true)
            }else 
              return
            
          }} className='btn__primary ml-4 col-2'>Comparer les prix</button>
        </div>
        <div className='' style={{backgroundColor:"#F9F9F9"}}>

        </div>
    </>    
      </Affix>
      
      </div>
      <div style={{backgroundColor:"white"}} className="d-flex justify-content-around">
        <div style={{padding:35}}>
            <Space size={"large"}>
              <Avatar src="https://joeschmoe.io/api/v1/random"/>
              <h6>DEVIS INSTANTANÉ EN LIGNE</h6>
            </Space>
        </div>
        <div style={{padding:35}}>
            <Space size={"large"}>
              <Avatar src="https://joeschmoe.io/api/v1/random"/>
              <h6>LE MÊME PRIX QU’EN ATELIER</h6>
            </Space>
        </div>
        <div style={{padding:35}}>
            <Space size={"large"}>
              <Avatar src="https://joeschmoe.io/api/v1/random"/>
              <h6>GARAGES CERTIFIÉS DE CONFIANCE</h6>
            </Space>
        </div>
      </div>
      <div   style={{backgroundColor:"#F9F9F9 ",color:"#333",textAlign:"center" }}>
        <h3 className='pt-4' >Trouvez le garage qu’il vous faut en 2 minutes</h3>
        <p >Ça n’a jamais été aussi facile de faire réparer sa voiture !</p>
        
        <div className='d-flex col-12 pt-4' style={{textAlign:"center"}}>
          <div className='col-5 '></div>
        <Steps progressDot  current={3} direction="vertical" className='col-4'>
          <Step title="COMPAREZ LES PRIX" description="Notre calculateur vous fournit instantanément le prix de 46 prestations d’entretien et de réparation auto"/>
          <Step title="VÉRIFIEZ LA RÉPUTATION " description="Faites-vous votre propre opinion : des avis clients sont disponibles pour chacun de nos Garages."/>
          <Step title="CHOISISSEZ UN CRÉNEAU" description="Sélectionnez l’horaire qui vous convient et prenez rendez-vous directement en ligne."/>
        </Steps>
        </div>

     <div className='d-flex justify-content-center ' >
     <button className='btn__primary col-2 mt-5 mb-5' style={{textAlign:"center"}}>Trouver un garage</button>
      
      </div> 
      <div className="custom-shape-divider-top-1660942380">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
      </div>
      </div>
      
      <div>
      
      <div  style={{textAlign:"center",marginTop:25}}>
         <h3>+ de 5000 Garages certifiés par nos soins</h3>
          <p>Avec la certification Garagiste de confiance, fini les mauvaises surprises !</p>
      </div>
     </div> 
     
      <div  className='d-flex justify-content-around' style={{marginTop:70}}>
          <div className='col-3' style={{textAlign:"center"}}>
          <Avatar size={100} className="mb-3" src="https://joeschmoe.io/api/v1/random" />
          <h6>SÉLECTION RIGOUREUSE</h6>
          <p>Nous certifions uniquement les meilleurs garages de chaque région, en suivant un strict cahier des charges.</p>
          </div>
          <div className='col-3' style={{textAlign:"center"}}>
          <Avatar size={100} className="mb-3" src="https://joeschmoe.io/api/v1/random" />
            <h6>CHARTE DE CONFIANCE</h6>
            <p>Nos Garagistes travaillent dans le respect de notre charte de Confiance, qui vous garantit un entretien de qualité.</p>
          </div>
          <div className='col-3' style={{textAlign:"center"}}>
          <Avatar size={100} className="mb-3" src="https://joeschmoe.io/api/v1/random" />
            <h6>SUIVI RÉGULIER</h6>
            <p>Nous ne gardons que les meilleurs. Seuls les Garages plébiscités par les clients conservent leur certification.</p>
          </div>
      </div>
      <div className='d-flex justify-content-center ' >
     <button className='btn__primary col-2 mt-5 mb-5' style={{textAlign:"center"}}>Trouver un garage</button>
     </div> 
     <div className="custom-shape-divider-top-2">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill2"></path>
          </svg>
      </div>
      

     <div style={{backgroundColor:"#F9F9F9"}}>
      <h3 style={{textAlign:"center"}}>Le prix de votre entretien auto en 3 clics</h3>
      <p style={{textAlign:"center"}}>Obtenez instantanément un devis pour 46 prestations d’entretien et de réparation auto</p>
      <div className='PrestationCatégorie mt-5'>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={entretien} />
        <h6 style={{textAlign:"center"}}>ENTRETIEN</h6>
        <p>Vidange + filtre à huile</p>
        <p>Révision</p>
        <p>Changement du filtre à gasoil</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={freinage} />
        <h6 style={{textAlign:"center"}}>FREINAGE</h6>
        <p>Changement des plaquettes de frein</p>
        <p>Changement des disques de frein</p>
        <p>Changement du liquide de frein</p>
        <p>Changement de frein à tambour</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={moteur} />
        <h6 style={{textAlign:"center"}}>MOTEUR</h6>
        <p>Changement d'injecteur</p>
        <p>Changement du filtre à air</p>
        <p>Changement des bougies de préchauffage</p>
        <p>Changement des bougies d’allumage</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={batterie} />
        <h6 style={{textAlign:"center"}}>{"Démarrage et charge".toUpperCase()}</h6>
        <p>Changement de la batterie</p>
        <p>Changement d’alternateur</p>
        <p>Changement de démarreur</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Suspensions} />
        <h6 style={{textAlign:"center"}}>{"Suspensions".toUpperCase()}</h6>
        <p>Changement des amortisseurs avant</p>
        <p>Changement des amortisseurs arrière</p>
        <p>Géométrie & parallélisme</p>
        <p>Changement de rotule de suspension</p>
        <p>Changement de triangle de suspension</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Echappement} />
        <h6 style={{textAlign:"center"}}>{"Echappement".toUpperCase()}</h6>
        <p>Changement d’échappement</p>
        <p>Décalaminage</p>
        <p>Changement de vanne EGR</p>
        <p>Changement de filtre à particules (FAP)</p>
        </div>
        
        
      </div>
     </div>
     <div className="custom-shape-divider-top-1661021007">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
    </svg>
    </div>
<div>
<h3 style={{textAlign:"center"}}>Piochez dans la boîte à outils de Roover</h3>
      <p style={{textAlign:"center"}}>Tout ce que vous devez savoir pour prendre soin de votre voiture</p>
    
      <div className='mt-5 blog' >
        <div className='d-flex cardBlog '>
          <img style={{overflow:"hidden"}} height={100} width={200} src="https://joeschmoe.io/api/v1/random"/>
          <div className='mt-2'>
            <h5>Numéro NEPH : définition et obtention</h5>
            <p className='pt-2'>Le numéro NEPH (Numéro d'Enregistrement Préfectoral Harmonisé) est attribué par la préfecture au</p>
          </div>
        </div>
        <div className='d-flex cardBlog '>
          <img style={{overflow:"hidden"}} height={100} width={200} src="https://joeschmoe.io/api/v1/random"/>
          <div className='mt-2'>
            <h5>Numéro NEPH : définition et obtention</h5>
            <p className='pt-2'>Le numéro NEPH (Numéro d'Enregistrement Préfectoral Harmonisé) est attribué par la préfecture au</p>
          </div>
        </div>
    </div>
    <div className='d-flex justify-content-center ' >
     <button className='btn__primary col-2 mt-5 mb-5'  style={{textAlign:"center"}}>
      <NavLink to={"Blogs"}>Découvrir plus d'articles</NavLink>
     </button>
      
      </div> 
</div>
<div className=''>
 
</div>
        </>
      )
     }
     
    </div>
  )
}

export default Accueil