import { createBrowserRouter } from "react-router-dom";
import {Layout} from "./layout/index";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notfound";
import { Sobre } from "./pages/sobre";
import { Contato } from "./pages/contato";
import { Categorias } from "./pages/categorias";
import { Login } from "./pages/loginAndRegister";

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
                path:"*",
                element:<NotFound/>
            }
    ]
    }
    ,
    {
        element:<Login/>,
        path:"/login"
    }
])

export {router}