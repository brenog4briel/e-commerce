import { createBrowserRouter } from "react-router-dom";
import {Layout} from "./layout/index";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notfound";
import { Sobre } from "./pages/sobre";
import { Contato } from "./pages/contato";
import { Categorias } from "./pages/categorias";
import { LoginAndRegister } from "./pages/loginAndRegister";
import { Perfil } from "./pages/perfil";
import { CadastroProduto } from "./pages/cadastroProduto";
import { RecuperacaoSenha } from "./pages/recuperacaoSenha";
import { DetalhesProduto } from "./pages/detalhesProduto";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/sobre",
                element:<Sobre/>
            },
            {
                path:"/contato",
                element:<Contato/>
            },
            {
                path:"/categorias",
                element:<Categorias/>
            },
            {
                path:"/perfil",
                element:<Perfil/>
            },
            {
                path:"/novo-produto",
                element: <CadastroProduto/>
            },
            {
                path:"/produto/:produto_id",
                element:<DetalhesProduto/>
            },
            {
                path:"*",
                element:<NotFound/>
            }
    ]
    }
    ,
    {
        element:<LoginAndRegister/>,
        path:"/login"
    },
    {
        element:<RecuperacaoSenha/>,
        path:"/recuperacao"
    }

])

export {router}