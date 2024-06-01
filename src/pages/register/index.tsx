import { useState } from "react";
import styles from "./register.module.css"
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axiosInstance";

interface UsuarioData {
   nome: string;
   senha:string;
   email:string;
   endereco:string;
   CEP:string;
   imagem:string;
}

export function Register() {


  const [,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function RegisterUser(e: React.FormEvent<HTMLFormElement>,{nome,senha,email,endereco,CEP,imagem} : UsuarioData) {
    e.preventDefault();
    setLoading(true);
    AxiosInstance.post('/usuarios', {nome,senha,email,endereco,CEP,imagem})
    .then(() => {
      console.log("Usuário cadastrado com sucesso"); 
      setLoading(false); 
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
  }
    

  const [nome,setNome] = useState<string>("");
  const [senha,setSenha] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [endereco,setEndereco] = useState<string>("");
  const [CEP,setCEP] = useState<string>("");
  const [imagem,setImagem] = useState<string>("");

  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.container_title}>
              <p className={styles.title}>Cadastro</p>
            </div>
            <form className={styles.form} action="" onSubmit={(e) => RegisterUser(e,{nome,senha,email,endereco,CEP,imagem})}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                <input type="text" placeholder="CEP" value={CEP} onChange={(e) => setCEP(e.target.value)}/>
                <input type="text" placeholder="Imagem" value={imagem} onChange={(e) => setImagem(e.target.value)}/>
                <input type="submit" value="Registrar" />
            </form>
        </div>
    </div>

//     {
//     "nome": "Breno Gabriel",
//     "senha": "breno1234",
//     "email": "brenosacerdote@academico.ufs.br",
//     "endereco": "rua 163, numero 07",
//     "CEP": "49160-000",
//     "imagem":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwxHB3OlxYvP_KFwnmxs1F2yuCKr2gKx2Xmw&s"
// }
  )
}
