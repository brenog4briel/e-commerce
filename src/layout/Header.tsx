import "./Header.css"
import logo from "../assets/mercearia-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
import { InputAdornment, TextField } from "@mui/material";
export default function Header() {
  return (
    <header className="header">
        <img className="logo" src={logo} alt="" />
        <div className="container-search">
            <TextField sx={{width:"100%"}} 
            InputProps={{endAdornment:(
                <InputAdornment position="end">
                    <AiOutlineSearch/>
                </InputAdornment>)}}>
            </TextField>
        </div>
        <nav className="menu-navegacao">
            <a href="">Página inicial</a>
            <a href="">Categorias</a>
            <a href="">Sobre</a>
            <a href="">Contato</a>
        </nav>
          <div className="container-buttons">
            <a className="signin-btn" href="">Entrar</a>
            <a className="signup-btn" href="">Registre-se</a>
        </div>
    </header>
  )
}
