import { Link } from "react-router-dom";
import styles from "./login.module.css"

export function Login() {
  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <p className={styles.title}>Bem vindo ao E-commerce</p>
            <form className={styles.form} action="">
                <input type="text" placeholder="Email ou número"/>
                <input type="password" placeholder="Senha"/>
                <a href="">Entrar</a>
            </form>
            <div className={styles.func_buttons}>
                <Link className={styles.btn_forgot} to="">Esqueceu sua senha?</Link>
                <Link className={styles.btn_register} to="">Registre-se</Link>
            </div>
        </div>
    </div>
  )
}
