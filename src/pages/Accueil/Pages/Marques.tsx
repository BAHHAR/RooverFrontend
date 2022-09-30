import { Affix, Breadcrumb } from 'antd'
import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { vehiculeApi } from '../../../store/apis/Vehicules'
import HeadBar from '../Layout/HeadBar'

function Marques() {
    const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
    const [topHeader, settopHeader] = useState(1)
    const {data:vehicules}=vehiculeApi.useGetAllQuery()
    console.log(vehicules?.vehicules)
  return (
    <div style={{backgroundColor:"#F9F9F9"}}>
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>
      <div className="mb-3 p-5">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/" exact activeClassName="active__bread">
            <span>Accueil</span>
          </NavLink>
        </Breadcrumb.Item>
        
          <Breadcrumb.Item>
            <NavLink to={"/Marques"} exact activeClassName="active__bread">
              <span>Marques</span>
            </NavLink>
          </Breadcrumb.Item>
       
      </Breadcrumb>
    </div>
    <div style={{height:"80vh",width:"80%",margin:"auto",borderRadius:15,backgroundColor:"white"}}>
        <h4 className='pt-3 pb-3' style={{textAlign:"center"}}>Modèles populaires</h4>

        <div className='marques'>
          
            {
              vehicules?.vehicules.map((i)=><div className='marques__model'>
                <p style={{textAlign:"center"}}> {i["carModel"]['carMake']?.name}</p>
                <p>{i['carModel']?.name}</p>
                </div>)
            }
        </div>
    </div>
    </div>
  )
}

export default Marques