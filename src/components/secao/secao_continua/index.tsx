import { IData } from "../../../pages/home";
import { SwiperItems } from "../../swiper";
import styles from "./secao_continua.module.css"

export const Secao_Continua:React.FC<{title:string,data:Array<IData>}> = ({title,data}) => {
    return (
        <section className={styles.secao}>
            <h2 className={styles.secao_title}>{title}</h2>
                <SwiperItems altura="400px" slides={5} data={data} largura="100%" autoplay={false}/>
        </section>
    );
}