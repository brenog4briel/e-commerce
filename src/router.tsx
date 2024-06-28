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
import { Eletrodomesticos } from "./pages/categorias/eletrodomesticos";
import { Livros } from "./pages/categorias/livros";
import { Cama_Mesa_Banho } from "./pages/categorias/cama_mesa_banho";
import { Vestimentas } from "./pages/categorias/vestimentas";
import { Alimentacao } from "./pages/categorias/alimentacao";
import { Tecnologia } from "./pages/categorias/tecnologia";
import { ProdutosPorProprietario } from "./pages/produtosPorProprietario";

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
                children:
                    [{
                        path:"",
                        element:<Categorias/>
                    },
                    {
                        path:"tecnologia",
                        element:<Tecnologia/>
                    },
                    {
                        path:"alimentacao",
                        element:<Alimentacao/>
                    },
                    {
                        path:"vestimentas",
                        element:<Vestimentas/>
                    },
                    {
                        path:"cama_mesa_banho",
                        element:<Cama_Mesa_Banho/>
                    },
                    {
                        path:"livros",
                        element:<Livros/>
                    },
                    {
                        path:"eletrodomesticos",
                        element:<Eletrodomesticos/>
                    }]
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
                path:"/produto/:proprietario",
                element:<ProdutosPorProprietario/>
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