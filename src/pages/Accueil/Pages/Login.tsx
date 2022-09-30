import { Affix, Form, Input } from 'antd'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import HeadBar from '../Layout/HeadBar'

function Login() {
  const [affixChangeHeader, setaffixChangeHeader] = useState<any>()
  const [topHeader, settopHeader] = useState(1)
  const [form] = Form.useForm();
  const [Register, setRegister] = useState(false)
  const {Login}=useAuth()
 const history=  useHistory()
  const HandleSubmit=()=>{
      if(!Register){
            form
              .validateFields()
              .then(({ email, password })=>{
                Login(email,password)
                .then(()=>{
                  history.push("/")
                  
                })
              })
      }
  }


  return (
    <div>
      <Affix offsetTop={topHeader} onChange={(i)=>setaffixChangeHeader(i)}>
         <HeadBar affixChange={affixChangeHeader}/>
      </Affix>
    {
      !Register ? (
        <div style={{width:"30%",margin: "auto"}}>
      <h3 style={{textAlign:"center", marginTop:100}}>Identifiez-vous pour accéder à votre compte automobiliste</h3>
    <Form className="personneForm mt-5" style={{textAlign:"center"}} form={form} layout="vertical">
      <Form.Item
      label="email"
      name="email"
      rules={[
        { required: true, message: "Email est obligatoire" },
      ]}>
        <Input className='input__form' name='email' />
      </Form.Item>
      <Form.Item
      label="Mot de passe"
      name="password"
      rules={[
        { required: true, message: "Mot de passe est obligatoire" },
      ]}>
        <Input className='input__form' name='password' />
      </Form.Item>
      <div className="form-submit-holder">
        <button onClick={HandleSubmit} type="submit" className="btn-spinner btn btn-primary btn-lg full-width">Connexion</button>
      </div>
    </Form>

      <p onClick={()=>setRegister(true)} style={{color:"#3fced2",textDecoration:"underline",textAlign:"center",cursor:"pointer"}} className="mt-4">Créer un compte</p>

    </div>
      ):
      (
        <div style={{width:"30%",margin: "auto"}}>
      <h3 style={{textAlign:"center", marginTop:100}}>Identifiez-vous pour accéder à votre compte automobiliste</h3>
    <Form className="personneForm mt-5" style={{textAlign:"center"}} form={form} layout="vertical">
    <Form.Item
      label="Prénom"
      name="firstName"
      rules={[
        { required: true, message: "Prénom est obligatoire" },
      ]}>
        <Input className='input__form' name='email' />
      </Form.Item>
      <Form.Item
      label="Nom"
      name="lastName"
      rules={[
        { required: true, message: "Nom est obligatoire" },
      ]}>
        <Input className='input__form' name='email' />
      </Form.Item>
      <Form.Item
      label="email"
      name="email"
      rules={[
        { required: true, message: "Email est obligatoire" },
      ]}>
        <Input className='input__form' name='email' />
      </Form.Item>
      <Form.Item
      label="Mot de passe"
      name="password"
      rules={[
        { required: true, message: "Mot de passe est obligatoire" },
      ]}>
        <Input className='input__form' name='password' />
      </Form.Item>
      <div className="form-submit-holder">
        <button onClick={HandleSubmit} type="submit" className="btn-spinner btn btn-primary btn-lg full-width">Connexion</button>
      </div>
    </Form>

      <p onClick={()=>setRegister(false)} style={{color:"#3fced2",textDecoration:"underline",textAlign:"center",cursor:"pointer"}} className="mt-4">Se connecter</p>

    </div>
      )
    }
    </div>
  )
}

export default Login