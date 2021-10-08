import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Services.module.css'
import HelpServices from "../components/misc/HelpServices";


export default function Help(){
    return (
        <Tabs buttons={[
            {label: 'Serviços', children: <HelpServices/>},

            {label: 'Pivilégios / Acesso', children: null},

        ]}>
            <div className={styles.header}>
                Ajuda
            </div>
        </Tabs>
    )
}