import { useParams } from "react-router-dom"
import styles from "./detalhesProduto.module.css"
import { useEffect, useState } from "react";
import AxiosInstance from "../../axiosInstance";

interface IProduto {
    nome: string;
    categoria: string;
    imagem: string;
    preco: string;
    proprietario: string;
    qtd_estoque: string;
}

export function DetalhesProduto() {
    const {produto_id} = useParams();
    const [produto,setProduto] = useState<IProduto>();
    async function getProductData() {
        AxiosInstance.get(`/produtos/produto/${produto_id}`)
        .then((res) => {
            console.log(res)
            setProduto(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProductData()
    },[])

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <img src={produto?.imagem} alt="" />
            <div className={styles.product_info}>
                <p>Nome: {produto?.nome}</p>
                <p>Categoria: {produto?.categoria}</p>
                <p>Preço: {produto?.preco}</p>
                <p>Proprietário: {produto?.proprietario}</p>
                <p>Estoque: {produto?.qtd_estoque}</p>
            </div>
        </div>
    </div>
  )
}
