import { createContext, useState } from "react";
import AxiosInstance from "../axiosInstance";
import {z} from "zod"
import { useNavigate } from "react-router-dom";

interface Usuario {
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    imagem:string;
    CEP: string;
}

interface AuthContextProps {
  autenticado: boolean;
  Login({email,senha}:LoginSchema): Promise<void>; 
  usuario: Usuario | null;
}


export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const loginSchema = z.object({
    email: z
        .string({required_error:"O email é obrigatório"})
        .trim()
        .min(10,{message:"O email precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"O email não pode possuir mais de 255 caracteres"}),
    senha: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
        .min(10,{message:"A senha precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"A senha não pode possuir mais de 255 caracteres"})
})

type LoginSchema = z.infer<typeof loginSchema>;

export const AuthProvider: React.FC = ({children}) => {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

  async function Login({email,senha}: LoginSchema) {
    setLoading(true);
    AxiosInstance.post('/usuarios/login', {email,senha})
    .then(() => {
      console.log("Usuário cadastrado com sucesso"); 
      setLoading(false); 
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
  }

    return (
        <AuthContext.Provider value={{Login,autenticado:Boolean(usuario),usuario}}>
            {children}
        </AuthContext.Provider>
    );
}

