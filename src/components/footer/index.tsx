import styles from "./footer.module.css"

export function Footer() {
    return(
        <footer className={styles.footer}> 
            Criado por Breno Gabriel da Silva Sacerdote &copy;  
            <a href="https://www.github.com/brenog4briel">Github</a>
            <a href="https://www.linkedin.com">Linkedin</a>
        </footer>
    );
}