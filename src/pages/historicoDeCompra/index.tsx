import { useEffect, useState } from "react"
import styles from "./historico_de_compra.module.css"
import AxiosInstance from "../../axiosInstance"
import { IProduto } from "../detalhesProduto"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import infelizmente from "../../assets/infelizmente.jpg"
import { useNavigate } from "react-router-dom"

interface IHistoricoDeCompra {
    total_de_aquisicoes: number; 
    preco_total_gasto: number;
    produtos: IProduto[];
}

export function Historico_de_compra() {

  const [historicoDeCompra,setHistoricoDeCompra] = useState<IHistoricoDeCompra>()
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const storedUser = JSON.parse(sessionStorage.getItem("usuario")!)
  
  async function getData() {
    setLoading(true)
      AxiosInstance.get(`/historico_de_compras/historico/${storedUser.usuario_id}`)
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
        <h1 className={styles.title}>Histórico de compra</h1>
          {loading ? 
          <Box sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
            <CircularProgress/> 
          </Box>
          : 
          <>
          {historicoDeCompra ? 
          <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center", minHeight:"600px",width:"90%", backgroundColor:"#eeeeee"}}>
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
          
      </div>  
      )
}
