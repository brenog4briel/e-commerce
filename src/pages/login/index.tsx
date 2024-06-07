import { Link } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import {useForm} from "react-hook-form"
import { LoginSchema,loginSchema } from "../../validations/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {

  const {Authenticate} = useAuth();

  const {register,handleSubmit,formState:{errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  async function Auth({email,senha}: LoginSchema) {
    await Authenticate({email,senha});
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
