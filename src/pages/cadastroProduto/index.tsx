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
import { Box, Button, CircularProgress, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DomainIcon from '@mui/icons-material/Domain';
import InventoryIcon from '@mui/icons-material/Inventory';
import TextFieldsIcon from '@mui/icons-material/TextFields';

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

const REGEX_NUMBER_VALIDATION = /^[1-9]\d*(\.\d+)?$/;

export function CadastroProduto() {

    const navigate = useNavigate();
    const [file,setFile] = useState<File>()
    const [categoria,setCategoria] = useState<string>("");

    const [productRequestError,setProductInfoRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
    const [productInfoLoading,setProductInfoLoading] = useState<boolean>(false);
    const [productInfoError,setProductInfoError] = useState<boolean | undefined>(undefined);

    const [valorError,setValorError] = useState<boolean>(false)

    const [estoque,setEstoque] = useState<string>("");
    const [estoqueError,setEstoqueError] = useState<boolean>(false)

    const [proprietario,setProprietario] = useState<string>("")
    const [nome,setNome] = useState<string>("")
    const [valor,setValor] = useState<string>("")


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
            const usuario_id = JSON.parse(storedUser!).usuario_id;
            const token = sessionStorage.getItem("token")
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
                const preco = parseFloat(valor)
                const qtd_estoque = parseInt(estoque)
                const numero_vendas = 0
                AxiosInstance.post("/produtos",{nome,preco,proprietario,numero_vendas,categoria,qtd_estoque,imagem,usuario_id})
                .then(() => {
                    console.log("Produto cadastrado com sucesso!")
                    setProductInfoRequestError(prev => ({...prev,mensagem:"Produto cadastrado com sucesso!",sucesso:true}))
                    setProductInfoError(false)
                    counterTimePopup()
                    setProductInfoLoading(false)
                    navigate("/")

                })
                .catch((err) => {
                    console.log(err)
                    setProductInfoRequestError(prev => ({...prev,mensagem:"Houve um erro ao cadastrar o produto!",sucesso:false}))
                    setProductInfoError(true)
                    setProductInfoLoading(false)
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
            
            
            <Box sx={{display:"flex",flexDirection:"column", justifyItems:"center",alignItems:"center",gap:"20px",padding:5}}>
               <TextField
                    autoComplete="off" 
                    sx={{width:"80%"}}
                    error={novoProdutoErrors.nome ? true:  false}
                    helperText={novoProdutoErrors.nome? novoProdutoErrors.nome.message : ""}
                    size="small"
                    type="text"
                    placeholder="Nome" 
                    {...registerNovoProduto("nome")} 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    InputProps={
                        {endAdornment: 
                            <InputAdornment position="end">
                                <IconButton>
                                    <TextFieldsIcon/>
                                </IconButton>
                            </InputAdornment>,
                        }}/>

                <TextField
                    autoComplete="off" 
                    sx={{width:"80%"}}
                    error={valorError}
                    helperText={valorError ? "Valor inválido! Ex: 23.50" : ""}
                    size="small"
                    type="text"
                    placeholder="Preço" 
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)}
                    InputProps={
                        {endAdornment: 
                            <InputAdornment position="end">
                                <IconButton>
                                    <AttachMoneyIcon/>
                                </IconButton>
                            </InputAdornment>,
                        }}/>
                
                <TextField
                    autoComplete="off" 
                    sx={{width:"80%"}}
                    error={novoProdutoErrors.proprietario ? true:  false}
                    helperText={novoProdutoErrors.proprietario? novoProdutoErrors.proprietario.message : ""}
                    size="small"
                    type="text"
                    placeholder="Proprietário" 
                    {...registerNovoProduto("proprietario")} 
                    value={proprietario} 
                    onChange={(e) => setProprietario(e.target.value)} 
                    InputProps={
                        {endAdornment: 
                            <InputAdornment position="end">
                                <IconButton>
                                    <DomainIcon/>
                                </IconButton>
                            </InputAdornment>,
                        }}/>

                    <TextField
                        sx={{width:"80%"}}
                        size="small"
                        variant="outlined"
                        select
                        value={categoria}
                        label="Categorias"
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <MenuItem value="tecnologia">Tecnologia</MenuItem>
                        <MenuItem value="livros">Livros</MenuItem>
                        <MenuItem value="vestimentas">Vestimentas</MenuItem>
                        <MenuItem value="alimentacao">Alimentacao</MenuItem>
                        <MenuItem value="cama_mesa_banho">Cama, Mesa e banho</MenuItem>
                        <MenuItem value="eletrodomesticos">Eletrodomesticos</MenuItem>
                    </TextField>

               <TextField
                    autoComplete="off" 
                    sx={{width:"80%"}}
                    error={estoqueError}
                    helperText={estoqueError ? "Valor inválido! Ex: 20" : ""}
                    size="small"
                    placeholder="Estoque" 
                    value={estoque} 
                    onChange={(e) => setEstoque(e.target.value)} 
                    InputProps={{endAdornment: 
                        <InputAdornment position="end">
                            <IconButton>
                                <InventoryIcon/>
                            </IconButton>
                        </InputAdornment>,
                }}/>

                {!productInfoLoading && <Button type="submit" variant="contained" sx={{backgroundColor:"green","&:hover":{backgroundColor:"green"}}} onClick={handleSubmitNovoProduto(handleNovoProduto)}>Cadastrar</Button>}
                {productInfoLoading && <CircularProgress size={25} sx={{alignSelf:"center"}}/>}
        </Box>

        </div>
                {((productInfoError === true) || (productInfoError === false)) && <Popup mensagem={productRequestError.mensagem} sucesso={productRequestError.sucesso}/>}   
    </div>
  )
}
