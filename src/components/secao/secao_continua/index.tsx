import { SwiperItems } from "../../swiper";
import styles from "./secao_continua.module.css"

const carrosDestaques = [
    "https://nxboats.com.br/wp-content/uploads/2023/11/bugatti.jpg",
    "https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg",
    "https://img.odcdn.com.br/wp-content/uploads/2021/06/Lamborghini-Aventador-SVJ-1-990x557-1.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/03/639410.jpg?w=293",
    "https://drivon.com.br/wp-content/uploads/2023/08/Mundo-dos-Carros-de-Luxo.png",
    "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2021/10/07143040/mercedes-amg_gt_43_4matic_4-door_coupe_35-1160x653.jpeg"]

export const Secao_Continua:React.FC<{title:string}> = ({title}) => {
    return (
        <section className={styles.secao}>
            <h2 className={styles.secao_title}>{title}</h2>
                <SwiperItems altura="300px" slides={5} data={carrosDestaques} />
        </section>
    );
}