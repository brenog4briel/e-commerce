import styles from "./header.module.css"
import logo from "../../assets/mercearia-logo.png"
import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi"

export default function Header() {
  return (
     <header className={styles.header}>
      <Link to="">
         <img src={logo} alt="" className={styles.logo}/>
      </Link>
      <div className={styles.search}>
         <input type="search" name="" id="" placeholder="Digite o nome do produto que deseja buscar"/>
         <BiSearch size={30} className={styles.icon}/>
      </div>
      <nav className={styles.menu_navegacao}>
         <Link className={styles.link} to=""><p>Página inicial</p></Link>
         <Link className={styles.link}to=""><p>Categorias</p></Link>
         <Link className={styles.link} to=""><p>Sobre</p></Link>
         <Link className={styles.link}to=""><p>Contato</p></Link>
      </nav>
      <div>
         <a href="" className={styles.btn}>Entrar</a>
         <a href="" className={styles.btn}>Cadastre-se</a>
      </div>
     </header>
  )
}
