import logo from "../../assets/header/mercearia-logo.png"
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
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
            <ListItemButton onClick={() => navigate("/login")}>
              <ListItemIcon>
                <Login /> 
              </ListItemIcon>
              {autenticado ? <ListItemText primary="Sair" onClick={handleLogout}/> : <ListItemText primary="Entrar"/>}
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

   const mobileNavBar = useMediaQuery({ query: '(width < 850px)' })

  return (
   <>
         <AppBar position="static" sx={{backgroundColor:"ghostwhite"}}>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" sx={{"&:hover":{
                backgroundColor:"inherit"
              }}} onClick={() => navigate("/")}>
                <Avatar src={logo}></Avatar>
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
