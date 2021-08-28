import {FolderRounded} from "@material-ui/icons";
import React from "react";
import ListsPT from "../locales/ListsPT";
import styles from '../styles/Indicator.module.css'
export default function EmptyListIndicator(){
    const lang = ListsPT

    return(

            <div className={styles.content}>
                <FolderRounded style={{fontSize: '130px', color: '#999999'}}/>
                <h5 style={{textAlign: 'center', color: '#777777'}}>{lang.nothingFound}</h5>
            </div>
    )
}