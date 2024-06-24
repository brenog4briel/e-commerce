import styles from "./cadastroProduto.module.css"
import user_default from "../../assets/default_user.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { novoProdutoSchema, NovoProdutoSchema } from "../../validations/novoProduto"
import AxiosInstance from "../../axiosInstance"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Popup } from "../../components/popup"
import { CircularProgress } from "@mui/material"

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

const REGEX_NUMBER_VALIDATION = /^[1-9]\d*(\.\d+)?$/;

export function CadastroProduto() {

    const navigate = useNavigate();
    const [file,setFile] = useState<File>()
    const [categoria,setCategoria] = useState<string>("tecnologia");

    const [productRequestError,setProductInfoRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
    const [productInfoLoading,setProductInfoLoading] = useState<boolean>(false);
    const [productInfoError,setProductInfoError] = useState<boolean | undefined>(undefined);

    const [valor,setValor] = useState<string>("");
    const [valorError,setValorError] = useState<boolean>(false)

    const [estoque,setEstoque] = useState<string>("");
    const [estoqueError,setEstoqueError] = useState<boolean>(false)

    const {register:registerNovoProduto,handleSubmit:handleSubmitNovoProduto,formState:{errors:novoProdutoErrors}} = useForm<NovoProdutoSchema>({
        resolver:zodResolver(novoProdutoSchema)
    })

    function counterTimePopup() {
        setTimeout(() => {
            setProductInfoError(undefined)
        },3000)
  }
    
      function onChangeImage(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const {files} = e.target;
        const selectedFile = files as FileList;
        setFile(selectedFile?.[0]);
    }

    async function handleNovoProduto ({nome,proprietario}:NovoProdutoSchema) {
        const numerosValidos = validateInputs()
        
        if (numerosValidos && file) {
            setProductInfoLoading(true)
            const storedUser = sessionStorage.getItem("usuario");
            const token = sessionStorage.getItem("token");
            const usuario_id = JSON.parse(storedUser!).usuario_id;
            const data = new FormData();

            const reader = new FileReader()
            reader.readAsDataURL(file!);
            reader.onloadend = () => {
            const base64 = reader.result
            const base64String = base64!.toString()
                .replace('data:', '')
                .replace(/^.+,/, '');

            data.append( "image", base64String );
            axios({
                method:"post",
                url:"https://api.imgbb.com/1/upload?key=39ac12420e84248cd5a88e3ed7bcc598",
                withCredentials:false,
                data:data
            })

            .then((res) => {
                const imagem : string = res.data.data.url;
                const preco = Number(valor)
                const qtd_estoque = Number(estoque)
                AxiosInstance.post("/produtos",{nome,preco,proprietario,categoria,qtd_estoque,imagem,usuario_id},{
                    headers:{"Authorization":`Bearer ${token}`}
                })
                .then(() => {
                    console.log("Produto cadastrado com sucesso!")
                    setProductInfoRequestError(prev => ({...prev,mensagem:"Produto cadastrado com sucesso!",sucesso:true}))
                    setProductInfoError(false)
                    counterTimePopup()
                    navigate("/")

                })
                .catch((err) => {
                    console.log(err)
                    setProductInfoRequestError(prev => ({...prev,mensagem:"Houve um erro ao cadastrar o produto!",sucesso:false}))
                    setProductInfoError(true)
                    counterTimePopup()
                })
            })
            .catch((err) => console.log(err))
            };
        }
    }

    function validateInputs() {

        const precoValido = REGEX_NUMBER_VALIDATION.test(valor)
        const quantidadeValida = REGEX_NUMBER_VALIDATION.test(estoque)

        precoValido ? setValorError(false) : setValorError(true)
        quantidadeValida ? setEstoqueError(false) : setEstoqueError(true)

        return (precoValido && quantidadeValida)

    }

  return (
    <div className={styles.container}>
        <div className={styles.form_wrapper}>
            <div className={styles.product_image}>
                <img src={user_default} alt=""/>
                    <input type="file" name="image" onChange={(e) => onChangeImage(e)} />
            </div>
            
            <div className={styles.product_info}>
                <form className={styles.info_form} onSubmit={handleSubmitNovoProduto(handleNovoProduto)}>
                    <input type="text" placeholder="Nome" {...registerNovoProduto("nome")}/>
                    {novoProdutoErrors.nome && <p className={styles.input_error_message}>{novoProdutoErrors.nome.message}</p>}
                    <input type="text" placeholder="Preço" value={valor} onChange={(e) => setValor(e.target.value)}/>
                    {valorError && <p className={styles.input_error_message}>Valor inválido! Ex: 23.50</p>}
                    <input type="text" placeholder="Proprietário" {...registerNovoProduto("proprietario")}/>
                    {novoProdutoErrors.proprietario && <p className={styles.input_error_message}>{novoProdutoErrors.proprietario.message}</p>}
                    <select name="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="livros">Livros</option>
                        <option value="vestimentas">Vestimentas</option>
                        <option value="alimentacao">Alimentação</option>
                        <option value="cama_mesa_banho">Cama, mesa e banho</option>
                        <option value="eletrodomesticos">Eletrodomésticos</option>
                    </select>
                    <input type="text" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)}/>
                    {estoqueError && <p className={styles.input_error_message}>Valor inválido! Ex: 20</p>}
                    {!productInfoLoading && <button type="submit">Cadastrar</button>}
                    {productInfoLoading && <CircularProgress size={25} sx={{alignSelf:"center"}}/>}

                </form>
            </div>
        </div>
                {((productInfoError === true) || (productInfoError === false)) && <Popup mensagem={productRequestError.mensagem} sucesso={productRequestError.sucesso}/>}   
    </div>
  )
}
