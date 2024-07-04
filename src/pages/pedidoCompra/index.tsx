import { useParams } from "react-router-dom";
import styles from "./pedidoCompra.module.css"


export interface IProduto {
    nome: string;
    preco: string;
    categoria: string;
    imagem: string;
    proprietario: string;
    qtd_estoque: string;
    usuario_id:string;
}

export function PedidoDeCompra() {
        
    const {pedido_de_compra_id} = useParams()

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Olá {pedido_de_compra_id}</h2>
            </div>
        </div>
    )
}
