import { useNavigate, useParams } from "react-router-dom"
import styles from "./detalhesProduto.module.css"
import { useEffect, useState } from "react";
import AxiosInstance from "../../axiosInstance";
import { useAuth } from "../../contexts/AuthContext";
import { Popup } from "../../components/popup";
import { IRequestError } from "../loginAndRegister";

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

    const [pedidoDeCompraErro,setPedidoDeCompraErro] = useState<boolean | null>(null)
    const [listaDeDesejosErro,setListaDeDesejosErro] = useState<boolean | null>(null)
    
    const [erroRequest,setErroRequest] = useState<IRequestError>({mensagem:"",sucesso:false})

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
        AxiosInstance.get(`/lista_de_desejos/lista/${usuario?.usuario_id}`)
        .then((res) => {
            AxiosInstance.put("/lista_de_desejos/adiciona-produto",{lista_de_desejos_id:res.data.lista_de_desejos_id,produto:produto})
            .then((res) => {
                console.log(res)
                setErroRequest(prev => ({...prev,mensagem:"O produto foi adicionado a lista de desejos com sucesso!",sucesso:true}))
                setListaDeDesejosErro(false)
            })
            .catch((err) => {
                console.log(err)
                setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao adicionar o produto a sua lista de desejos!",sucesso:false}))
                setListaDeDesejosErro(true)
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
                        setErroRequest(prev => ({...prev,mensagem:"O produto foi adicionado com sucesso ao seu pedido de compras!",sucesso:true}))
                        setPedidoDeCompraErro(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao adicionar o produto ao seu pedido de compras!",sucesso:false}))
                        setPedidoDeCompraErro(true)
                    })
                    })
            .catch((err) => {
                console.log(err)
                return err
            })  
        }

        else {
            AxiosInstance.put("/pedido_de_compra/adiciona-produto",{pedido_de_compra_id:result.data.pedido_de_compra_id,produto:produto})
                    .then((res) => {
                        console.log(res)
                        setErroRequest(prev => ({...prev,mensagem:"O produto foi adicionado com sucesso ao seu pedido de compras!",sucesso:true}))
                        setPedidoDeCompraErro(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        setErroRequest(prev => ({...prev,mensagem:"Houve um erro ao adicionar o produto ao seu pedido de compras!",sucesso:false}))
                        setPedidoDeCompraErro(true)
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
                <a href={autenticado ? "#" : "/login"} onClick={handlePedidoDeCompra}>Adicionar ao meus pedidos</a>
                </div>
            </div>
        </div>
        {((pedidoDeCompraErro === true) || (pedidoDeCompraErro === false)) && <Popup mensagem={erroRequest.mensagem} sucesso={erroRequest.sucesso}/>}
        {((listaDeDesejosErro === true) || (listaDeDesejosErro === false)) && <Popup mensagem={erroRequest.mensagem} sucesso={erroRequest.sucesso}/>}
    </div>
  )
}
