import styles from "./popup.module.css"

interface PopupProps {
    mensagem:string,
    sucesso:boolean
}

export function Popup({mensagem,sucesso}:PopupProps) {
  return (
    <div className={sucesso? styles.container_success : styles.container_error}>
        <h3>{mensagem}</h3>
    </div>
  )
}
