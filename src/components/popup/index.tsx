import styles from "./popup.module.css"

interface PopupProps {
    mensagem:string,
    // sucesso:boolean
}

export function Popup({mensagem}:PopupProps) {
  return (
    <div className={styles.container}>
        <h3>{mensagem}</h3>
    </div>
  )
}
