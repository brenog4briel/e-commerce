import styles from "./header.module.css"
import logo from "../../assets/mercearia-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import { InputAdornment, TextField } from "@mui/material";

export default function Header() {
  return (
      <header className={styles.header}>
          <img className={styles.logo} src={logo} alt="" />
          <div className={styles.container_search}>
              <TextField sx={{width:"100%"}} 
                InputProps={{endAdornment:(
                  <InputAdornment position="end">
                      <AiOutlineSearch/>
                  </InputAdornment>)}}>
              </TextField>
          </div>
          <nav className={styles.menu_navegacao}>
              <a href="">Página inicial</a>
              <a href="">Categorias</a>
              <a href="">Sobre</a>
              <a href="">Contato</a>
          </nav>
            <div className={styles.container_buttons}>
              <a className={styles.signin_btn} href="">Entrar</a>
              <a className={styles.signup_btn} href="">Registre-se</a>
          </div>
      </header>
  )
}
