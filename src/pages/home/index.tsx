import styles from "./home.module.css"
import { Secao } from "../../components/secao";
// import { Secao_Espacada } from "../../components/secao/secao_espacada";
import { SwiperItems } from "../../components/swiper";
import AxiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";

export interface IData {
  nome:string;
  imagem:string;
  categoria:string;
  produto_id:string;
  usuario_id:string;
}

export function Home() {
  
  const [tecnologia,setTecnologia] = useState<Array<IData>>([])
  const [livros,setLivros] = useState<Array<IData>>([])
  const [camaMesaBanho,setCamaMesaBanho] = useState<Array<IData>>([])
  const [eletrodomesticos,setEletrodomesticos] = useState<Array<IData>>([])
  const [alimentacao,setAlimentacao] = useState<Array<IData>>([])
  const [vestimentas,setVestimentas] = useState<Array<IData>>([])

  useEffect(() => {
    Promise.all([
      getImagesByCategoria("tecnologia"),
      getImagesByCategoria("livros"),
      getImagesByCategoria("cama_mesa_banho"),
      getImagesByCategoria("eletrodomesticos"),
      getImagesByCategoria("alimentacao"),
      getImagesByCategoria("vestimentas"),
    ])
  },[])

  
  async function getImagesByCategoria(categoria : string) {
      if ((categoria.length > 0) && (categoria.trim() !== "")) {
      AxiosInstance.get(`/produtos/categorias/${categoria}`)
      .then((res) => {
        switch(categoria) {
          case "tecnologia":
            setTecnologia(res.data)
            break
          case "livros":
            setLivros(res.data)
            break
          case "cama_mesa_banho":
            setCamaMesaBanho(res.data)
            break
          case "eletrodomesticos":
            setEletrodomesticos(res.data)
            break
          case "alimentacao":
            setAlimentacao(res.data)
            break
          default:
            setVestimentas(res.data)
            break
        }
      })
      .catch((err) => {
        console.log(err)
      })
    } 
  }


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
    return (
    <div className={styles.container}>
      
      <SwiperItems altura="400px" slides={1} data={tecnologia} largura="95%" autoplay={true}/>
      
      <Secao title="Tecnologia" data={tecnologia}/> 
      <Secao title="Livros" data={livros}/>  
      <Secao title="Cama, mesa e banho" data={camaMesaBanho}/>  
      <Secao title="Eletrodomésticos" data={eletrodomesticos}/>  
      <Secao title="Alimentação" data={alimentacao}/>  
      <Secao title="Vestimentas" data={vestimentas}/>  


      
      <div className={styles.texts}>
        <h1>Mais vendidos da semana</h1>
        {/* <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4> */}
      </div>

      <div className={styles.list_products}>
        {
          carros.map((carro,index) => (
            <div className={styles.products} key={index}>
             <img src={carro} alt="" />
             <div>
             <p>Produto {index}</p>
             <p>Preço 1</p>
             </div>
            </div>
          ))
        }
      </div>
    </div>
    )
}
