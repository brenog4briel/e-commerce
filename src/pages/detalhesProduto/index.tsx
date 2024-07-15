import { useNavigate, useParams } from "react-router-dom"
import styles from "./detalhesProduto.module.css"
import { useEffect, useState } from "react";
import AxiosInstance from "../../axiosInstance";
import { useAuth } from "../../contexts/AuthContext";

export interface IProduto {
    nome: string;
    preco: string;
    categoria: string;
    imagem: string;
    proprietario: string;
    qtd_estoque: string;
    numero_vendas:string;
    usuario_id:string;
    produto_id?:string;
}

export function DetalhesProduto() {
    const {autenticado} = useAuth();
    const {produto_id} = useParams();
    const [produto,setProduto] = useState<IProduto>();
    const {usuario} = useAuth()

    const navigate = useNavigate()

    async function getProductData() {
        AxiosInstance.get(`/produtos/produto/${produto_id}`)
        .then((res) => {
            setProduto(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProductData()
    },[])

    function handleListaDeDesejos() {
        const produtoData = {
            nome: produto?.nome,
            preco: produto?.preco,
            proprietario: produto?.proprietario,
            categoria:produto?.categoria,
            qtd_estoque: produto?.qtd_estoque,
            numero_vendas: produto?.numero_vendas,
            imagem:produto?.imagem,
            usuario_id:produto?.usuario_id
        }
        AxiosInstance.get(`/lista_de_desejos/lista/${usuario?.usuario_id}`)
        .then((res) => {
            AxiosInstance.put("/lista_de_desejos/adiciona-produto",{lista_de_desejos_id:res.data.lista_de_desejos_id,produto:produtoData})
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    async function handlePedidoDeCompra() {
        
        const result = await AxiosInstance.get(`/pedido_de_compra/pedido/${usuario?.usuario_id}`)

        if (!result.data) {
            AxiosInstance.post("/pedido_de_compra",{
                usuario:usuario
            })
            .then((res) => {
                AxiosInstance.put("/pedido_de_compra/adiciona-produto",{pedido_de_compra_id:res.data.pedido_de_compra_id,produto:produto})
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    })
            .catch((err) => {
                console.log(err)
                return err
            })
}
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <img src={produto?.imagem} alt="" />
            <div className={styles.product_info}>
                <p>Nome: {produto?.nome}</p>
                <p>Categoria: <span onClick={() => navigate(`/categorias/${produto?.categoria}`)}>{produto?.categoria}</span></p>
                <p>Preço: R$ {produto?.preco}</p>
                <p>Proprietário: <span onClick={() => navigate(`/produto/proprietario/${produto?.proprietario}`)}>{produto?.proprietario}</span></p>
                <p>Estoque: {produto?.qtd_estoque} unidades</p>
                <div className={styles.buttons}>
                <a href={autenticado ? "#" : "/login"} onClick={handleListaDeDesejos}>Adicionar a lista de desejos</a>
                <a href={autenticado ? "#" : "/login"} onClick={handlePedidoDeCompra}>Comprar</a>
                </div>
            </div>
        </div>
    </div>
  )
}
