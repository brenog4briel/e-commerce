import styles from "./header.module.css"
import logo from "../../assets/mercearia-logo.png"
import { Link } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function Header() {

   const [isActive,setIsActive] = useState<boolean>(false);

   function openNavBarOptions() {
      setIsActive(!isActive)
      console.log(isActive)
   }
   function closeNavBarOptions() {
      setIsActive(false)
      console.log(isActive)

   }

  return (
   <>
     <header className={styles.header}>

         <nav className={styles.menu_navegacao}>
            <Link className={styles.link} to=""><p>Página inicial</p></Link>
            <Link className={styles.link}to=""><p>Categorias</p></Link>
            <Link className={styles.link} to=""><p>Sobre</p></Link>
            <Link className={styles.link}to=""><p>Contato</p></Link>
         </nav>

         <div className={styles.menu_navegacao_mobile}>
            <FiAlignJustify size={30} cursor="pointer" onClick={() => openNavBarOptions()}/>
         </div>
      
         <div className={styles.search}>
            <input type="search" name="" id="" placeholder="Digite o nome do produto que deseja buscar"/>
         </div>
         
         <div>
            <a href="" className={styles.btn}>Entrar</a>
            <a href="" className={styles.btn}>Cadastre-se</a>
         </div>

          <Link to="">
            <img src={logo} alt="" className={styles.logo}/>
         </Link>

     </header>
   
        <div className={isActive ? styles.drawer_navigation_mobile_online : styles.drawer_navigation_mobile_offline}>
                  <Link className={styles.link} to="/"><p>Página inicial</p></Link>
                  <Link className={styles.link} to="/"><p>Categorias</p></Link>
                  <Link className={styles.link} to="/"><p>Sobre</p></Link>
                  <Link className={styles.link} to="/"><p>Contato</p></Link>
                  <Link className={styles.link} to="/" onClick={closeNavBarOptions}><MdClose size={25} color="black">Fechar</MdClose></Link>                  
            </div>
            
   </>

  )
}
