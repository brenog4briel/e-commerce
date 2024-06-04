import { useState } from "react";
import styles from "./register.module.css"
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../axiosInstance";
import {z} from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

export function Register() {


  const [,setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const registroSchema = z.object({
    nome: z
        .string({required_error:"O nome é obrigatório"})
        .trim()
        .min(3,{message:"Nome inválido"})
        .max(255,{message:"O nome não pode possuir mais de 255 caracteres"}),
    senha: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
        .min(6,{message:"A senha precisa ser mais robusta"})
        .max(255,{message:"A senha não pode possuir mais de 255 caracteres"}),
    email: z
        .string({required_error:"O email é obrigatório"})
        .trim()
        .min(10,{message:"O email precisa ter no mínimo 10 caracteres"})
        .max(255,{message:"O email não pode possuir mais de 255 caracteres"}),
    endereco: z
        .string({required_error:"O endereco é obrigatória"})
        .trim()
        .min(10,{message:"Endereço inválido"})
        .max(50,{message:"O endereco não pode possuir mais de 50 caracteres"}),
    CEP: z
        .string({required_error:"O CEP é obrigatório"})
        .trim()
        .min(14,{message:"CEP inválido"}),
    imagem: z
        .string({required_error:"A senha é obrigatória"})
        .trim()
})

  type RegistroSchema = z.infer<typeof registroSchema>;

  const {register,handleSubmit} = useForm<RegistroSchema>({
    resolver: zodResolver(registroSchema)
  });

  async function RegisterUser({nome,senha,email,endereco,CEP,imagem} : RegistroSchema) {
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
    
  return (
    <div className={styles.container}>
        <div className={styles.login}>
            <div className={styles.container_title}>
              <p className={styles.title}>Cadastro</p>
            </div>
            <form className={styles.form} action="" onSubmit={handleSubmit(RegisterUser)}>
                <input type="text" placeholder="Nome" {...register("nome")}/>
                <input type="password" placeholder="Senha" {...register("senha")}/>
                <input type="email" placeholder="Email" {...register("email")}/>
                <input type="text" placeholder="Endereço" {...register("endereco")}/>
                <input type="text" placeholder="CEP" {...register("CEP")}/>
                <input type="text" placeholder="Imagem" {...register("imagem")}/>
                <input type="submit" value="Registrar" />
            </form>
        </div>
    </div>
  )
}
