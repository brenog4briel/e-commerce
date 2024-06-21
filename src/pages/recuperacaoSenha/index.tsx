import { SyntheticEvent, useState } from "react";
import styles from "./recuperacaoSenha.module.css"
import AxiosInstance from "../../axiosInstance";
import { CircularProgress } from "@mui/material";
import { Popup } from "../../components/popup";

const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

export function RecuperacaoSenha() {
    const [email,setEmail] = useState<string>("")
    const [emailError,setEmailError] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [popUp,setPopUp] = useState<boolean>(false)

    function counterTimePopup() {
        setTimeout(() => {
            setPopUp(false)
        },3000)
  }

    function handleSubmit(e:SyntheticEvent) {
        e.preventDefault()
        const emailValido = ValidacaoEmail();
        if (emailValido) {
            setLoading(true)
            setEmailError(false)
            AxiosInstance.post(`/recuperacao/${email}`)
            .then((res) => {
                console.log(res)
                setPopUp(true)
                counterTimePopup()
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        }
        else {setEmailError(true)}


    }

    function ValidacaoEmail() {
        const emailValido = REGEX_EMAIL.test(email)
        return emailValido
    }   

  return (
     <div className={styles.container}>
        <div className={styles.containerRecuperacao}>
            <div className={styles.containercontainerRecuperacaoTitle}>
          <p className={styles.recuperacaoTitle}>Digite o email cadastrado para que possamos enviar um link de recuperação</p>
          </div>
          <form className={styles.form}>
              <input type="text" placeholder="Email ou número" value={email} onChange={(e) => setEmail(e.target.value)}/>
              {emailError && <p className={styles.input_error_message}>Formato inválido para email. Ex: jose@gmail.com</p>}
              {loading ? <CircularProgress size={25}/> : <button type="submit" onClick={handleSubmit}>Enviar</button>}
              

          </form>
        </div>
            {popUp && <Popup mensagem="Um link de recuperação foi enviado para o email fornecido" sucesso={true}/>}
    </div>
  )
}
