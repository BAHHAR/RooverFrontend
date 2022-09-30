import { Carousel, Modal } from 'antd';
import React from 'react'
import { getImageUrl } from '../../../util/getImageUrl';

interface props{
    settoggleModal: () => any;
    toggleModal : boolean;
    images:{
        path:string|undefined
    }[]
}

function ModaPictures({settoggleModal,toggleModal,images}:props) {
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
      };
      const dynamicImages=(text)=>{
        setTimeout(() => {
          for (let i = 0; i < (images?.length||0); i++) {
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
  return (
    <Modal
       title="Les images" 
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
        <Carousel 
          afterChange={onChange}
          
          >
            {
              images?.map((text,index)=><div>
              <h3 style={dynamicImages(text?.path)}>{index+1}</h3>
            </div>)
            }
            
            
              
    </Carousel>
    </Modal>
  )
}

export default ModaPictures