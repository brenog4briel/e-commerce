import styles from "./home.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export function Home() {
  

  const carros = [
    "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/09-images/onix-hatch-showroom-1920x960.jpg?imwidth=960",
    "https://storage.googleapis.com/movida-public-images/modelos/3210_image.jpg",
    "https://jeep.grupoamazonas.com.br/wp-content/uploads/2022/04/img-compass-4xe.png",
    "https://s2-autoesporte.glbimg.com/69yw9-dcpdP8GA63Jmdh5ycMIhQ=/0x0:1600x1067/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2023/b/B/eeIuI3RtAmvEAZHA3NoA/polo-track-7.jpg",
    "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/uploads/2018/12/12155721/43797884-1160x773.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/dolphin.jpeg?w=800",
    "https://www.hondacaiuas.com.br/wp-content/uploads/2022/08/tipos-de-carro-hatch-new-city-hatchback.jpg",
    "https://t.ctcdn.com.br/zvkHhq85Nyb_EnOulpGNc_EJQDM=/640x360/smart/i617059.jpeg",
    "https://www.autoo.com.br/fotos/2023/6/1280_960/fiat_mobi_2023_1_07062023_74796_1280_960.jpg",
    "https://fdr.com.br/wp-content/uploads/2023/08/novo-fiat-fastback-limited-edition-ficha-tecnica-e-preco-1536x961-1-750x469.jpg",
    "https://midias.vrum.com.br/_midias/jpg/2023/12/29/740x420/1_renault_kardian-33797374.jpg",
    "https://static.bancointer.com.br/blog/images/4e2d0ffd95c447af877ce2dffbe80d5b_renault-kwid-zen-10_.png",
  ]
  const carrosDestaques = [
    "https://nxboats.com.br/wp-content/uploads/2023/11/bugatti.jpg",
    "https://nxboats.com.br/wp-content/uploads/2023/11/Lamborghini.jpg",
    "https://img.odcdn.com.br/wp-content/uploads/2021/06/Lamborghini-Aventador-SVJ-1-990x557-1.jpg",
    "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/03/639410.jpg?w=293",
    "https://drivon.com.br/wp-content/uploads/2023/08/Mundo-dos-Carros-de-Luxo.png",
    "https://fotos-jornaldocarro-estadao.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2021/10/07143040/mercedes-amg_gt_43_4matic_4-door_coupe_35-1160x653.jpeg"]

  return (
    
    <div className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
        // spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        autoplay={{delay:2000}}
        className={styles.slider_wrapper}>
          {
            carrosDestaques.map((destaque) => (
              <SwiperSlide>
                <div className={styles.slider_items}>
                  <img src={destaque} alt=""/>
                </div>
              </SwiperSlide>
            ))
          }
    </Swiper>


      <div className={styles.texts}>
        <h1>Os melhores produtos para cama, mesa e banho!</h1>
        <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
      </div>

      <div className={styles.list_products}>
        {
          carros.map((carro) => (
            <div className={styles.products}>
             <img src={carro} alt="" />
            </div>
          ))
        }
      </div>
      <a href="" className={styles.moreProducts_btn}>Mostrar mais</a>
    </div>
    )
}
