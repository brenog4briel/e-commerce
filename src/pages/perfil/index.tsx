import styles from "./perfil.module.css"
import user_default from "../../assets/default_user.png"

export function Perfil() {
    return (
        <div className={styles.container}>
            <div className={styles.user_profile}>
                <div className={styles.user_photo}>
                    <img src={user_default} alt="" />
                    <input type="file" />
                </div>
                <div className={styles.user_info}>
                    <input type="text" placeholder="Nome"/>
                    <input type="text" placeholder="Email"/>
                    <input type="text" placeholder="Endereço"/>
                    <input type="text" placeholder="CEP"/>
                </div>
            </div>
        </div>
    );
}