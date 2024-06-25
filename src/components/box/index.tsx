import styles from "./box.module.css"

export const Box : React.FC<{titulo:string,imagem:string,altura:string,largura:string}> = ({titulo,imagem,altura,largura}) => {
  return (
    <div className={styles.container} style={{width:largura, height:altura}} >
        <h3>{titulo}</h3>
        <img src={imagem}/>
    </div>
  )
}
