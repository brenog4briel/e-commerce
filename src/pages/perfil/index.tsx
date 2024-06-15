import styles from "./perfil.module.css"
import user_default from "../../assets/default_user.png"
import { useForm } from "react-hook-form";
import { ChangeProfileSchema, changeProfileSchema } from "../../validations/changeProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import AxiosInstance from "../../axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Popup } from "../../components/popup";

interface IRequestError {
  mensagem:string;
  sucesso:boolean;
}

export function Perfil() {

    const navigate = useNavigate()
    const [userInfoLoading,setUserInfoLoading] = useState<boolean>(false);
    const [uploadImageLoading,setUploadImageLoading] = useState<boolean>(false);
    const [file,setFile] = useState<File>();

    const [uploadImageError,setUploadImageError] = useState<boolean>(false);
    const [userInfoError,setUserInfoError] = useState<boolean>(false);

    
  const [uploadRequestError,setUploadRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})
  const [userInfoRequestError,setUserInfoRequestError] = useState<IRequestError>({mensagem:"",sucesso:false})

    const {register:changeProfileRegister,handleSubmit:handleSubmitChangeProfile,formState:{errors:changeProfileErrors}} = useForm<ChangeProfileSchema>({
        resolver: zodResolver(changeProfileSchema)
    })

      function counterTimePopup() {
        setTimeout(() => {
            setUploadImageError(false);
            setUserInfoLoading(false)
            setUploadImageLoading(false)
            setUserInfoError(false)
        },3000)
  }

    async function changeUserInfo({nome,endereco,CEP}:ChangeProfileSchema) {
        const storedUser = sessionStorage.getItem("@App:usuario");
        const usuario_id = JSON.parse(storedUser!).usuario_id;
        setUserInfoError(false)
        setUserInfoLoading(true)
        AxiosInstance.put(`/${usuario_id}`,{nome,endereco,CEP})
        .then(() => {
            console.log("Informações do usuário alteradas com sucesso!")
            setUserInfoRequestError(prev => ({...prev, mensagem:"Informações do usuário alteradas com sucesso!",sucesso:true}))
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            setUserInfoError(true)
            setUserInfoRequestError(prev => ({...prev, mensagem:err.response.data.message,sucesso:false}))
            counterTimePopup()
        })
    }

    async function handleSubmitImage() {
        setUploadImageError(false)
        setUploadImageLoading(true)
        const storedUser = sessionStorage.getItem("@App:usuario");
        const usuario_id = JSON.parse(storedUser!).usuario_id;
        AxiosInstance.post(`/upload/${usuario_id}`,{file},{headers:{"Content-Type":"multipart/form-data"}})
        .then(() => {
            console.log("Upload de imagem realizado com sucesso")
            setUploadRequestError(prev => ({...prev, mensagem:"Upload de imagem realizado com sucesso",sucesso:true}))
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            setUploadRequestError(prev => ({...prev, mensagem:err.response.data.message,sucesso:false}))
            setUploadImageError(true)
            counterTimePopup()
        })
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
                <div className={styles.user_photo}>
                    <img src={user_default} alt="" />
                    <form action="" encType="multipart/form-data" method="post">
                        <input type="file" name="file" onChange={(e) => onChangeImage(e)}/>
                        {!uploadImageLoading && <button type="submit" onClick={handleSubmitImage}>Alterar foto</button>}
                        {uploadImageLoading && <CircularProgress size={25}/>}
                    </form>
                </div>
                <div className={styles.user_info}>
                    <form action="" method="post" onSubmit={handleSubmitChangeProfile(changeUserInfo)}>
                        <input type="text" placeholder="Nome" {...changeProfileRegister("nome")}/>
                        {changeProfileErrors.nome && <p className={styles.input_error_message}>{changeProfileErrors.nome.message}</p>}
                        <input type="text" placeholder="Endereço" {...changeProfileRegister("endereco")}/>
                        {changeProfileErrors.endereco && <p className={styles.input_error_message}>{changeProfileErrors.endereco.message}</p>}
                        <input type="text" placeholder="CEP" {...changeProfileRegister("CEP")}/>
                        {changeProfileErrors.CEP && <p className={styles.input_error_message}>{changeProfileErrors.CEP.message}</p>}
                        {!userInfoLoading && <button type="submit">Alterar</button>}
                        {userInfoLoading && <CircularProgress size={25}/>}
                    </form>
                </div>
            </div>
                {uploadImageError && <Popup mensagem={uploadRequestError.mensagem} sucesso={uploadRequestError.sucesso}/>}
                {userInfoError && <Popup mensagem={userInfoRequestError.mensagem} sucesso={userInfoRequestError.sucesso}/>}    
        </div>
    );
}