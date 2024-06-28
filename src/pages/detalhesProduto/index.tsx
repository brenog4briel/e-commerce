import { useNavigate, useParams } from "react-router-dom"
import styles from "./detalhesProduto.module.css"
import { useEffect, useState } from "react";
import AxiosInstance from "../../axiosInstance";
import { useAuth } from "../../contexts/AuthContext";

export interface IProduto {
    nome: string;
    categoria: string;
    imagem: string;
    preco: string;
    proprietario: string;
    qtd_estoque: string;
}

export function DetalhesProduto() {
    const {autenticado} = useAuth();
    const {produto_id} = useParams();
    const [produto,setProduto] = useState<IProduto>();
    const navigate = useNavigate()

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
                <p>Categoria: <span onClick={() => navigate(`/categorias/${produto?.categoria}`)}>{produto?.categoria}</span></p>
                <p>Preço: R$ {produto?.preco}</p>
                <p>Proprietário: <span onClick={() => navigate(`/categorias/${produto?.proprietario}`)}>{produto?.proprietario}</span></p>
                <p>Estoque: {produto?.qtd_estoque} unidades</p>
                <div className={styles.buttons}>
                <a href={autenticado ? "#" : "#"}>Adicionar a lista de desejos</a>
                <a href={autenticado ? "#" : "#"}>Comprar</a>
                </div>
            </div>
        </div>
    </div>
  )
}
