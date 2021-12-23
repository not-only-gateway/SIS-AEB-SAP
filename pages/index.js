import {useRouter} from "next/router";
import React from "react";
import {Button, ToolTip} from "mfc-core";
import styles from '../styles/Home.module.css'
import {Brightness3Rounded, BrightnessHighRounded} from "@material-ui/icons";

export default function index(props) {
    const router = useRouter()
    console.log()

    return (
        <>
            <Button className={styles.themeButton} onClick={() => props.setTheme(!props.theme)}>
                {props.theme ? <Brightness3Rounded/> : <BrightnessHighRounded/>}
                <ToolTip content={'Tema'} align={'middle'} justify={'end'}/>
            </Button>

            <div className={styles.content}>
                <img src={!props.theme ? './light.png' : './dark.png'} alt={'SIS-AEB'} className={styles.logo}/>
                <div className={styles.wrapper}>
                    <Button className={styles.redirectButton} onClick={() => router.push('/hr')}>
                        Ramais e RH
                    </Button>
                    <Button className={styles.redirectButton} onClick={() => router.push('/sap')}>
                        Gestão de portifólios
                    </Button>
                </div>

            </div>
        </>
    )
}