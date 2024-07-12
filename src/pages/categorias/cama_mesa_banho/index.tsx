import { useEffect, useState } from "react"
import styles from "./cama_mesa_banho.module.css"
import AxiosInstance from "../../../axiosInstance"
import { IProduto } from "../../detalhesProduto"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import transtorno from "../../../assets/desculpe_o_transtorno.jpg"

export function Cama_Mesa_Banho() {

  const [produtos,setProdutos] = useState<Array<IProduto>>([])
  const [loading,setLoading] = useState<boolean>(false)

  async function getData() {
    setLoading(true)
    AxiosInstance.get("/produtos/categorias/cama_mesa_banho")
    .then((res) => {
      setProdutos(res.data);
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
       <Typography component="h1" sx={{fontSize:50}}>Cama, mesa e banho</Typography>
          {loading ? 
          <Box sx={{display:"flex",alignItems:"center",justifyContent:'center'}}>
            <CircularProgress/> 
          </Box>
          : 
          <>
            {(produtos.length > 0) ? 
            <div className={styles.grid_container}>
              {produtos?.map((element) => (
                <div className={styles.grid_element}>
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
