import { SyntheticEvent, useState } from "react";
import styles from "./recuperacaoSenha.module.css"
import AxiosInstance from "../../axiosInstance";
import { CircularProgress } from "@mui/material";
import { Popup } from "../../components/popup";
import { useNavigate } from "react-router-dom";

const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

interface IRequestError {
    mensagem:string;
    sucesso:boolean;
}

export function RecuperacaoSenha() {
    const [email,setEmail] = useState<string>("")
    const [codigo,setCodigo] = useState<string>("")
    const [emailError,setEmailError] = useState<boolean | undefined>(undefined)
    const [recuperacaoLoading,setRecuperacaoLoading] = useState<boolean>(false)
    const [emailEnviado,setEmailEnviado] = useState<boolean>(false);
    const [codigoLoading,setCodigoLoading] = useState<boolean>(false);
    const [codigoError,setCodigoError] = useState<boolean | undefined>(undefined)
    const navigate = useNavigate();

    const [emailRequestError,setEmailRequestError] = useState<IRequestError>({
        mensagem:"",
        sucesso:false
    })

    const [codigoRequestError,setCodigoRequestError] = useState<IRequestError>({
        mensagem:"",
        sucesso:false
    })

    function counterTimePopup() {
        setTimeout(() => {
            setCodigoError(undefined)
            setEmailError(undefined)
        },3000)
  }

    function handleSubmitRecuperacao(e:SyntheticEvent) {
        e.preventDefault()
        const emailValido = ValidacaoEmail();
        if (emailValido) {

            setEmailError(false)
            setRecuperacaoLoading(true)

            AxiosInstance.post(`/usuarios/recuperacao/${email}`)
            .then((res) => {
                console.log(res)
                setEmailRequestError((prev) => ({...prev,mensagem:"Um email de verificação foi enviado para o email fornecido",sucesso:true}))
                setEmailError(false)
                setRecuperacaoLoading(false)
                counterTimePopup()
                setEmailEnviado(true)
            })
            .catch((err) => {
                console.log(err)
                setEmailRequestError((prev) => ({...prev,mensagem:"Houve um erro ao enviar o email de verificação",sucesso:false}))
                setEmailError(true)
                setRecuperacaoLoading(false)
                counterTimePopup()    
                setEmail("")
            })
        }
        else {setEmailError(true);}
    }

    function handleVerificacaoCodigo(e:SyntheticEvent) {
        e.preventDefault()
        setCodigoLoading(true)
        AxiosInstance.post(`/usuarios/recuperacao/verificacao/${codigo}`)
        .then((res) => {
            console.log(res)
            setCodigoRequestError((prev) => ({...prev,mensagem:"O código de verificação foi validado com sucesso",sucesso:true}))
            setCodigoError(false)
            setCodigoLoading(false)
            counterTimePopup()
            navigate("/")
        })
        .catch((err) => {
            console.log(err)
            setCodigoRequestError((prev) => ({...prev,mensagem:"O código de verificação é inválido",sucesso:false}))
            setCodigoError(true)
            setCodigoLoading(false)
            counterTimePopup()
        })
    }
    

    function ValidacaoEmail() {
        const emailValido = REGEX_EMAIL.test(email)
        return emailValido
    }   

  return (
     <div className={styles.container}>
        <div className={styles.containerRecuperacao}>
            <div className={styles.containercontainerRecuperacaoTitle}>
          <p className={styles.recuperacaoTitle}>{emailEnviado ? "Digite o código que foi enviado para o email digitado" : "Digite o email cadastrado para que possamos enviar um link de recuperação"}</p>
          </div>
          <form className={styles.form}>
             
              <input type="text" placeholder={emailEnviado ? "" : "Email ou número"} value={emailEnviado ? codigo : email} onChange={(e) => {emailEnviado ? setCodigo(e.target.value) : setEmail(e.target.value)}}/>
              
              {emailEnviado ? <>{codigoError && <p className={styles.input_error_message}>O codigo fornecido não é válido</p>}</> : <>{emailError && <p className={styles.input_error_message}>Formato inválido para email. Ex: jose@gmail.com</p>}</>}
              
              {(recuperacaoLoading || codigoLoading)? <CircularProgress size={25}/> : <button type="submit" onClick={emailEnviado ? handleVerificacaoCodigo : handleSubmitRecuperacao}>{emailEnviado ? "Verificar" : "Enviar"}</button>}
              

          </form>
        </div>
            {((emailError === true) || (emailError === false)) && <Popup mensagem={emailRequestError.mensagem} sucesso={emailRequestError.sucesso}/>}
            {((codigoError === true) || (codigoError === false)) && <Popup mensagem={codigoRequestError.mensagem} sucesso={codigoRequestError.sucesso}/>}
            

    </div>
  )
}
