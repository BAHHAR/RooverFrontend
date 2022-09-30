import { Space,Affix } from 'antd'
import React,{useState} from 'react'
import { BoxArrowRight,X,List } from 'react-bootstrap-icons'
import LoginButton from '../Components/LoginButton'
import SideBar from './SideBar'

interface props{
      affixChange:boolean
}

function HeadBar({affixChange}:props) {

  const [ToggleSidebar, setToggleSidebar] = useState(false)

 
  const ToggleMenu=()=>{
    setToggleSidebar(!ToggleSidebar)
  }
  const [top, setTop] = useState(15);
  
  
  
  return (
    <>
    <div className={`d-flex justify-content-between ${affixChange?"HeadHr":""}`} style={affixChange?{backgroundColor:"white",paddingTop:18,paddingLeft:15,paddingRight:15}:{paddingTop:18,paddingLeft:15,paddingRight:15}}>
      <List  style={{cursor:"pointer",color:"white"}}  size={35} color={affixChange?"black":"white"}  onClick={()=>{
        setToggleSidebar(!ToggleSidebar)
        }
        }/>
        {
          ToggleSidebar && 
          <SideBar  toggle={ToggleSidebar}  settoggleModal={ToggleMenu}/>
        }
     
        
      
      <div>
        <h3 style={affixChange?{color:"black"}:{color:"white"}}>Roover</h3>
      </div>
      <LoginButton color={affixChange?"black":"white"}/>
      
    </div>
    
   </>
  )
}

export default HeadBar