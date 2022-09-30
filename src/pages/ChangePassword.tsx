import React from 'react'
import { Form, Input,message,Modal } from "antd";
import { At, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";
import { authApi } from '../store/apis/auth';
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
interface formFields {
    password: string;
    confirmPassowrd:string
  }

function ChangePassword() {
  const { loading, error, Login } = useAuth();
  const history=useHistory()
  const [updatePassword]=authApi.useUpdatePasswordForgetPasswordMutation();
  const [form] = Form.useForm<formFields>();
  const url=window.location.href.split("token=")
  const token=url[1]
  const handleSubmit=()=>{
    form
      .validateFields()
      .then(({ password,confirmPassowrd }) => {
        if(password===confirmPassowrd){
          updatePassword({
          token,password
        }).then((res:any)=>{
          console.log(res)
          //@ts-ignore
           //Login(email,password) 
          if(res?.error?.data?.code === 400)  
            message.error(res?.error?.data?.message)
          else{
            message.success("Votre Mot de passe a été modifier avec succes")
            window.location.href="https://backoffice-v2-isuzu.web.app"
          }
        })
        }else{
          message.error('Verifier votre mot de passe')
        }
        
      })
  };
  
  return (
    
    <div className="from__center">
    <Form className="Form " form={form} layout="vertical" >
    
      <Form.Item
        label="Nouveau Mot de passe"
        name="password"
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
        name="confirmPassowrd"
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
</div>
  )
}
export default ChangePassword