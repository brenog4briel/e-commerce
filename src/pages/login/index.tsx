import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import { useState } from "react";
import AxiosInstance from "../../axiosInstance";
interface LoginData {
  email:string;
  senha:string;
}

export function Login() {

  const [,setLoading] = useState<boolean>(false);
  const [senha,setSenha] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const navigate = useNavigate();

  async function Authenticate(e: React.FormEvent<HTMLFormElement>,{email,senha} : LoginData) {
     e.preventDefault();
    setLoading(true);
    AxiosInstance.post('/usuarios/login', {email,senha})
    .then(() => {
      console.log("Usuário cadastrado com sucesso"); 
      setLoading(false); 
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.container_title}>
              <p className={styles.title}>Bem vindo ao E-commerce</p>
              <img src={logo} alt="" className={styles.logo}/>
            </div>
            <form className={styles.form} action="" onSubmit={(e) => Authenticate(e,{email,senha})}>
                <input type="text" placeholder="Email ou número" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <input type="submit" value="Entrar" />
            </form>
            <div className={styles.func_buttons}>
                <Link className={styles.btn_forgot} to="#">Esqueceu sua senha?</Link>
                <Link className={styles.btn_register} to="/register">Registre-se</Link>
            </div>
        </div>
    </div>
  )
}
