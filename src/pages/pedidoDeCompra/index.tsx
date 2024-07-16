import { useEffect, useState } from "react"
import styles from "./pedido_de_compra.module.css"
import AxiosInstance from "../../axiosInstance"
import { IProduto } from "../detalhesProduto"
import { Avatar, Box, Button, CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Stack, Typography } from "@mui/material"
import infelizmente from "../../assets/infelizmente.jpg"
import { useNavigate, useParams } from "react-router-dom"
import InfoIcon from '@mui/icons-material/Info';
import { Popup } from "../../components/popup"
import { IRequestError } from "../loginAndRegister"

interface IPedidoDeCompra {
    pedido_de_compra_id:string;
    data: string;
    total_a_pagar: number;
    endereco: string;
    CEP: string;
    desconto: number | null;
    produtos: IProduto[];
}

export function Pedido_de_compra() {

  const [pedidoDeCompra,setPedidoDeCompra] = useState<IPedidoDeCompra>()
  const [loading,setLoading] = useState<boolean>(false)

  const [pedidoDeCompraErro,setPedidoDeCompraErro] = useState<boolean | null>(null)
  const [erroRequest,setErroRequest] = useState<IRequestError>({mensagem:"",sucesso:false})

  const navigate = useNavigate()
  const {usuario_id} = useParams()
  
  async function getData() {
    setLoading(true)
    AxiosInstance.get(`/pedido_de_compra/pedido/${usuario_id}`)
    .then((res) => {
      setPedidoDeCompra(res.data);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

   useEffect(() => {
    getData()
  },[])


  async function handleHistoricoDeCompra() {
        
        const result = await AxiosInstance.get(`/historico_de_compras/historico/${usuario_id}`)

        if (!result.data) {
            AxiosInstance.post("/historico_de_compras",{usuario_id})
            .then((res) => {
                AxiosInstance.put("/historico_de_compras/adiciona-produto",{historico_de_compras_id:res.data.historico_de_compras_id,produto:pedidoDeCompra?.produtos})
                    .then((res) => {
                        console.log(res)
                        handleClearPedido()
                        setErroRequest(prev => ({...prev,mensagem:"Compra realizada com sucesso!",sucesso:true}))
                        setPedidoDeCompraErro(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao realizar a compra!",sucesso:false}))
                        setPedidoDeCompraErro(true)
                    })
                    })
            .catch((err) => {
                console.log(err)
                return err
            })  
        }

        else {

            AxiosInstance.put("/historico_de_compras/adiciona-produto",{historico_de_compras_id:result.data.historico_de_compras_id,produto:pedidoDeCompra?.produtos})
                .then((res) => {
                    console.log(res)
                    handleClearPedido()
                    setErroRequest(prev => ({...prev,mensagem:"Compra realizada com sucesso!",sucesso:true}))
                    setPedidoDeCompraErro(false)
                })
                .catch((err) => {
                    console.log(err)
                    setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao realizar a compra!",sucesso:false}))
                    setPedidoDeCompraErro(true)
                })
        }
    }


    const handleClearPedido = async() => {
      setLoading(true)
      AxiosInstance.delete(`/pedido_de_compra/remove-all/${pedidoDeCompra?.pedido_de_compra_id}`)
            .then((res) => {
                console.log(res)
                setErroRequest(prev => ({...prev,mensagem:"A lista foi descartada com sucesso!",sucesso:true}))
                setPedidoDeCompraErro(false)
                setLoading(false)
                navigate("/")

            })
            .catch((err) => {
                console.log(err)
                setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao descartar a lista de desejos!",sucesso:false}))
                setPedidoDeCompraErro(true)
                setLoading(false)
                navigate("/")
            })
  }

  return (
    <div className={styles.container}>
        <Typography component="h1" sx={{fontSize:50, fontFamily:"Inknut Antiqua,serif", fontWeight:"500"}}>Pedidos de compra</Typography>
          {loading ? 
          <Box sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
            <CircularProgress/> 
          </Box>
          : 
          <>
          {pedidoDeCompra ? 
          <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center", minHeight:"600px",width:"90%", backgroundColor:"#eeeeee"}}>
            <Stack direction="row" display="flex" justifyContent="space-around" width="100%" margin={2}>
              <Typography component="p" fontWeight="500">Identificação do pedido de compra: {pedidoDeCompra?.pedido_de_compra_id}</Typography>
              <Typography component="p" fontWeight="500">Data do pedido: {pedidoDeCompra?.data}</Typography>
            </Stack>
            <Stack direction="row" display="flex" justifyContent="space-around" width="100%" margin={2}>
              <Typography component="p" fontWeight="500">Endereço destinado: {pedidoDeCompra?.endereco}</Typography>
              <Typography component="p" fontWeight="500">CEP: {pedidoDeCompra?.CEP}</Typography>
            </Stack>
          
            <ImageList sx={{ display:"flex",flexDirection:"column", width: "50%",margin:2}}>
              <ImageListItem key="Subheader" cols={1}>
                <ListSubheader component="div" sx={{fontWeight:800,fontSize:"20px",textAlign:"center"}}>Itens</ListSubheader>
              </ImageListItem>
              {pedidoDeCompra!.produtos.map((item) => (
                <ImageListItem key={item.imagem} sx={{cursor:"pointer"}}>
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    loading="lazy"
                    style={{objectFit:"fill"}}
                  />
                  <ImageListItemBar
                    title={item.nome}
                    subtitle={item.proprietario}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.nome}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
            ))}
          </ImageList>

           <Stack direction="row" display="flex" flexDirection="column" justifyContent="flex-start" width="100%" margin={2} paddingLeft={5}>
              <Typography component="p" fontWeight="500">Valor total dos produtos: R$ {pedidoDeCompra?.total_a_pagar}</Typography>
              <Typography component="p" fontWeight="500">Desconto: R$ {pedidoDeCompra?.desconto}</Typography>
              <Typography component="p" fontWeight="500">Valor total a ser pago: R$ {pedidoDeCompra?.total_a_pagar - (pedidoDeCompra?.desconto || 0)}</Typography>
            </Stack>

            <Stack direction="row" display="flex" justifyContent="space-around" width="100%" margin={2}>
              <Button variant="contained" sx={{backgroundColor:"green","&:hover":{backgroundColor:"green"}}} onClick={handleHistoricoDeCompra}>Finalizar compra</Button>
              <Button variant="contained" sx={{backgroundColor:"red","&:hover":{backgroundColor:"red"}}} onClick={handleClearPedido}>Limpar pedido de compras</Button>
            </Stack>
    
          </Box> :
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',textAlign:"center",marginBottom:10, gap:5}}>
              <Typography component="h2" sx={{fontSize:25}}>
                Infelizmente você ainda não realizou nenhuma compra
              </Typography>
              <Avatar src={infelizmente} sx={{objectFit:"fill",width:"25%",height:"20%"}}/>
            </Box>
            }
          </>
          }
          {((pedidoDeCompraErro === true) || (pedidoDeCompraErro === false)) && <Popup mensagem={erroRequest.mensagem} sucesso={erroRequest.sucesso}/>}
      </div>  
  )
}
