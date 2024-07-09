import logo from "../../assets/header/mercearia-logo.png"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { Contrast,Login,Info ,ShoppingCart,Person,ShoppingBag} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function Header() {

  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const {Logout,autenticado} = useAuth();

  const handleLogout = () => {
    Logout();
    navigate("/login")
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleOpenDrawer}>
      <List>
        {autenticado && <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/perfil")}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Meu perfil" />
            </ListItemButton>
          </ListItem>}

          {autenticado && <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <ShoppingBag />
              </ListItemIcon>
              <ListItemText primary="Lista de desejos" />
            </ListItemButton>
          </ListItem>}

          {autenticado && <ListItem disablePadding>
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
              {autenticado ? <ListItemText primary="Sair" onClick={handleLogout}/> : <ListItemText primary="Entrar" onClick={() => navigate("/login")}/>}
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

   const mobileNavBar = useMediaQuery({ query: '(width < 850px)' })

  return (
   <>
     {/* <header className={styles.header}>

         <nav className={styles.menu_navegacao_desktop} >
            <Link className={styles.link} to="/" onClick={closeNavBarOptions}><p>Página inicial</p></Link>
            <Link className={styles.link}to="/categorias" onClick={closeNavBarOptions}><p>Categorias</p></Link>
            <Link className={styles.link}to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
         </nav>

         <div className={styles.menu_navegacao_mobile}>
            <FiAlignJustify size={30} cursor="pointer" onClick={() => openDrawerNavBarOptions()}/>
         </div>
      
         <div className={styles.search}>
            <input type="search" name="" id="" placeholder="Ex.: Escova de dentes"/>
         </div>
         
        <div>
          <a href={autenticado ? "/novo-produto" : "/login"} className={styles.btn}>Anuncie seu produto</a>
        </div> 
          <Link to="">
            <img src={logo} alt="" className={styles.logo}/>
         </Link>

     </header> */}
{/* 
        <div className={isActive ? styles.navigation_mobile_online : styles.navigation_mobile_offline}>
            <Link className={styles.link} to="/" onClick={closeNavBarOptions}><p>Página inicial</p></Link>
            <Link className={styles.link} to="/categorias" onClick={closeNavBarOptions}><p>Categorias</p></Link>
            <Link className={styles.link} to="/contato" onClick={closeNavBarOptions}><p>Contato</p></Link>
            <Link className={styles.link} to="#" onClick={closeNavBarOptions}><MdClose size={25} color="black">Fechar</MdClose></Link>                  
         </div> */}
         <AppBar position="static" sx={{backgroundColor:"ghostwhite"}}>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" sx={{"&:hover":{
                backgroundColor:"inherit"
              }}} onClick={() => navigate("/")}>
                <img src={logo} style={{borderRadius:"50%"}}></img>
              </IconButton>

              <Typography variant="h6" component="div" sx={{flexGrow:1,color:"#222222"}}>E-commerce</Typography>

              {!mobileNavBar ? 
              <Stack direction="row" spacing={2}>
                <Button sx={{color:"#222222",fontSize:"12px"}} href="/">Página inicial</Button>
                <Button sx={{color:"#222222",fontSize:"12px"}} href="/categorias">Categoria</Button>
                <Button sx={{color:"#222222",fontSize:"12px"}} href="/contato">Contato</Button>
                <Button sx={{color:"#444444",fontSize:"12px",backgroundColor:"#dedede","&:hover":{backgroundColor:"#dedede"}}} href={autenticado ? "/novo-produto" : "/login"}>Anuncie o seu produto</Button>
              </Stack>

              : <Stack>
                <IconButton size="large" edge="start" color="inherit" sx={{"&:hover":{backgroundColor:"inherit"}}} onClick={handleClick}>
                  <MenuIcon sx={{color:"black"}}/>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => {navigate("/");handleClose()}}>Página inicial</MenuItem>
                  <MenuItem onClick={() => {navigate("/categorias");handleClose()}}>Categoria</MenuItem>
                  <MenuItem onClick={() => {navigate("/contato");handleClose()}}>Contato</MenuItem>
                </Menu>
              </Stack>
              }
              
            </Toolbar>
         </AppBar>

        <Box sx={{padding:"5px 20px"}}>
            <IconButton size="large" edge="start" color="inherit" onClick={handleOpenDrawer}>
                <MenuOpenIcon sx={{cursor:"pointer"}}/>
              </IconButton>
            <Drawer open={openDrawer} onClose={handleCloseDrawer}>
              {DrawerList}
            </Drawer>
        </Box>
           
   </>

  )
}
