import Tabs from "../../../core/navigation/tabs/Tabs";
import styles from '../styles/Shared.module.css'
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