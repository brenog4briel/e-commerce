import styles from "./perfil.module.css"
import user_default from "../../assets/default_user.png"
import { useForm } from "react-hook-form";
import { ChangeProfileSchema, changeProfileSchema } from "../../validations/changeProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import AxiosInstance from "../../axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export function Perfil() {

    const navigate = useNavigate()
    const [loading,setLoading] = useState<boolean>(false);
    const {register:changeProfileRegister,handleSubmit:handleSubmitChangeProfile,formState:{errors:changeProfileErrors}} = useForm<ChangeProfileSchema>({
        resolver: zodResolver(changeProfileSchema)
    })

    async function changeUserInfo({nome,email,endereco,CEP}:ChangeProfileSchema) {
        setLoading(true)
        AxiosInstance.post("/upload",{nome,email,endereco,CEP})
        .then(() => {
            console.log("Informações do usuário alteradas com sucesso!")
            setLoading(false)
            navigate(-1)
        })
        .catch((err) => {
            console.log(err);
            throw new Error("Houve um erro ao atualizar as informações do usuário")
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.user_profile}>
            <form action="" method="post" encType="multipart/form-data" onSubmit={handleSubmitChangeProfile(changeUserInfo)}>
                <div className={styles.user_photo}>
                    <img src={user_default} alt="" />
                    <input type="file" name="file"/>
                </div>
                <div className={styles.user_info}>
                        <input type="text" placeholder="Nome" {...changeProfileRegister("nome")}/>
                        {changeProfileErrors.nome && <p className={styles.input_error_message}>{changeProfileErrors.nome.message}</p>}
                        <input type="text" placeholder="Email" {...changeProfileRegister("email")}/>
                        {changeProfileErrors.email && <p className={styles.input_error_message}>{changeProfileErrors.email.message}</p>}
                        <input type="text" placeholder="Endereço" {...changeProfileRegister("endereco")}/>
                        {changeProfileErrors.endereco && <p className={styles.input_error_message}>{changeProfileErrors.endereco.message}</p>}
                        <input type="text" placeholder="CEP" {...changeProfileRegister("CEP")}/>
                        {changeProfileErrors.CEP && <p className={styles.input_error_message}>{changeProfileErrors.CEP.message}</p>}
                        {!loading && <button type="submit">Alterar</button>}
                        {loading && <CircularProgress size={25}/>}
                </div>
            </form>
            </div>
        </div>
    );
}