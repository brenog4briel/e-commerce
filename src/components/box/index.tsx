import { useNavigate } from "react-router-dom"
import styles from "./box.module.css"

export const Box : React.FC<{titulo:string,imagem:string,altura:string,largura:string,produto_id:string}> = ({titulo,imagem,altura,largura,produto_id}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.container} style={{width:largura, height:altura}} onClick={() => navigate(`/produto/${produto_id}`)}>
        <h3>{titulo}</h3>
        <img src={imagem}/>
    </div>
  )
}
