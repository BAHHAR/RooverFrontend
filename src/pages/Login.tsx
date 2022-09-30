import { useState } from "react";
import { Form, Input, message } from "antd";
import { At, Lock, Eye, EyeSlash } from "react-bootstrap-icons";
import { Alert } from "antd";
import MySpin from "../components/Ui/Spin";
import useAuth from "../hooks/useAuth";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { authApi } from "../store/apis/auth";
interface formFields {
  email: string;
  password: string;
}


function Login() {
  const { loading, error, Login } = useAuth();
  const [form] = Form.useForm<formFields>();
  const [toggle, settoggle] = useState(false)
  const [SendEmailMethod]=authApi.useChangePasswordMutation()
  const handleSubmit = () => {
    form
      .validateFields()
      .then(({ email, password }) => {
        Login(email, password);
      })
      .catch(() => {});
  };

  const ForgetPasswordToggle=()=>{
    form.resetFields()
    settoggle(true)
  }


  const handleAnnulerToggle=()=>{
    settoggle(false)
  }

  const sendEmail=()=>{
    form.validateFields(["email"])
    .then(({email})=>{
      SendEmailMethod({email})
      message.success("message a été envoyé avec success")
    })
    
  }

  if(toggle)
  return <div className="from__center">
    <Form className="Form " form={form} layout="vertical">
    <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "email est obligatoire" },
          ]}
        >
          <Input placeholder="Email"  className="h-40 w-300" prefix={<At />} />
        </Form.Item>
          <button type="submit" className="btn__form mt-2" onClick={sendEmail}>
          Envoyer un e-mail de récupération
        </button>
        <button type="submit" className="btn__form mt-2" onClick={handleAnnulerToggle}>
          Annuler
        </button>
    </Form>
  </div>
  return loading ? (
    <MySpin />
  ) : (
    <div className="from__center">
     
      <Form className="Form " form={form} layout="vertical">
        {error ? (
          <Alert
            message={"status" in error ? error.data.message : undefined}
            type="error"
            className="w-300"
            showIcon
          />
        ) : null}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: "email", message: "email est obligatoire" },
          ]}
        >
          <Input placeholder="Email" className="h-40 w-300" prefix={<At />} />
        </Form.Item>
        <Form.Item
          label="Mot de passe"
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
        <button type="submit" className="btn__form" onClick={handleSubmit}>
          Login
        </button>
        <p className="mt-2" 
        style={{"textAlign":"center","cursor":"pointer","color":"#1CBFFF"}}
        onClick={ForgetPasswordToggle}
        >Mot de passe oublié</p>
      </Form>
    </div>
  );
}

export default Login;
