import { IData } from "../../pages/home";
import { SwiperItems } from "../swiper";
import styles from "./secao.module.css"

export const Secao:React.FC<{titulo:string,data:Array<IData>}> = ({titulo,data}) => {
    return (
        <section className={styles.secao}>
            <h2 className={styles.secao_title}>{titulo}</h2>
                <SwiperItems altura="300px" slides={5} data={data} largura="100%" autoplay={false}/>
        </section>
    );
}