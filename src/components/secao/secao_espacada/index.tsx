import styles from "./secao_espacada.module.css"

export const Secao_Espacada:React.FC<{data:Array<string>,number_items:number}> = ({data,number_items}) => {

    const filteredData = data.slice(0,number_items);

    return (
        <section className={styles.secao}>
            {filteredData.map((element,index) => (
                <div key={index} className={styles.secao_item}>
                    <img src={element} alt="" />
                </div>
            ))}
        </section>
    );
}