import styles from "./header.module.css"
import logo from "../../assets/mercearia-logo.png"
import { Link } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import {  useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

export default function Header() {

   const [isActive,setIsActive] = useState<boolean>(false);

   const closeNavWidth = useMediaQuery({ query: '(width > 576px)' })

   function openNavBarOptions() {
      setIsActive(!isActive)
   }
   function closeNavBarOptions() {
      setIsActive(false)
   }

   useEffect(() => {
      if (closeNavWidth) {closeNavBarOptions()}
   },[closeNavWidth])
   
  return (
   <>
     <header className={styles.header}>

         <nav className={styles.menu_navegacao_desktop} >
            <Link className={styles.link} to="/" onClick={closeNavBarOptions}><p>Página inicial</p></Link>
            <Link className={styles.link}to="/categorias" onClick={closeNavBarOptions}><p>Categorias</p></Link>
            <Link className={styles.link} to="/sobre" onClick={closeNavBarOptions}><p>Sobre</p></Link>
            <Link className={styles.link}to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
         </nav>

         <div className={styles.menu_navegacao_mobile}>
            <FiAlignJustify size={30} cursor="pointer" onClick={() => openNavBarOptions()}/>
         </div>
      
         <div className={styles.search}>
            <input type="search" name="" id="" placeholder="Ex.: Escova de dentes"/>
         </div>
         
         <div>
            <a href="" className={styles.btn}>Entrar</a>
            <a href="" className={styles.btn}>Cadastre-se</a>
         </div>

          <Link to="">
            <img src={logo} alt="" className={styles.logo}/>
         </Link>

     </header>
   
        <div className={isActive ? styles.navigation_mobile_online : styles.navigation_mobile_offline}>
            <Link className={styles.link} to="/" onClick={closeNavBarOptions}><p>Página inicial</p></Link>
            <Link className={styles.link} to="/categorias" onClick={closeNavBarOptions}><p>Categorias</p></Link>
            <Link className={styles.link} to="/sobre" onClick={closeNavBarOptions}><p>Sobre</p></Link>
            <Link className={styles.link} to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
            <Link className={styles.link} to="#" onClick={closeNavBarOptions}><MdClose size={25} color="black">Fechar</MdClose></Link>                  
         </div>
         
           
   </>

  )
}
