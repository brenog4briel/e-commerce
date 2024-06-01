import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/mercearia-logo.png"
import { useState } from "react";

const url = "https://e-commerce-api-5sxy.onrender.com";

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
    fetch(`${url}/usuarios/login`,{
      method:"post",
      headers:{
        'Accept': 'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({email,senha})
    })
    .then(() => {
      console.log("Autenticação realizada com sucesso!"); 
      setLoading(false); 
      navigate("/")
    })
    .catch((err) => console.log(err))
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
