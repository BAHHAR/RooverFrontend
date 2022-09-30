import { Affix, Breadcrumb } from 'antd'
import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import MyBreadcrumb from '../../../components/Ui/MyBreadcrumb'
import HeadBar from '../Layout/HeadBar'

import BlogsBack  from "../../../Images/Blogs.jpg"

function Blogs() {
    const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
    const [topHeader, settopHeader] = useState(0)
  return (
    <div>
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>
      <div style={{
      backgroundImage:`url(${BlogsBack})`,
      backgroundRepeat:"no-repeat",
      height:"80vh",
      marginTop:-130,
      backgroundSize:"cover",
      backgroundPositionY:-120,
      paddingTop:180
    }}>
        <h1 style={{textAlign:"center",color:"white"}}>Le blog auto de Roover</h1>
        <h3 style={{textAlign:"center",color:"white"}}>Avec le blog auto Roover, c’est l’actu auto par des passionnés pour des passionnés !</h3>
    </div>
    <div style={{backgroundColor:"#F9F9F9", paddingTop:5} }>
    <div className="mb-3 p-5">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/" exact activeClassName="active__bread">
            <span>Accueil</span>
          </NavLink>
        </Breadcrumb.Item>
        
          <Breadcrumb.Item>
            <NavLink to={"/Blogs"} exact activeClassName="active__bread">
              <span>Blogs</span>
            </NavLink>
          </Breadcrumb.Item>
       
      </Breadcrumb>
    </div>
    <h2 style={{textAlign:"center"}}>Nos derniers conseils et astuces pour entretenir votre voiture</h2>
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
    </div>
    </div>
  )
}

export default Blogs