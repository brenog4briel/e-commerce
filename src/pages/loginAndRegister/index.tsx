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

export function LoginAndRegister() {

  const navigate = useNavigate();
  const {Authenticate} = useAuth();
  const [loginLoading,setLoginLoading] = useState<boolean>(false);
  const [registerLoading,setRegisterLoading] = useState<boolean>(false);

  const {register:loginRegister,handleSubmit:handleSubmitLogin,formState:{errors:login_errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  async function Auth({email,senha}: LoginSchema) {
    setLoginLoading(true);
    Authenticate({email,senha})
    .then((res) => {
      console.log(res);
      navigate("/")
    })
  }

  
const [tabValue, setTabValue] = useState<number>(0);

const handleChange = (event: React.SyntheticEvent, tab: number) => {
  setTabValue(tab);
};


const {register:signupRegister,handleSubmit:handleSubmitRegister,formState:{errors:register_errors}} = useForm<RegistroSchema>({
  resolver: zodResolver(registroSchema)
});

async function RegisterUser({nome,senha,email,endereco,CEP,imagem} : RegistroSchema) {
  setRegisterLoading(true);
  AxiosInstance.post('/usuarios', {nome,senha,email,endereco,CEP,imagem})
  .then(() => {
    console.log("Usuário cadastrado com sucesso"); 
    setRegisterLoading(false); 
    navigate("/")
  })
  .catch((error) => {
    console.error(error);
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
          <form className={styles.form} action="" onSubmit={handleSubmitLogin(Auth)}>
              <input type="text" placeholder="Email ou número" {...loginRegister("email")}/>
              {login_errors.email && <p className={styles.input_error_message}>{login_errors.email.message}</p>}
              <input type="password" placeholder="Senha" {...loginRegister("senha")}/>
              {login_errors.senha && <p className={styles.input_error_message}>{login_errors.senha.message}</p>}
              {(tabValue === 0 && !loginLoading) && <button type="submit" name="Entrar">Entrar</button>} 
              {(tabValue === 0 && loginLoading) && <CircularProgress size={25} />}
          </form>
          <div className={styles.func_buttons}>
            <Link className={styles.btn_forgot} to="#">Esqueceu sua senha?</Link>
            <Link className={styles.btn_register} to="/register">Registre-se</Link>
          </div>
        </>
        :
        <>
          <div className={styles.containerUserTitle}>
            <p className={styles.userTitle}>Cadastro</p>
          </div>
          <form className={styles.form} action="" onSubmit={handleSubmitRegister(RegisterUser)}>
              <input type="text" placeholder="Nome" {...signupRegister("nome")}/>
              {register_errors.nome && <p className={styles.input_error_message}>{register_errors.nome.message}</p>}
              <input type="password" placeholder="Senha" {...signupRegister("senha")}/>
              {register_errors.senha && <p className={styles.input_error_message}>{register_errors.senha.message}</p>}
              <input type="email" placeholder="Email" {...signupRegister("email")}/>
              {register_errors.email && <p className={styles.input_error_message}>{register_errors.email.message}</p>}
              <input type="text" placeholder="Endereço" {...signupRegister("endereco")}/>
              {register_errors.endereco && <p className={styles.input_error_message}>{register_errors.endereco.message}</p>}
              <input type="text" placeholder="CEP" {...signupRegister("CEP")}/>
              {register_errors.CEP && <p className={styles.input_error_message}>{register_errors.CEP.message}</p>}
              <input type="text" placeholder="Imagem" {...signupRegister("imagem")}/>
              {register_errors.imagem && <p className={styles.input_error_message}>{register_errors.imagem.message}</p>}

              {(tabValue === 1 && !registerLoading) && <button type="submit">Registrar</button>} 
              {(tabValue === 1 && registerLoading) && <CircularProgress size={25} />}
          </form>
        </>
      }
             
        </div>
    </div>
  )
}


