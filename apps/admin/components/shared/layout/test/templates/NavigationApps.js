import {useState} from "react";
import styles from "../styles/Navigation.module.css";
import {AppsRounded} from "@material-ui/icons";
import AnimationFrame from "./AnimationFrame";
import PropTypes from 'prop-types'
import React from 'react'

export default function NavigationApps(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.appsContainer} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>
            <button
                className={styles.buttonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    border: open ? '#ecedf2 1px solid' : 'transparent 1px solid',
                    backgroundColor: open ? '#f4f5fa' : null,

                }}>

                <AppsRounded/>
            </button>
            <AnimationFrame elementKey={'floating'} children={
                <div className={styles.floatingBox}
                     style={{transform: props.centered ? 'translate(calc(-50% + 25px), 25%)' : 'translate(calc(-80% - 4px), 25%)'}}>
                    {props.buttons.map(button => (
                        <button
                            className={styles.buttonContainer}
                            key={button.name}
                            onClick={() => window.open(button.link)}
                            style={{
                                display: 'grid',
                                justifyItems: 'center',
                                justifyContent: 'center',
                                height: '80px',
                                width: "auto"
                            }}
                        >

                            {button.icon}

                            <div style={{
                                fontSize: '.9rem',
                            }}> {button.label}</div>

                        </button>
                    ))}
                </div>
            } render={open}/>
        </div>
    )
}
NavigationApps.propTypes =
{
    centered: PropTypes.bool,
        lang: PropTypes.object,
        buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
        })
    )
}
