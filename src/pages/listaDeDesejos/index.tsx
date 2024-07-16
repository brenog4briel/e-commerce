import { useEffect, useState } from "react"
import styles from "./lista_de_desejos.module.css"
import AxiosInstance from "../../axiosInstance"
import { IProduto } from "../detalhesProduto"
import { Avatar, Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material"
import infelizmente from "../../assets/infelizmente.jpg"
import { useNavigate, useParams } from "react-router-dom"
import ShopIcon from '@mui/icons-material/Shop';
import DeleteIcon from '@mui/icons-material/Delete';
import { IRequestError } from "../loginAndRegister"
import { Popup } from "../../components/popup"
import { useAuth } from "../../contexts/AuthContext"


interface IListaDeDesejos {
  lista_de_desejos_id:string;
  preco_acumulado: number;
  total_de_produtos: number;
  produtos: IProduto[];
}
export function Lista_de_desejos() {

  const [listaDeDesejos,setListaDeDesejos] = useState<IListaDeDesejos>()
  const [loading,setLoading] = useState<boolean>(false)
  const [erroRequest,setErroRequest] = useState<IRequestError>({mensagem:"",sucesso:false})
  const [listaDeDesejosErro,setListaDeDesejosErro] = useState<boolean | undefined>(undefined)
  const [pedidoDeCompraErro,setPedidoDeCompraErro] = useState<boolean | undefined>(undefined)


  const navigate = useNavigate()
  const {usuario_id} = useParams()
  const {usuario} = useAuth()
  

  
  async function getData() {
    setLoading(true)
    AxiosInstance.get(`/lista_de_desejos/lista/${usuario_id}`)
    .then((res) => {
      setListaDeDesejos(res.data);
      console.log(res.data)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  function counterTimePopup() {
        setTimeout(() => {
        setPedidoDeCompraErro(undefined);
        setListaDeDesejosErro(undefined)
      },2000)
    }


   useEffect(() => {
    getData()
  },[])

  async function handleDeleteItemListaDeDesejos(produto:IProduto) {
    setLoading(true)
    AxiosInstance.put("/lista_de_desejos/remove-produto",{lista_de_desejos_id: listaDeDesejos?.lista_de_desejos_id ,produto:produto})
          .then((res) => {
              console.log(res)
              setErroRequest(prev => ({...prev,mensagem:"O produto foi removido da lista de desejos com sucesso!",sucesso:true}))
              setListaDeDesejosErro(false)
              setLoading(false)
              counterTimePopup()
              navigate(0)

          })
          .catch((err) => {
              console.log(err)
              setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao remover o produto a sua lista de desejos!",sucesso:false}))
              setListaDeDesejosErro(true)
              setLoading(false)
              counterTimePopup()
              navigate(0)
          })
  }

  async function handlePedidoDeCompra(produto:IProduto) {
    setLoading(true)

    const result = await AxiosInstance.get(`/pedido_de_compra/pedido/${usuario?.usuario_id}`)

    if (!result.data) {

        AxiosInstance.post("/pedido_de_compra",{
            usuario:usuario
        })
        .then((res) => {
            AxiosInstance.put("/pedido_de_compra/adiciona-produto",{pedido_de_compra_id:res.data.pedido_de_compra_id,produto:produto})
                .then((res) => {
                    console.log(res)
                    setErroRequest(prev => ({...prev,mensagem:"O produto foi adicionado com sucesso ao seu pedido de compras!",sucesso:true}))
                    setPedidoDeCompraErro(false)
                    setLoading(false)
                    counterTimePopup()
                })
                .catch((err) => {
                    console.log(err)
                    setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao adicionar o produto ao seu pedido de compras!",sucesso:false}))
                    setPedidoDeCompraErro(true)
                    setLoading(false)
                    counterTimePopup()
                })
                })
        .catch((err) => {
            console.log(err)
            return err
        })  
    }

    else {
        AxiosInstance.put("/pedido_de_compra/adiciona-produto",{pedido_de_compra_id:result.data.pedido_de_compra_id,produto:produto})
                .then((res) => {
                    console.log(res)
                    setErroRequest(prev => ({...prev,mensagem:"O produto foi adicionado com sucesso ao seu pedido de compras!",sucesso:true}))
                    setPedidoDeCompraErro(false)
                    setLoading(false)
                    counterTimePopup()
                })
                .catch((err) => {
                    console.log(err)
                    setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao adicionar o produto ao seu pedido de compras!",sucesso:false}))
                    setPedidoDeCompraErro(true)
                    setLoading(false)
                    counterTimePopup()
                })
    }
    }

  const handleClearList = async() => {
    setLoading(true)
    AxiosInstance.put("/lista_de_desejos/remove-all",{lista_de_desejos_id: listaDeDesejos?.lista_de_desejos_id})
          .then((res) => {
              console.log(res)
              setErroRequest(prev => ({...prev,mensagem:"A lista foi esvaziada com sucesso!",sucesso:true}))
              setListaDeDesejosErro(false)
              setLoading(false)
              navigate(0)

          })
          .catch((err) => {
              console.log(err)
              setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao esvaziar a lista de desejos!",sucesso:false}))
              setListaDeDesejosErro(true)
              setLoading(false)
              navigate(0)
              
          })

  }

  return (
    <div className={styles.container}>
        <Typography component="h1" sx={{fontSize:50, fontFamily:"Inknut Antiqua,serif", fontWeight:"500"}}>Lista de desejos</Typography>
          {loading ? 
          <Box sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
            <CircularProgress/> 
          </Box>
          : 
          <>
          {listaDeDesejos?.total_de_produtos ? 
          <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center", minHeight:"600px",width:"90%", backgroundColor:"#eeeeee"}}>
            <p>{listaDeDesejos?.total_de_produtos}</p>
            <div className={styles.grid_container}>
              {listaDeDesejos!.produtos.map((element) => (
                <div key={element.produto_id} className={styles.grid_element}>
                  <img src={element.imagem} alt=""  onClick={() => navigate(`/produto/${element.produto_id}`)}/>
                  <div className={styles.product_info}>
                    <p>Nome: {element.nome}</p>
                    <p>Preço: {element.preco}</p>
                    <p>Estoque: {element.qtd_estoque}</p>
                    <Stack display="flex" justifyContent="space-evenly" direction="row" width="100%">
                      <IconButton onClick={() => handlePedidoDeCompra(element)}>
                        <ShopIcon/>
                      </IconButton>
                      <IconButton onClick={() => handleDeleteItemListaDeDesejos(element)}>
                        <DeleteIcon/>
                      </IconButton>
                    </Stack>
                  </div>
                </div>
              ))}
            </div> 
            <Stack direction="row" width="100%" display="flex" justifyContent="flex-end" alignItems="center" paddingRight={5}>
              <Button variant="contained" sx={{backgroundColor:"red","&:hover":{backgroundColor:"red"}}} onClick={handleClearList}>Limpar lista de desejos</Button>
            </Stack>
          </Box> :
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',textAlign:"center",marginBottom:10, gap:5}}>
              <Typography component="h2" sx={{fontSize:25}}>
                Infelizmente você ainda não se interessou por nenhum dos nossos produtos
              </Typography>
              <Avatar src={infelizmente} sx={{objectFit:"fill",width:"25%",height:"20%"}}/>
            </Box>
            }
          </>
          }
        {((listaDeDesejosErro === true) || (listaDeDesejosErro === false)) && <Popup mensagem={erroRequest.mensagem} sucesso={erroRequest.sucesso}/>}
        {((pedidoDeCompraErro === true) || (pedidoDeCompraErro === false)) && <Popup mensagem={erroRequest.mensagem} sucesso={erroRequest.sucesso}/>}


      </div>  
      )
}
