import { Affix, Avatar } from 'antd'
import React,{useState} from 'react'
import HeadBar from '../Layout/HeadBar'

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



function Prestations() {
    const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
    const [topHeader, settopHeader] = useState(1)
  return (
    <div>
        <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>
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
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Embrayage} />
        <h6 style={{textAlign:"center"}}>{"Embrayage".toUpperCase()}</h6>
        <p>Changement d’embrayage</p>
        <p>Changement du volant moteur</p>
        <p>Vidange de boîte de vitesse</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Distribution} />
        <h6 style={{textAlign:"center"}}>{"Distribution".toUpperCase()}</h6>
        <p>Changement de la courroie de distribution</p>
        <p>Changement de la courroie d’accessoire</p>
        <p>Changement du liquide de refroidissement</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Climatisation} />
        <h6 style={{textAlign:"center"}}>{"Climatisation".toUpperCase()}</h6>
        <p>Recharge de la clim</p>
        <p>Changement du filtre d’habitacle</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Direction} />
        <h6 style={{textAlign:"center"}}>{"Direction et transmission".toUpperCase()}</h6>
        <p>Changement de cardan</p>
        <p>Changement de biellette de direction</p>
        <p>Changement de rotule de direction</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Roues} />
        <h6 style={{textAlign:"center"}}>{"Roues".toUpperCase()}</h6>
        <p>Changement de roulements de roue</p>
        <p>Changement des pneus</p>
        </div>
        <div >
        <Avatar style={{margin:"auto",display:"block"}} size={100} className="mb-3" src={Carrosserie} />
        <h6 style={{textAlign:"center"}}> {"Carrosserie et vision".toUpperCase()}</h6>
        <p>Réparation et rénovation de carrosserie</p>
        </div>
      </div>
    </div>
  )
}

export default Prestations