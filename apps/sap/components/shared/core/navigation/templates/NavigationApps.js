import React, {useState} from "react";
import styles from "../styles/Navigation.module.css";
import {AppsRounded} from "@material-ui/icons";
import AnimationFrame from "./AnimationFrame";
import PropTypes from 'prop-types'
import ToolTip from "../../tooltip/ToolTip";

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
                     style={{transform: props.centered ? 'translate(-50%, 16px)' : 'translate(calc(-100% + 16px), 16px)'}}>
                    {props.buttons.map((button, index) => (
                        <div key={button.label+ index}>
                            <button
                                className={styles.appsButtonContainer}
                                onClick={() => window.open(button.link)}
                                style={{
                                    display: 'grid',
                                    justifyItems: 'center',
                                    justifyContent: 'center',
                                    height: '75px',
                                    width:  '75px'
                                }}
                            >
                                {button.icon}
                                <div className={[styles.overflowEllipsis, styles.buttonLabel].join(' ')} style={{
                                    maxWidth: '100%'
                                }}> {button.label}</div>

                            </button>
                            <ToolTip content={button.label}/>
                        </div>
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
