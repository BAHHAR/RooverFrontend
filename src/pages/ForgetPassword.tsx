import React,{useState} from 'react'
import { Form, Input,message,Modal } from "antd";
import { At, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import { authApi } from '../store/apis/auth';
import useAuth from "../hooks/useAuth";
import { useAppSelector } from '../store/hooks';
interface formFields {
    password: string;
    confirmPassowrd:string
  }
interface props{
  setToggle:any,
  Toggle:boolean
}
function ForgetPassword() {
  const { loading, error, Login } = useAuth();
  const history=useHistory()
  const [updatePassword]=authApi.useUpdatePasswordMutation();
  const auth = useAppSelector((state) => state.auth.user);
  const [form] = Form.useForm<formFields>();
  const [Toggle, setToggle] = useState(true)
  const handleCancel = () => {
    history.push("/")
  };
  const handleSubmit=()=>{
    form
      .validateFields()
      .then(({  password }) => {
        updatePassword({
          password:password
        }).then(()=>{
          //@ts-ignore
          Login(auth?.email,password)
          message.success("Votre Mot de passe a été modifier avec succes")
          history.push("/")
        })
      })
  };
  
  return (
    
    <Modal
    visible={Toggle}
    okButtonProps={{
      style: {
        display: "none",
      },
    }}
    cancelButtonProps={{
      style: {
        display: "none",
      },
    }}
    onCancel={handleCancel}
    >
    <Form className="Form " form={form} layout="vertical" style={{textAlign:"center",width:"95%"}}>

      
      <Form.Item
        label="Nouveau Mot de passe"
        name="password"
        style={{alignContent:'center'}}
        rules={[
          { required: true, message: "Mot de passe est obligatoire" },
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
          //   message: "Mot de passe est invalid",
          // },
        ]}
      >
        <Input.Password
          prefix={<Lock />}
          placeholder="password"
          className="h-40 w-300"
          iconRender={(visible) => (visible ? <Eye /> : <EyeSlash />)}
        />
      </Form.Item>
      <Form.Item
        label="Cofirme le Mot de passe"
        style={{alignContent:'center'}}
        name="confirmpassword"
        rules={[
          { required: true, message: "Mot de passe est obligatoire" },
          // {
          //   pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
          //   message: "Mot de passe est invalid",
          // },
        ]}
      >
        <Input.Password
          prefix={<Lock />}
          placeholder="password"
          className="h-40 w-300"
          iconRender={(visible) => (visible ? <Eye /> : <EyeSlash />)}
        />
      </Form.Item>
      <button type="submit" className="btn__form" onClick={handleSubmit}>
        Changer le mot de pass
      </button>
    </Form>
  </Modal>

  )
}

export default ForgetPassword
