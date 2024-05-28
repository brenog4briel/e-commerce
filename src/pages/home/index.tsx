import styles from "./home.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';


export function Home() {
  
  return (
    
    <div className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
        // spaceBetween={100}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{delay:2000}}
        className={styles.slider_wrapper}>
          <SwiperSlide>
            <div className={styles.slider_items}>
              <h2>teste</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slider_items}>
              <h2>teste</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slider_items}>
              <h2>teste</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slider_items}>
              <h2>teste</h2>
            </div>
          </SwiperSlide>
    </Swiper>


      <div className={styles.texts}>
        <h1>Os melhores produtos para cama, mesa e banho!</h1>
        <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
      </div>

      <div className={styles.list_products}>
        <div className={styles.products}>
          <p>produto1</p>
        </div>
        <div className={styles.products}>
          <p>produto2</p>
        </div>
        <div className={styles.products}>
          <p>produto3</p>
        </div>
        <div className={styles.products}>
          <p>produto4</p>
        </div>
        <div className={styles.products}>
          <p>produto5</p>
        </div>
        <div className={styles.products}>
          <p>produto6</p>
        </div>
        <div className={styles.products}>
          <p>produto7</p>
        </div>
        <div className={styles.products}>
          <p>produto8</p>
        </div>
        <div className={styles.products}>
          <p>produto9</p>
        </div>
        <div className={styles.products}>
          <p>produto10</p>
        </div>
        <div className={styles.products}>
          <p>produto11</p>
        </div>
        <div className={styles.products}>
          <p>produto12</p>
        </div>
      </div>
    </div>
    )
}
