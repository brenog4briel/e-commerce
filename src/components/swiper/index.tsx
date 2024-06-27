import styles from "./swiper.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { IData } from "../../pages/home";
import { useNavigate } from "react-router-dom";

export const SwiperItems:React.FC<{data:Array<IData>,altura:string,slides:number,largura:string,autoplay:boolean}> = ({data,altura,slides,largura,autoplay}) => {
    const navigate = useNavigate();
    return( 
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
                slidesPerView={slides}
                style={{height:altura,width:largura}}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={autoplay ? {delay:2000} : autoplay}
                className={styles.slider_wrapper}>

                
                {data.map((element) => (
                    <SwiperSlide key={element.produto_id}>
                        <div className={styles.slider_items} onClick={() => navigate(`/produto/${element.produto_id}`)}>
                            <img src={element.imagem} alt=""/>
                            <p>{element.nome}</p>
                        </div>
                    </SwiperSlide>))
                }
                
        
      
            </Swiper>
        );
       
}