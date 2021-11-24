import Tabs from "../../../core/navigation/tabs/Tabs";
import styles from '../styles/Shared.module.css'
import HelpServices from "../components/misc/HelpServices";
import {useState} from "react";


export default function Help(){
    const [open, setOpen] = useState()
    return (
        ''
        // <Tabs buttons={[
        //     {label: 'Serviços', children: <HelpServices/>},
        //
        //     {label: 'Pivilégios / Acesso', children: null},
        //
        // ]}>
        //     <div className={styles.header}>
        //         Ajuda
        //     </div>
        // </Tabs>
    )
}