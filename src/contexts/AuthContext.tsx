import { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../axiosInstance";
import { LoginSchema } from "../validations/login";

interface Usuario {
    usuario_id: string;
    nome: string;
    senha: string;
    email: string;
    endereco: string;
    imagem:string;
    CEP: string;
    criadoEm: string;
    atualizadoEm: string;
}

interface AuthContextProps {
  autenticado: boolean;
  usuario: Usuario | null;
  Authenticate({email,senha}:LoginSchema): Promise<void>; 
  Logout(): void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {

    const storedUser = sessionStorage.getItem("usuario");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUsuario(JSON.parse(storedUser));
      AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  },[])

  async function Authenticate({email,senha}: LoginSchema) {
    const result = await AxiosInstance.post('/usuarios/login', {email,senha})
    setUsuario(result.data.usuario)

    sessionStorage.setItem("usuario",JSON.stringify(result.data.usuario))
    sessionStorage.setItem("token",result.data.token)
  }

  function Logout() {
    setUsuario(null);
    sessionStorage.clear();
  }


    return (
        <AuthContext.Provider value={{autenticado:Boolean(usuario),usuario,Authenticate,Logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context;
}
