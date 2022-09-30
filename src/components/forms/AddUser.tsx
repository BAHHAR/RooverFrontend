import { Modal,Select, Form,Input, message} from 'antd';
import React from 'react'
import { authApi } from '../../store/apis/auth';
import { userApi } from '../../store/apis/Users';
import { useAppSelector } from '../../store/hooks';
interface props {
    settoggleModal: () => any;
    toggleModal : boolean;
    edit:boolean;
    DataToMode:any|null
  }
function AddUser({settoggleModal,toggleModal,edit,DataToMode}:props) {

    const { Option } = Select;
  const [form] = Form.useForm();

    const {data:UserTypes}=authApi.useGetUserTypeQuery()
    const [AddUser]=userApi.useAddUserMutation()
    
    const HandelSubmit=()=>{
        form
            .validateFields()
            .then((data)=>{
                AddUser(data)
                .then(()=>{
                  message.success("Utilisateur a été ajouté avec succée")
                  window.location.reload()
                })
            })
            settoggleModal()
    }

  return (
    <Modal
       title={edit?"Ajouter un utilisateur":"Modifier un utilisateur"} 
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
        
          <button onClick={HandelSubmit} key="3" className="btn__primary">
            Ajouter
          </button>
       /*  ), */
      ]}
    >
        <Form className="personneForm" form={form} layout="vertical">
        <div className="row">
          <div className="col-6">
            <Form.Item
            label="Nom"
            name="lastName"
            initialValue={edit?DataToMode.user.lastName:""}
            rules={[
              { required: true, message: "Nom est obligatoire" },
            ]}
            >
              <Input value={edit?DataToMode.user.lastName:""} className="input__form" placeholder="Nom" />
            </Form.Item>
          </div>
          <div className="col-6">
            <Form.Item
            label="Prénom"
            name="firstName"
            initialValue={edit?DataToMode.user.firstName:""}
            rules={[
              { required: true, message: "Prénom est obligatoire" },
            ]}
            >
              <Input value={edit?DataToMode.user.firstName:""} className="input__form" placeholder="Prénom" />
            </Form.Item>
          </div>
          </div>
          <div className="row">
          <div className="col-6">
            <Form.Item
            label="Email"
            name="email"
            initialValue={edit?DataToMode.user.email:""}
            rules={[
              { required: true, message: "email est obligatoire" },
            ]}
            >
              <Input value={edit?DataToMode.user.email:""}  className="input__form" placeholder="Email" />
            </Form.Item>
          </div>
          {
            !edit?(<div className="col-6">
            <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              { required: true, message: "Mot de passe est obligatoire" },
            ]}
            >
              <Input className="input__form" type="password" placeholder="Mot de passe" />
            </Form.Item>
          </div>):''
          }
          </div>
          <div className='row'>
            <div className='col-6'>
            <Form.Item
            label="type du l'utilisateur"
            name="userTypeId"
            rules={[
              { required: true, message: "type d'utilisateur est obligatoire" },
            ]}
            >
              <Select placeholder="Type d'utilisateur" className='input__form'>
                 {
                    UserTypes?.map((i)=>i?.name!=="client"?<Option value={i?.id}>{i?.name}</Option>:"")
                 }  
              </Select>
            </Form.Item>
            </div>
          </div>
        </Form>

    </Modal>
  )
}

export default AddUser