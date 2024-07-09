import styles from "./home.module.css"
import { Secao } from "../../components/secao";
import { SwiperItems } from "../../components/swiper";
import AxiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { BoxWrapper } from "../../components/boxWrapper";
import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export interface IData {
  nome:string;
  imagem:string;
  categoria:string;
  proprietario:string;
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
      
      <SwiperItems altura="400px" slides={1} data={tecnologia} largura="100%" autoplay={true}/>
      
      <Secao titulo="Tecnologia" data={tecnologia}/> 
      <BoxWrapper data={tecnologia}/>
      <Secao titulo="Livros" data={livros}/>  
      <BoxWrapper data={livros}/>
      <Secao titulo="Cama, mesa e banho" data={camaMesaBanho}/>  
      <BoxWrapper data={camaMesaBanho}/>
      <Secao titulo="Eletrodomésticos" data={eletrodomesticos}/>  
      <BoxWrapper data={eletrodomesticos}/>
      <Secao titulo="Alimentação" data={alimentacao}/>  
      <BoxWrapper data={vestimentas}/>
      <Secao titulo="Vestimentas" data={vestimentas}/>  
      

      <ImageList sx={{ width: "80%", height: 600 }}>
      <ImageListItem key="Subheader" cols={3}>
        <ListSubheader component="div">Mais vendidos da semana</ListSubheader>
      </ImageListItem>
      {tecnologia.map((item) => (
        <ImageListItem key={item.imagem} style={{height:"400px"}}>
          <img
            srcSet={`${item.imagem}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.imagem}?w=248&fit=crop&auto=format`}
            alt={item.nome}
            loading="lazy"
            
          />
          <ImageListItemBar
            title={item.nome}
            subtitle={item.proprietario}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.nome}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
    )
}
