import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import { useState } from "react";
import AxiosInstance from "../../axiosInstance";
import {useForm} from "react-hook-form"

export function Login() {

  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.container_title}>
              <p className={styles.title}>Bem vindo ao E-commerce</p>
              <img src={logo} alt="" className={styles.logo}/>
            </div>
            {/* <form className={styles.form} action="" onSubmit={handleSubmit(Authenticate)}>
                <input type="text" placeholder="Email ou número" {...register("email")}/>
                {errors.email && <p className={styles.input_error_message}>{errors.email.message}</p>}
                <input type="password" placeholder="Senha" {...register("senha")}/>
                {errors.senha && <p className={styles.input_error_message}>{errors.senha.message}</p>}
                <input type="submit" value="Entrar" />
            </form> */}
            <div className={styles.func_buttons}>
                <Link className={styles.btn_forgot} to="#">Esqueceu sua senha?</Link>
                <Link className={styles.btn_register} to="/register">Registre-se</Link>
            </div>
        </div>

  

    </div>
  )
}
