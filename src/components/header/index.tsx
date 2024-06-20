import styles from "./header.module.css"
import logo from "../../assets/header/mercearia-logo.png"
import { Link } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import {  useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Contrast,Login,Info ,ShoppingCart,Person,ShoppingBag} from "@mui/icons-material";
import { GrMenu } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export default function Header() {

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [isAuth,setIsAuth] = useState<boolean>(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {

    const storedUser = sessionStorage.getItem("usuario");

    if (storedUser) {
      setIsAuth(true)
    }
  },[])

  const {Logout} = useAuth();
   
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>

        {isAuth && <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/perfil")}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Meu perfil" />
            </ListItemButton>
          </ListItem>}

          {isAuth && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <ShoppingBag />
              </ListItemIcon>
              <ListItemText primary="Lista de desejos" />
            </ListItemButton>
          </ListItem>}

          {isAuth && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCart /> 
              </ListItemIcon>
              <ListItemText primary="Carrinho" />
            </ListItemButton>
          </ListItem>}

      </List>
      <Divider />
      <List>
         <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Contrast />
              </ListItemIcon>
              <ListItemText primary="Tema" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/sobre")}>
              <ListItemIcon>
                 <Info />
              </ListItemIcon>
              <ListItemText primary="Sobre" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Login /> 
              </ListItemIcon>
              {isAuth ? <ListItemText primary="Sair" onClick={Logout}/> : <ListItemText primary="Entrar" onClick={() => navigate("/login")}/>}
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );


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
            <Link className={styles.link}to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
         </nav>

         <div className={styles.menu_navegacao_mobile}>
            <FiAlignJustify size={30} cursor="pointer" onClick={() => openNavBarOptions()}/>
         </div>
      
         <div className={styles.search}>
            <input type="search" name="" id="" placeholder="Ex.: Escova de dentes"/>
         </div>
         
        <div>
          <a href={isAuth ? "/novo-produto" : "/login"} className={styles.btn}>Anuncie seu produto</a>
        </div> 
          <Link to="">
            <img src={logo} alt="" className={styles.logo}/>
         </Link>

     </header>

      <div className={styles.drawer}>
        <Button onClick={toggleDrawer(true)}><GrMenu size={20} color="black"/><p style={{color:"black", marginLeft:"5px", fontSize:"12px"}}>Opções</p></Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
      </div>


        <div className={isActive ? styles.navigation_mobile_online : styles.navigation_mobile_offline}>
            <Link className={styles.link} to="/" onClick={closeNavBarOptions}><p>Página inicial</p></Link>
            <Link className={styles.link} to="/categorias" onClick={closeNavBarOptions}><p>Categorias</p></Link>
            <Link className={styles.link} to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
            <Link className={styles.link} to="#" onClick={closeNavBarOptions}><MdClose size={25} color="black">Fechar</MdClose></Link>                  
         </div>
         
           
   </>

  )
}
