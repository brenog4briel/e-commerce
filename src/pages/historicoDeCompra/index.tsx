import { useEffect, useState } from "react"
import styles from "./historico_de_compra.module.css"
import AxiosInstance from "../../axiosInstance"
import { IProduto } from "../detalhesProduto"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import transtorno from "../../assets/desculpe_o_transtorno.jpg"
import { useNavigate, useParams } from "react-router-dom"

interface IHistoricoDeCompra {
    total_de_aquisicoes: number; 
    preco_total_gasto: number;
    produtos: IProduto[];
}

export function Historico_de_compra() {

  const [historicoDeCompra,setHistoricoDeCompra] = useState<IHistoricoDeCompra>()
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const {usuario_id} = useParams()
  
  async function getData() {
    setLoading(true)
      AxiosInstance.get(`/historico_de_compras/historico/${usuario_id}`)
    .then((res) => {
      setHistoricoDeCompra(res.data);
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

  return (
    <div className={styles.container}>
        <Typography component="h1" sx={{fontSize:50, fontFamily:"Inknut Antiqua,serif", fontWeight:"500"}}>Alimentação</Typography>
          {loading ? 
          <Box sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
            <CircularProgress/> 
          </Box>
          : 
          <>
            {(historicoDeCompra!.produtos.length > 0) ? 
            <div className={styles.grid_container}>
              {historicoDeCompra!.produtos.map((element) => (
                <div key={element.produto_id} className={styles.grid_element} onClick={() => navigate(`/produto/${element.produto_id}`)}>
                  <img src={element.imagem} alt="" />
                  <div className={styles.product_info}>
                    <p>Nome: {element.nome}</p>
                    <p>Preço: {element.preco}</p>
                    <p>Estoque: {element.qtd_estoque}</p>
                  </div>
                </div>
              ))}
            </div>
            : 
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',textAlign:"center",marginBottom:10, gap:5}}>
              <Typography component="h2" sx={{fontSize:25}}>
                Infelizmente não há produtos desta categoria no estoque. Desculpe o transtorno!
              </Typography>
              <Avatar src={transtorno} sx={{objectFit:"fill",width:"25%",height:"20%"}}/>
            </Box>
            }
          </>
          }
          
      </div>  
      )
}
