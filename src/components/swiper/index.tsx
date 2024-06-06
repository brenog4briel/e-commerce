import styles from "./swiper.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export const SwiperItems:React.FC<{data:Array<any>,altura:string,slides:number}> = ({data,altura,slides}) => {
    return( 
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
                slidesPerView={slides}
                style={{height:altura}}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{delay:2000}}
                className={styles.slider_wrapper}>
                
                {data.map((element,index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.slider_items}>
                            <img src={element} alt=""/>
                        </div>
                    </SwiperSlide>))
                }
                
        
      
            </Swiper>
        );
       
}