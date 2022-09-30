import React from 'react'
import { IGaragiste } from '../../../interfaces/IGaragiste'
import {Modal,Popover} from 'antd'

import GoogleMapReact from 'google-map-react';
import { GeoAltFill } from 'react-bootstrap-icons';
const AnyReactComponent = ({ lat,lng,text }) => <div>
  <Popover content={text}>
  <GeoAltFill size={18} color="red"/>
  </Popover>
</div>;
interface porps{
    garages:IGaragiste[];
    settoggleModal: () => any;
    toggleModal : boolean;
}
function MapAllGarages({garages,settoggleModal,toggleModal}:porps) {
    const defaultProps = {
        center: {
          lat: 31.791702,
          lng: -7.09262
        },
        zoom: 11
      };
  return (
    <Modal
       title="Listes des garages" 
      closable={false}
      visible={toggleModal}
      onCancel={settoggleModal}
      centered
      width={900}
      footer={[ 
        <button key="1" onClick={settoggleModal} className="btn__secondary mr-3">
          Cancel
        </button>,
        
      ]}
    >

<div style={{ height: '60vh', width: '100%' }} className="col-12">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCpSp2Aw5OlIBRHBW82leKbGG4dCjWBGPk" }}
        defaultCenter={defaultProps.center}
       
        defaultZoom={5}
                
      >
    
          {
            garages.map((data)=><AnyReactComponent
            lat={data.lat}
            lng={data.lng}
            text={data.name}
          />)
          }
       
        
      </GoogleMapReact>
          </div>

    </Modal>
  )
}

export default MapAllGarages