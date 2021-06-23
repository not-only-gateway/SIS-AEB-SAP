import React, {useState} from "react";
import styles from "../styles/Navigation.module.css";
import {AppsRounded} from "@material-ui/icons";
import AnimationFrame from "./AnimationFrame";
import PropTypes from 'prop-types'

export default function NavigationApps(props) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.appsContainer} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>
            <button
                className={styles.appsButtonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    color: open ? '#0095ff' : undefined,
                    backgroundColor: open ? '#E8F0FE' : null,
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }}>

                <AppsRounded/>
            </button>
            <AnimationFrame elementKey={'floating'} children={
                <div className={styles.floatingBox}
                     style={{transform: props.centered ? 'translate(calc(-50% + 25px), 25%)' : 'translate(calc(-80% - 4px), 25%)'}}>
                    {props.buttons.map((button, index) => (
                        <button
                            className={styles.appsButtonContainer}
                            key={button.label+ index}
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
