import React, {useState} from "react";
import styles from "../../../styles/Navigation.module.css";
import {AppsRounded, ExtensionRounded, TimelineRounded} from "@material-ui/icons";
import AnimationFrame from "../AnimationFrame";
import PropTypes from 'prop-types'

export default function NavigationApps(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.appsContainer} onBlur={event =>{
            if(!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>
            <button
                className={styles.buttonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    backgroundColor: open ? '#0095ff' : null,
                    color: 'white'
                }}>

                <AppsRounded/>
            </button>
            <AnimationFrame elementKey={'floating'} children={
                <div className={styles.floatingBoxContainer}>
                    <button
                        className={styles.buttonContainer}

                        onClick={() => setOpen(!open)}
                        style={{
                            display: 'grid',
                            justifyItems: 'center',
                            justifyContent: 'center',
                            height: '80px',
                            width: "80px"
                        }}
                    >

                        <ExtensionRounded/>

                        <div style={{
                            fontSize: '.9rem',
                        }}> {props.lang.extensions}</div>

                    </button>
                    <button

                        className={styles.buttonContainer}
                        style={{
                            display: 'grid',
                            justifyItems: 'center',
                            justifyContent: 'center',
                            height: '80px',
                            width: "80px"
                        }}
                        onClick={() => window.open('https://www.google.com')}
                    >

                        <TimelineRounded/>
                        <div style={{
                            fontSize: '.9rem',
                        }}> {props.lang.statistics}</div>
                    </button>
                </div>
            } render={open} type={"fade"}/>
        </div>
    )
}
NavigationApps.propTypes = {
    lang: PropTypes.object
}