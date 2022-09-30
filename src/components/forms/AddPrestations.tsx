import React,{useState} from 'react'
import {Modal,Steps,Form,Select,Input, message} from 'antd'
import { IPrestationsCategory } from '../../interfaces/IPrestation';
import { PrestationApi } from '../../store/apis/Prestations';

const { Step } = Steps;
const { Option } = Select;

interface props {
    settoggleModal: () => any;
    toggleModal : boolean;
    prestationsCategorie:IPrestationsCategory[]
  }

function AddPrestations({settoggleModal,toggleModal,prestationsCategorie}:props) {
    const [index, setindex] = useState(0)
    const [form] = Form.useForm();

    const [addPrestation]=PrestationApi.useAddPrestationMutation()
    const [addPrestationCategorie]=PrestationApi.useAddPrestationCategorieMutation()

    const HandleSubmit=()=>{
        if(index===0){
            form.validateFields()
            .then(async(data)=>{
                await addPrestation(data)
                .then(()=>{
                    console.log(data)
                    message.success("Prestation a été ajouté avec succés")
                    settoggleModal()
                })
            })
        }else{
            form.validateFields()
            .then(async(data)=> {
               await addPrestationCategorie(data)
               .then(()=>{
                message.success("Catégorie a été ajouté avec succés")
                settoggleModal()
            })
            })
        }
    }

  return (
    <Modal
       title={index===0?"Ajouter Prestation":"Ajouter catégorie"} 
      closable={false}
      visible={toggleModal}
      onCancel={settoggleModal}
      onOk={HandleSubmit}
      centered
      width={index===0?900:400}
      footer={[ 
        <button key="1" onClick={settoggleModal} className="btn__secondary mr-3">
          Cancel
        </button>,
        
          <button onClick={HandleSubmit} key="3" className="btn__primary">
            Ajouter
          </button>
       /*  ), */
      ]}
    >

      {
        index==0
        ?
        <Form className="personneForm" form={form} layout="vertical">
            <div className='row'>
                <div className='col-6'>
                <Form.Item
              label="Catégorie"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Catégorie est obligatoire",
                },
              ]}
              /* initialValue={dataToModel?.email} */
            >

                    <Select  placeholder="Catégories" className='input__form'>
                        {
                            prestationsCategorie.map((i)=><Option name="categoryId" value={i?.id} >{i?.name}</Option>)
                        }
                    </Select>
            </Form.Item>
                </div>
                <div className='col-6'>
                <Form.Item
              label="Nom"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Nom est obligatoire",
                },
              ]}
              /* initialValue={dataToModel?.email} */
            >
              <Input name="name" className="input__form" placeholder="nom" />
            </Form.Item>
                </div>
            </div>
        </Form>
        :
        <Form className="personneForm" form={form} layout="vertical">
            <Form.Item
              label="Nom"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Nom est obligatoire",
                },
              ]}
              /* initialValue={dataToModel?.email} */
            >
              <Input name="name" className="input__form" placeholder="nom" />
            </Form.Item> 
        </Form>
      }

        <Steps className="pt-4" size="small" current={index}>
        <Step style={{cursor:"pointer"}} title="Ajouter Prestation" onClick={()=>setindex(0)}/>
        <Step style={{cursor:"pointer"}} title="Ajouter catégorie" onClick={()=>setindex(1)}/>
        
      </Steps>
    </Modal>
  )
}

export default AddPrestations