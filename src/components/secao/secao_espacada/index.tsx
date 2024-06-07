import styles from "./secao_espacada.module.css"

export const Secao_Espacada:React.FC<{data:Array<any>}> = ({data}) => {
    return (
        <section className={styles.secao}>
            {data.map((element,index) => (
                <div key={index} className={styles.secao_item}>
                    <img src={element} alt="" />
                </div>
            ))}
        </section>
    );
}