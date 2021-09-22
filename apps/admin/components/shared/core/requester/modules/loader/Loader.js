import styles from '../../styles/Loader.module.css'
import React from 'react'

export default function Loader(){
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}/>
        </div>
    )
}
