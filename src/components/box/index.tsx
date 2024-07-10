import { useNavigate } from "react-router-dom"
import styles from "./box.module.css"
import { Divider, Typography } from "@mui/material"

export const Box : React.FC<{titulo:string,imagem:string,altura:string,largura:string,produto_id:string}> = ({titulo,imagem,altura,largura,produto_id}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.container} style={{width:largura, height:altura}} onClick={() => navigate(`/produto/${produto_id}`)}>
        <Typography component="h3" sx={{fontWeight:600, cursor:"pointer"}}>{titulo}</Typography>
        <Divider style={{width:'100%'}} />
        <img src={imagem}/>
    </div>
  )
}
