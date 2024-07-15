import styles from "./home.module.css"
import { Secao } from "../../components/secao";
import { SwiperItems } from "../../components/swiper";
import AxiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { BoxWrapper } from "../../components/boxWrapper";
import { Avatar, Box, CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";
import estoque_vazio from "../../assets/estoque_vazio.png"

export interface IData {
  nome:string;
  imagem:string;
  categoria:string;
  proprietario:string;
  produto_id:string;
  usuario_id:string;
}

export function Home() {
  
  const [tecnologia,setTecnologia] = useState<IData[]>([])
  const [livros,setLivros] = useState<IData[]>([])
  const [camaMesaBanho,setCamaMesaBanho] = useState<IData[]>([])
  const [eletrodomesticos,setEletrodomesticos] = useState<IData[]>([])
  const [alimentacao,setAlimentacao] = useState<IData[]>([])
  const [vestimentas,setVestimentas] = useState<IData[]>([])

  const [sliderData,setSliderData] = useState<IData[]>([])

  const navigate = useNavigate()

  const [loading,setLoading] = useState<boolean>(false);

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
    setLoading(true)
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
      setLoading(false)
      getSliderData()
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
    } 
  }

    const [bestSellers,setBestSellers] = useState<IData[]>([])

    const fetchBestSellers = async() => {
      AxiosInstance.get("/produtos/mais-vendidos")
      .then((res) => {
        setBestSellers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      fetchBestSellers()
    },[])

    function getSliderData() {
      const tmpAlimentacao = [...alimentacao]
      const tmpVestimentas = [...vestimentas]
      const tmpTecnologia = [...tecnologia]
      const tmpCamaMesaBanho = [...camaMesaBanho]
      const tmpEletrodomesticos = [...eletrodomesticos]
      const tmpLivros = [...livros]
      
      tmpAlimentacao.splice(0,2)
      tmpVestimentas.splice(0,2)
      tmpTecnologia.splice(0,2)
      tmpCamaMesaBanho.splice(0,2)
      tmpEletrodomesticos.splice(0,2)
      tmpLivros.splice(0,2)

      const tmp = []
    
      tmp.push(tmpAlimentacao,tmpVestimentas,tmpTecnologia,tmpCamaMesaBanho,tmpEletrodomesticos,tmpLivros)
      const newTmp = tmp.flat()
      setSliderData(newTmp)
    }

    return (
    <div className={styles.container}>
      
      {loading ? 
        <Box sx={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",justifyContent:"center",minHeight:"100vh",backgroundColor:"white"}}>
          <CircularProgress/>
        </Box> 
      : 
      <>

      {sliderData.length > 0 && <SwiperItems altura="400px" slides={1} data={sliderData} largura="100%" autoplay={true}/>}
      
      {tecnologia.length > 0 && (
        <>
        <Secao titulo="Tecnologia" data={tecnologia}/> 
        <BoxWrapper data={tecnologia}/>
        </>
      )}
      {livros.length > 0 && (
        <>
        <Secao titulo="Livros" data={livros}/> 
        <BoxWrapper data={livros}/>
        </>
      )}
      {alimentacao.length > 0 && (
        <>
        <Secao titulo="Alimentação" data={alimentacao}/> 
        <BoxWrapper data={alimentacao}/>
        </>
      )}
      {camaMesaBanho.length > 0 && (
        <>
        <Secao titulo="Cama, mesa e banho" data={camaMesaBanho}/> 
        <BoxWrapper data={camaMesaBanho}/>
        </>
      )}
      {eletrodomesticos.length > 0 && (
        <>
        <Secao titulo="Eletrodomésticos" data={eletrodomesticos}/> 
        <BoxWrapper data={eletrodomesticos}/>
        </>
      )}
      {vestimentas.length > 0 && (
        <>
        <Secao titulo="Vestimentas" data={vestimentas}/> 
        <BoxWrapper data={vestimentas}/>
        </>
      )}

      {(bestSellers.length > 0) && 
      <ImageList sx={{ width: "70%", borderRadius:5,boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div" sx={{fontWeight:800,fontSize:"20px",textAlign:"center"}}>Mais vendidos</ListSubheader>
      </ImageListItem>
      {bestSellers.map((item) => (
        <ImageListItem key={item.imagem} sx={{cursor:"pointer",padding:10}} onClick={() => navigate(`/produto/${item.produto_id}`)}>
          <img
            src={item.imagem}
            alt={item.nome}
            loading="lazy"
            style={{objectFit:"fill"}}
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
    }
    </>}

      {!(tecnologia && alimentacao && bestSellers && vestimentas && camaMesaBanho && eletrodomesticos && livros) && 
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center',textAlign:"center",minHeight:"100vh"}}>
          <Typography component="h2" sx={{fontSize:25}}>
            Infelizmente não há produtos no estoque. Desculpe o transtorno!
          </Typography>
          <Avatar src={estoque_vazio} sx={{objectFit:"fill",width:"25%",height:"20%"}}/>
        </Box>}
      
    </div>
    )
}
