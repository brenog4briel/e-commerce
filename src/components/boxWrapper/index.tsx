import { IData } from "../../pages/home"
import { Box } from "../box"
import styles from "./boxWrapper.module.css"

export const BoxWrapper : React.FC<{data:Array<IData>}> = ({data}) => {
  const newData = data.slice(1,5);
  return (
    <div className={styles.container}>
        {newData.map((element) => (
            <Box key={element.produto_id} titulo={element.nome} imagem={element.imagem} altura="400px" largura="24%" produto_id={element.produto_id}/>
        ))
        }
      </div>
  )
}
