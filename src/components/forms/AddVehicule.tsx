import React,{ useState,useEffect,useRef } from "react";
import { Modal, Select, Form, Input, Upload, message ,DatePicker,Space,Steps,Popover,TimePicker } from "antd";
import { vehiculeApi } from "../../store/apis/Vehicules";
import moment from "moment";
import { marqueVehiculeApi } from "../../store/apis/Marques";

interface props {
    settoggleModal: () => any;
    toggleModal : boolean;
    
  }

  const { Step } = Steps;
  const { Option } = Select;
function AddVehicule({ toggleModal,settoggleModal }: props) {
    const {data:AllFuel}=vehiculeApi.useGetFuelQuery()
    const AllMarque=marqueVehiculeApi.useGetMarqueQuery().data?.marques
    const {data:AllModel}=vehiculeApi.useGetModelQuery()
    const [form] = Form.useForm();
    const [index, setindex] = useState(0)
    const [carMakeId, setmarquue] = useState()
    const models=AllModel?.filter((i)=>i?.carMakeId===carMakeId)
    
    const [addMarque]=marqueVehiculeApi.useAddMarqueMutation()
    const [addModel]=vehiculeApi.useAddModelMutation()
    const [addVehicule]=vehiculeApi.useAddVehiculeMutation()

    const HandelSubmit=()=>{
            if(index===0){
              form.validateFields()
              .then(async(data)=>{
                  data['date1']=new Date(data.date1).toISOString()
                  data['date2']=new Date(data.date2).toISOString()
                  delete data.carMakeId
                  await addVehicule(data)
                  .then(()=>{
                    message.success("vehicule a été ajouté avec succès")
                    settoggleModal()
                  })
              })
            }
            else if(index===1){
                form.validateFields()
            .then((data)=>{
                addMarque(data)
                .then(()=>{
                    message.success(`${data['name']} a été ajouté avec Succès`)
                    
                    setindex(0)
                })
            })
            }
            else if(index===2){
              form.validateFields()
              .then((data)=>{
                addModel(data)
                .then(()=>{
                  message.success(`${data.name} a été ajouté avec Succès`)
                  setindex(0)
                })
              })
            }
    }
    return (
        <Modal
           title={index===0?"Ajouter vehicule":index===1?"Ajouter marque":"Ajouter modèle"} 
          closable={false}
          visible={toggleModal}
          onCancel={settoggleModal}
          onOk={HandelSubmit}
          centered
          width={900}
          footer={[ 
            <button key="1" onClick={settoggleModal} className="btn__secondary mr-3">
              Cancel
            </button>,
            
              <button onClick={HandelSubmit}  key="3" className="btn__primary">
                Ajouter
              </button>
           /*  ), */
          ]}
        >
          {
            index===0?
            <Form className="personneForm" form={form} layout="vertical">
            <div className="row">
                <div className="col-6">
                <Form.Item
              label="Nom"
              name="name"
              rules={[
                { required: true, message: "Nom est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
              <Input name="name" className="input__form" placeholder="Nom" />
            </Form.Item>
                </div>
                <div className="col-6">
                <Form.Item
              label="Carburant"
              name="carFuelId"
              rules={[
                { required: true, message: "Carburant est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
                <Select  className="input__form" placeholder="Nom">
              {AllFuel?.map((i)=><Option name="id" value={i?.id}>{i?.name}</Option>
              )}
              </Select>
            </Form.Item>
            
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                <Form.Item
              label="Date 1"
              name="date1"
              rules={[
                { required: true, message: "Date 1 est obligatoire" },
              ]}
              
            >
              <DatePicker picker="month" value={moment('2022-06', 'YYYY-MM')} name="date1" className="input__form" />
            </Form.Item>
                </div>
                <div className="col-6">
                <Form.Item
              label="Date 2"
              name="date2"
              rules={[
                { required: true, message: "Date 2  est obligatoire" },
              ]}
              
            >
              <DatePicker picker="month" value={moment('2022-06', 'YYYY-MM')} name="date2" className="input__form"/>
            </Form.Item>
                </div>
            </div>
            <div className="row">
                <div className="col-6"> 
                <Form.Item
              label="Marque"
              name="carMakeId"
              rules={[
                { required: true, message: "Marque est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
                <Select onChange={(i)=>setmarquue(i)} className="input__form" placeholder="Marque">
              {AllMarque?.map((i)=><Option name="idMarque" value={i?.id}>{i?.name}</Option>
              )}
              </Select>
            </Form.Item>
                </div>
                <div className="col-6">
                <Form.Item
              label="Modèle"
              name="carModelId"
              rules={[
                { required: true, message: "Modèle est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
                <Select className="input__form" placeholder="Modèle">
              {models?.map((i)=><Option name="idModel" value={i?.id}>{i?.name}</Option>
              )}
              </Select>
            </Form.Item>
                </div>
            </div>
          </Form>
          :
          index === 1
          ?
          <Form className="personneForm" form={form} layout="vertical">
            <div className="col-6">
            <Form.Item
              label="Marque"
              name="name"
              rules={[
                { required: true, message: "Nom est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
              <Input name="name" className="input__form" placeholder="Nom" />
            </Form.Item>
            </div>
          </Form>
          :
          <Form className="personneForm" form={form} layout="vertical">
            
            <div className="row">
                <div className="col-6"> 
                <Form.Item
              label="Marque"
              name="carMakeId"
              rules={[
                { required: true, message: "Marque est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
                <Select onChange={(i)=>setmarquue(i)} className="input__form" placeholder="Marque">
              {AllMarque?.map((i)=><Option name="idMarque" value={i?.id}>{i?.name}</Option>
              )}
              </Select>
            </Form.Item>
                </div>
                <div className="col-6">
                <Form.Item
              label="Modèle"
              name="name"
              rules={[
                { required: true, message: "Nom est obligatoire" },
              ]}
              /* initialValue={dataToModel?.userName} */
            >
              <Input name="name" className="input__form" placeholder="Nom" />
            </Form.Item>
                </div>
            </div>
          </Form>
          }
          
            <Steps className="pt-4" size="small" current={index}>
        <Step style={{cursor:"pointer"}} title="Ajouter vehicule" onClick={()=>setindex(0)}/>
        <Step style={{cursor:"pointer"}} title="Ajouter marque" onClick={()=>setindex(1)}/>
        <Step style={{cursor:"pointer"}} title="Ajouter modèle" onClick={()=>setindex(2)}/>
      </Steps>
        </Modal>
      );
}

export default AddVehicule