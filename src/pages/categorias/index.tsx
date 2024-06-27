import { useNavigate } from "react-router-dom"
import styles from "./categorias.module.css"

export function Categorias() {
 
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.categorias}>
           <div className={styles.categoria} onClick={() => navigate("/categorias/tecnologia")}>
            <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/9989416-workspace-cartoon-vector-icon-illustration-technology-object-icon-concept-isolated-premium-vector-flat-cartoon-style-vetor.jpg" alt="" />
            <p>Tecnologia</p>
            </div>
            <div className={styles.categoria} onClick={() => navigate("/categorias/livros")}>
            <img src="https://i.pinimg.com/736x/39/c1/24/39c124f6e987492b03f1f5aa6c259d3a.jpg" alt="" />
            <p>Livros</p>
            </div>
            <div className={styles.categoria} onClick={() => navigate("/categorias/vestimentas")}>
            <img src="https://img.freepik.com/vetores-premium/desenhos-animados-da-roupa_119631-167.jpg" alt="" />
            <p>Vestimentas</p>
            </div>
            <div className={styles.categoria} onClick={() => navigate("/categorias/alimentacao")}>
            <img src="https://img.freepik.com/vetores-premium/alimentacao-saudavel-e-equilibrada-superalimentos-desintoxicacao-dieta-alimentacao-saudavel-coco-cenoura-azeitona-abacate-e-peixe-icone-dos-desenhos-animados-ilustracao-sobre-fundo-branco_276366-265.jpg" alt="" />
            <p>Alimentação</p>
            </div>
            <div className={styles.categoria} onClick={() => navigate("/categorias/cama_mesa_banho")}>
            <img src="https://img.freepik.com/vetores-premium/prateleira-de-banheiro-de-madeira-com-pilha-de-toalhas-produtos-cosmeticos-cosmeticos-de-banho-coisas-produtos-de-higiene-pessoal-frasco-de-creme-spray-frasco-de-gel-e-vaso-de-plantas-ilustracao-em-vetor-plana-isolada-no-fundo-branco_198278-18900.jpg" alt="" />
            <p>Cama, mesa e banho</p>
            </div>
            <div className={styles.categoria} onClick={() => navigate("/categorias/eletrodomesticos")}>
            <img src="https://static.vecteezy.com/ti/vetor-gratis/p1/5901670-editable-stroke-cartoon-style-home-appliances-color-line-icon-set-vector-illustration-vetor.jpg" alt="" />
            <p>Eletrodomésticos</p>
            </div>
      </div>
    </div>
    )
}
