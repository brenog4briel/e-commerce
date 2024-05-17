import "./Header.css"
import logo from "../assets/mercearia-logo.png"
import { AiOutlineSearch } from "react-icons/ai";
export default function Header() {
  return (
    <header className="header">
        <img className="logo" src={logo} alt="" />
        <div className="container-search">
            <input type="search" name="" id="" />
            <div className="container-icon-search">
                <AiOutlineSearch className="search-icon" size={20}/>
            </div>
        </div>
        <nav className="menu-navegacao">
            <a href="">Página inicial</a>
            <a href="">Categorias</a>
            <a href="">Sobre</a>
            <a href="">Contato</a>
        </nav>
        <div className="container-buttons">
            <a href="">Entrar</a>
            <a href="">Registre-se</a>
        </div>
    </header>
  )
}
