import styles from "./cadastroProduto.module.css"
import user_default from "../../assets/default_user.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { novoProdutoSchema, NovoProdutoSchema } from "../../validations/novoProduto"
import AxiosInstance from "../../axiosInstance"
import { useState } from "react"

export function CadastroProduto() {

    const [file,setFile] = useState<File>()
    const {register:registerNovoProduto,handleSubmit:handleSubmitNovoProduto,formState:{errors:novoProdutoErrors}} = useForm<NovoProdutoSchema>({
        resolver:zodResolver(novoProdutoSchema)
    })
    
      function onChangeImage(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const {files} = e.target;
        const selectedFile = files as FileList;
        setFile(selectedFile?.[0]);
    }

    // async function handleSubmitImage() {
    //     const storedUser = sessionStorage.getItem("@App:usuario");
    //     const usuario_id = JSON.parse(storedUser!).usuario_id;
    //     AxiosInstance.post(`/upload/${usuario_id}`,{file},{headers:{"Content-Type":"multipart/form-data"}})
    //     .then(() => {
    //         console.log("Upload de imagem realizado com sucesso")
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    async function handleNovoProduto ({nome,preco,proprietario,categoria,qtd_estoque}:NovoProdutoSchema) {
        const storedUser = sessionStorage.getItem("@App:usuario");
        const usuario_id = JSON.parse(storedUser!).usuario_id;
        AxiosInstance.post("/produto",{nome,preco,proprietario,categoria,qtd_estoque,imagem:file,usuario_id})
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <div className={styles.container}>
        <div className={styles.form_wrapper}>
            <div className={styles.product_image}>
                <img src={user_default} alt=""/>
                <form action="" encType="multipart/form-data" method="post">
                    <input type="file" name="file" onChange={(e) => onChangeImage(e)} />
                </form>
            </div>
            
            <div className={styles.product_info}>
                <form action="" method="post" className={styles.info_form} onSubmit={handleSubmitNovoProduto(handleNovoProduto)}>
                    <input type="text" placeholder="Nome" {...registerNovoProduto("nome")}/>
                    {novoProdutoErrors.nome && <p className={styles.input_error_message}>{novoProdutoErrors.nome.message}</p>}
                    <input type="text" placeholder="Preço"{...registerNovoProduto("preco")}/>
                    {novoProdutoErrors.preco && <p className={styles.input_error_message}>{novoProdutoErrors.preco.message}</p>}
                    <input type="text" placeholder="Proprietário" {...registerNovoProduto("proprietario")}/>
                    {novoProdutoErrors.proprietario && <p className={styles.input_error_message}>{novoProdutoErrors.proprietario.message}</p>}
                    <input type="text" placeholder="Categoria" {...registerNovoProduto("categoria")}/>
                    {novoProdutoErrors.categoria && <p className={styles.input_error_message}>{novoProdutoErrors.categoria.message}</p>}
                    <input type="text" placeholder="Estoque" {...registerNovoProduto("qtd_estoque")}/>
                    {novoProdutoErrors.qtd_estoque && <p className={styles.input_error_message}>{novoProdutoErrors.qtd_estoque.message}</p>}
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
  )
}
