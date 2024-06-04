import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import { useState } from "react";
import AxiosInstance from "../../axiosInstance";
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

export function Login() {

  const [,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z
        .string({required_error:"O email é obrigatório"})
        .trim()
        .min(10,{message:"O email precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"O email não pode possuir mais de 255 caracteres"}),
    senha: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
        .min(10,{message:"A senha precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"A senha não pode possuir mais de 255 caracteres"})
})

  type LoginSchema = z.infer<typeof loginSchema>;

  const {register,handleSubmit,formState:{errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  async function Authenticate({email,senha}: LoginSchema) {
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
            <form className={styles.form} action="" onSubmit={handleSubmit(Authenticate)}>
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
