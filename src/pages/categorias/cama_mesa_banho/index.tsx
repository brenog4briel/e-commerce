import { useEffect, useState } from "react"
import styles from "./cama_mesa_banho.module.css"
import AxiosInstance from "../../../axiosInstance"
import { IProduto } from "../../detalhesProduto"

export function Cama_Mesa_Banho() {

  const [produtos,setProdutos] = useState<Array<IProduto>>()

  async function getData() {
    AxiosInstance.get("/produtos/categorias/cama_mesa_banho")
    .then((res) => {
      console.log(res)
      setProdutos(res.data);
    })
    .catch((err) => {
      console.log(err)
    })
  }

   useEffect(() => {
    getData()
  },[])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cama, mesa e banho</h1>
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
    </div>
  )
}
