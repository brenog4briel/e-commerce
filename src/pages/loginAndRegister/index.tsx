import { Link } from "react-router-dom";
import styles from "./loginAndRegister.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import {useForm} from "react-hook-form"
import { LoginSchema,loginSchema } from "../../validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { RegistroSchema, registroSchema } from "../../validations/register";
import AxiosInstance from "../../axiosInstance";
import { Popup } from "../../components/popup";

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

export function LoginAndRegister() {
  
  const navigate = useNavigate();
  const {Authenticate} = useAuth();
  const [emailLogin,setEmailLogin] = useState<string>("")
  const [senhaLogin,setSenhaLogin] = useState<string>("")

  const [emailRegistro,setEmailRegistro] = useState<string>("")
  const [senhaRegistro,setSenhaRegistro] = useState<string>("")
  const [endereco,setEndereco] = useState<string>("")
  const [CEP,setCEP] = useState<string>("")
  const [nome,setNome] = useState<string>("")


  const [loginLoading,setLoginLoading] = useState<boolean>(false);
  const [registerLoading,setRegisterLoading] = useState<boolean>(false);
  const [loginError,setLoginError] = useState<boolean | undefined>(undefined)
  const [registroError,setRegistroError] = useState<boolean | undefined>(undefined)

  const [loginRequestError,setLoginRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
  const [registerRequestError,setRegisterRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})

  const {register:loginRegister,handleSubmit:handleSubmitLogin,formState:{errors:login_errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  function counterTimePopup() {
    setTimeout(() => {
      setLoginError(undefined);
      setRegistroError(undefined)
    },3000)
  }

  async function Auth({email,senha}: LoginSchema) {
    setLoginLoading(true);
    Authenticate({email,senha})
    .then(() => {
      setLoginError(false);
      setLoginLoading(false);
      navigate("/")
    })
    .catch((err) => {
      console.log(err.response.data.message);
      setLoginRequestError(prev => ({...prev,mensagem:err.response.data.message,sucesso:false}))
      setLoginError(true);
      setLoginLoading(false);
      setEmailLogin("")
      setSenhaLogin("")
      counterTimePopup()
    })
  }

const [tabValue, setTabValue] = useState<number>(0);

const handleChange = (event: React.SyntheticEvent, tab: number) => {
  setTabValue(tab);
};


const {register:signupRegister,handleSubmit:handleSubmitRegister,formState:{errors:register_errors}} = useForm<RegistroSchema>({
  resolver: zodResolver(registroSchema)
});

async function RegisterUser({nome,senha,email,endereco,CEP} : RegistroSchema) {
  setRegisterLoading(true);
  AxiosInstance.post('/usuarios', {nome,senha,email,endereco,CEP})
  .then(() => {
    console.log("Usuário cadastrado com sucesso"); 
    setRegisterRequestError(prev => ({...prev,mensagem:"Usuário cadastrado com sucesso",sucesso:true}))
    setRegistroError(false)
    setRegisterLoading(false);
    counterTimePopup()
    navigate("/")
  })
  .catch((err) => {
    console.log(err.response.data.message);
    setRegisterRequestError(prev => ({...prev,mensagem:err.response.data.message,sucesso:false}))
    setRegistroError(true)
    setRegisterLoading(false);
    setEmailRegistro("")
    setSenhaRegistro("")
    counterTimePopup()

  });
}

  return (
    <div className={styles.container}>
        <div className={styles.containerUser}>

        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Entrar" sx={{width:"50%"}}/>
          <Tab label="Registrar" sx={{width:"50%"}}/>
        </Tabs>
        {tabValue === 0 ? 
        <>
          <div className={styles.containerUserTitle}>
          <p className={styles.userTitle}>Bem vindo ao E-commerce</p>
          <img src={logo} alt="" className={styles.logo}/>
          </div>
          <form className={styles.form} method="post" onSubmit={handleSubmitLogin(Auth)}>
              <input type="text" placeholder="Email" {...loginRegister("email")} value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}/>
              {login_errors.email && <p className={styles.input_error_message}>{login_errors.email.message}</p>}
              <input type="password" placeholder="Senha" {...loginRegister("senha")} value={senhaLogin} onChange={(e) => setSenhaLogin(e.target.value)}/>
              {login_errors.senha && <p className={styles.input_error_message}>{login_errors.senha.message}</p>}
              {(tabValue === 0 && !loginLoading) && <button type="submit" name="Entrar">Entrar</button>} 
              {(tabValue === 0 && loginLoading) && <CircularProgress size={25} />}
          </form>
          <div className={styles.func_buttons}>
            <Link className={styles.btn_forgot} to="/recuperacao">Esqueceu sua senha?</Link>
            <Link className={styles.btn_register} to="/register">Registre-se</Link>
          </div>
        </>
        :
        <>
          <div className={styles.containerUserTitle}>
            <p className={styles.userTitle}>Cadastro</p>
          </div>
          <form className={styles.form} method="post" onSubmit={handleSubmitRegister(RegisterUser)}>
              <input type="text" placeholder="Nome" {...signupRegister("nome")} value={nome} onChange={(e) => setNome(e.target.value)}/>
              {register_errors.nome && <p className={styles.input_error_message}>{register_errors.nome.message}</p>}
              <input type="password" placeholder="Senha" {...signupRegister("senha")} value={senhaRegistro} onChange={(e) => setSenhaRegistro(e.target.value)}/>
              {register_errors.senha && <p className={styles.input_error_message}>{register_errors.senha.message}</p>}
              <input type="email" placeholder="Email" {...signupRegister("email")} value={emailRegistro} onChange={(e) => setEmailRegistro(e.target.value)}/>
              {register_errors.email && <p className={styles.input_error_message}>{register_errors.email.message}</p>}
              <input type="text" placeholder="Endereço" {...signupRegister("endereco")} value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
              {register_errors.endereco && <p className={styles.input_error_message}>{register_errors.endereco.message}</p>}
              <input type="text" placeholder="CEP" {...signupRegister("CEP")} value={CEP} onChange={(e) => setCEP(e.target.value)}/>
              {register_errors.CEP && <p className={styles.input_error_message}>{register_errors.CEP.message}</p>}
              {(tabValue === 1 && !registerLoading) && <button type="submit">Registrar</button>} 
              {(tabValue === 1 && registerLoading) && <CircularProgress size={25} />}
          </form>
        </>
      }
        </div>  
        
        {((loginError === true) || (loginError === false)) && <Popup mensagem={loginRequestError.mensagem} sucesso={loginRequestError.sucesso}/>}
        {((registroError === true) || (registroError === false)) && <Popup mensagem={registerRequestError.mensagem} sucesso={registerRequestError.sucesso}/>}
        

    </div>
  )
}


