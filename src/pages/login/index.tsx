import { Link } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import {useForm} from "react-hook-form"
import { LoginSchema,loginSchema } from "../../validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export function Login() {

  const navigate = useNavigate();
  const {Authenticate} = useAuth();
  const [loading,setLoading] = useState<boolean>(false);

  const {register,handleSubmit,formState:{errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  async function Auth({email,senha}: LoginSchema) {
    setLoading(true);
    Authenticate({email,senha})
    .then((res) => {
      console.log(res);
      navigate("/")
    })
  }

  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.container_title}>
              <p className={styles.title}>Bem vindo ao E-commerce</p>
              <img src={logo} alt="" className={styles.logo}/>
            </div>
            <form className={styles.form} action="" onSubmit={handleSubmit(Auth)}>
                <input type="text" placeholder="Email ou número" {...register("email")}/>
                {errors.email && <p className={styles.input_error_message}>{errors.email.message}</p>}
                <input type="password" placeholder="Senha" {...register("senha")}/>
                {errors.senha && <p className={styles.input_error_message}>{errors.senha.message}</p>}
                  {!loading && <input type="submit" value="Entrar"/>} 
                  {loading && <CircularProgress size={25} />}
            </form>
            <div className={styles.func_buttons}>
                <Link className={styles.btn_forgot} to="#">Esqueceu sua senha?</Link>
                <Link className={styles.btn_register} to="/register">Registre-se</Link>
            </div>
        </div>

  

    </div>
  )
}
