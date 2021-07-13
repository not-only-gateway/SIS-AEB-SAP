import styles from '../../styles/Menu.module.css'
import {AddRounded, GetAppRounded, SaveRounded, SearchRounded} from "@material-ui/icons";

export default function OptionsMenu(props) {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.header}>
                Módulos
            </div>
            <div className={styles.inputContainer}>
                <button className={styles.searchButton}>
                    <SearchRounded/>
                </button>
                <input className={styles.textField} placeholder={'Pesquisar módulos'}/>
            </div>
            <button className={styles.buttonContainer}>
                <AddRounded/>
                Adicionar modulo
            </button>
            <button className={styles.buttonContainer}>
                <SaveRounded/>
                Salvar
            </button>
            <button className={styles.buttonContainer}>
                <GetAppRounded/>
                Download
            </button>
        </div>
    )
}