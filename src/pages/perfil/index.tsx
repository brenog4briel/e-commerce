import styles from "./perfil.module.css"
import user_default from "../../assets/default_user.png"
import { useForm } from "react-hook-form";
import { ChangeProfileSchema, changeProfileSchema } from "../../validations/changeProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import AxiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { Popup } from "../../components/popup";
import axios from "axios";

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

export function Perfil() {

    const navigate = useNavigate()
    const {email} = useParams()
    const [userInfoLoading,setUserInfoLoading] = useState<boolean>(false);
    const [uploadImageLoading,setUploadImageLoading] = useState<boolean>(false);
    const [file,setFile] = useState<Blob>();
    const [uploadImageError,setUploadImageError] = useState<boolean | undefined>(undefined);
    const [userInfoError,setUserInfoError] = useState<boolean | undefined>(undefined);
    const [uploadRequestError,setUploadRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
    const [userInfoRequestError,setUserInfoRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})

    const [nome,setNome] = useState<string | undefined>(undefined)
    const [endereco,setEndereco] = useState<string | undefined>(undefined)
    const [CEP,setCEP] = useState<string | undefined>(undefined)
    const [image,setImage] = useState<string | undefined>(undefined)

    const [firstRenderLoading,setFirstRenderLoading] = useState<boolean>(false)

    useEffect(() => {
       setFirstRenderLoading(true)
       AxiosInstance.get(`/usuarios/usuario/${email}`)
       .then((res) => {
            setNome(res.data.nome)
            setEndereco(res.data.endereco)
            setCEP(res.data.CEP)
            setImage(res.data.imagem)
            setFirstRenderLoading(false)
       })
       .catch((err) => {
        console.log(err)
        setFirstRenderLoading(false)
       })
    },[])

    const {register:changeProfileRegister,handleSubmit:handleSubmitChangeProfile,formState:{errors:changeProfileErrors}} = useForm<ChangeProfileSchema>({
        resolver: zodResolver(changeProfileSchema)
    })

      function counterTimePopup() {
        setTimeout(() => {
            setUploadImageError(undefined);
            setUserInfoError(undefined)
        },3000)
  }
  
    async function changeUserInfo({nome,endereco,CEP}:ChangeProfileSchema) {
        const storedUser = sessionStorage.getItem("usuario");
        const usuario_id = JSON.parse(storedUser!).usuario_id;

        setUserInfoError(false)
        setUserInfoLoading(true)

        AxiosInstance.put(`/usuarios/${usuario_id}`,{nome,endereco,CEP})
        .then(() => {
            console.log("Informações do usuário alteradas com sucesso!")
            setUserInfoRequestError(prev => ({...prev, mensagem:"Informações do usuário alteradas com sucesso!",sucesso:true}))
            setUserInfoLoading(false)
            counterTimePopup()
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            setUserInfoError(true)
            setUserInfoRequestError(prev => ({...prev, mensagem:err.response.data.message,sucesso:false}))
            setUserInfoLoading(false)
            counterTimePopup()
            setNome("")
            setCEP("")
            setEndereco("")
        })
    }

    async function handleSubmitImage() {
        setUploadImageError(false)
        setUploadImageLoading(true)
        
        const storedUser = sessionStorage.getItem("usuario");
        const usuario_id = JSON.parse(storedUser!).usuario_id;
        const data = new FormData();

        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file!);
            reader.onloadend = () => {
                const base64 = reader.result
                const base64String = base64!.toString()
                    .replace('data:', '')
                    .replace(/^.+,/, '');
            data.append( "image", base64String );
            axios({
                method:"post",
                url:"https://api.imgbb.com/1/upload?key=39ac12420e84248cd5a88e3ed7bcc598",
                withCredentials:false,
                data:data
            })
            .then((res) => {
                const imagem : string = res.data.data.url;
                AxiosInstance.put(`/upload/usuario/${usuario_id}`,{imagem})
                .then(() => {
                    console.log("Upload de imagem realizado com sucesso")
                    setUploadRequestError(prev => ({...prev, mensagem:"Imagem de perfil alterada com sucesso!",sucesso:true}))
                    setUploadImageLoading(false)
                    counterTimePopup()
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err);
                    setUploadRequestError(prev => ({...prev, mensagem:"Houve um erro ao alterar a imagem de perfil",sucesso:false}))
                    setUploadImageError(true)
                    setUploadImageLoading(false)
                    counterTimePopup()
                })
            })
            .catch((err) => console.log(err))
            };
        }
 
    }

    function onChangeImage(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const {files} = e.target;
        const selectedFile = files as FileList;
        setFile(selectedFile?.[0]);
    }

    return (
        <div className={styles.container}>
            <div className={styles.user_profile}>
                {firstRenderLoading ? <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
                    <CircularProgress size={25}/>
                </Box> : 
                <div className={styles.user_photo}>
                    <img src={image ? image : user_default} alt="" />
                    <Box sx={{display:"flex",flexDirection:'column',justifyContent:"center",textAlign:"start", width:'100%',paddingLeft:5,gap:2}}>
                        <p>Nome: {nome}</p>
                        <p>Email: {email}</p>
                        <p>Endereço: {endereco}</p>
                        <p>CEP: {CEP}</p>
                    </Box>
                    <form>
                        <input type="file" name="image" onChange={(e) => onChangeImage(e)}/>
                        {!uploadImageLoading && <button type="submit" onClick={handleSubmitImage}>Alterar foto</button>}
                        {uploadImageLoading && <CircularProgress size={25}/>}
                    </form>
                </div>
                    }
                <div className={styles.user_info}>
                    <form action="" method="post" onSubmit={handleSubmitChangeProfile(changeUserInfo)}>
                        <input type="text" placeholder="Nome" {...changeProfileRegister("nome")} value={nome? nome : ""} onChange={(e) => setNome(e.target.value)}/>
                        {changeProfileErrors.nome && <p className={styles.input_error_message}>{changeProfileErrors.nome.message}</p>}
                        <input type="text" placeholder="Endereço" {...changeProfileRegister("endereco")} value={endereco? endereco : ""} onChange={(e) => setEndereco(e.target.value)}/>
                        {changeProfileErrors.endereco && <p className={styles.input_error_message}>{changeProfileErrors.endereco.message}</p>}
                        <input type="text" placeholder="CEP" {...changeProfileRegister("CEP")} value={CEP? CEP : ""} onChange={(e) => setCEP(e.target.value)}/>
                        {changeProfileErrors.CEP && <p className={styles.input_error_message}>{changeProfileErrors.CEP.message}</p>}
                        {!userInfoLoading && <button type="submit">Alterar</button>}
                        {userInfoLoading && <CircularProgress size={25}/>}
                    </form>
                </div>
            </div>
                {((uploadImageError === true) || (uploadImageError === false)) && <Popup mensagem={uploadRequestError.mensagem} sucesso={uploadRequestError.sucesso}/>}
                {((userInfoError === true) || (userInfoError === false)) && <Popup mensagem={userInfoRequestError.mensagem} sucesso={userInfoRequestError.sucesso}/>}    
        </div>
    );
}