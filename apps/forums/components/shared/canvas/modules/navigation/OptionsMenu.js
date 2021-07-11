import styles from '../../styles/Frame.module.css'
import {AddRounded, GetApp, GetAppRounded, SaveRounded} from "@material-ui/icons";

export default function OptionsMenu(props) {
    return (
        <div className={styles.menuContainer}>
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