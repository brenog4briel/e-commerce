import { Divider, Typography } from "@mui/material";
import { IData } from "../../pages/home";
import { SwiperItems } from "../swiper";
import styles from "./secao.module.css"

export const Secao:React.FC<{titulo:string,data:Array<IData>}> = ({titulo,data}) => {
    return (
        <section className={styles.secao}>
            <Typography sx={{fontSize: "20px",marginLeft: "20px",padding: "10px 0",fontWeight:600}} component="h2">{titulo}</Typography>
            <Divider style={{width:'100%'}} />
            <SwiperItems altura="300px" slides={5} data={data} largura="100%" autoplay={false}/>
        </section>
    );
}