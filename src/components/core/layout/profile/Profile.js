import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styles from './styles/Profile.module.css'
import AnimationFrame from "../navigation/templates/AnimationFrame";
import {ExitToAppRounded} from "@material-ui/icons";
import {Avatar} from "@material-ui/core";


export default function Profile(props) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={styles.appsContainer}
            onBlur={event => {
                if (!event.currentTarget.contains(event.relatedTarget))
                    setOpen(false)
            }}
        >
            <button
                className={styles.buttonContainer}
                onClick={() => props.redirectToLogin()}
                style={{display: props.profile && Object.keys(props.profile).length > 0 ? 'none' : undefined}}
            >
                Entrar
                <ExitToAppRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <button
                className={styles.buttonContainer}
                onClick={() => setOpen(!open)}
                style={{
                    display: props.profile && Object.keys(props.profile).length > 0 ? undefined : 'none',
                    backgroundColor: open ? '#0095ff' : null,
                    color: open ? 'white' : null
                }}
            >
                <div style={{
                    fontSize: '.85rem',
                    fontWeight: 'bold',
                    color: open ? '#0095ff' : undefined,
                    transition: '150ms linear'
                }}>
                    Bem vindo
                </div>

                <div className={styles.overflowEllipsis} style={{maxWidth: '50%'}}>
                    {props.profile?.name}
                </div>
                <Avatar style={{width: '30px', height: '30px'}} src={props.profile?.image}/>
            </button>
            <AnimationFrame render={open}>
                <div className={styles.floatingBox}>
                    {props.buttons.map((button, index) => (
                        <button
                            className={styles.appsButtonContainer}
                            key={'profile-button-' + index}
                            disabled={button.disabled}
                            onClick={() => props.redirect(button.path)}
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                height: '44px'
                            }}>

                            {button.icon}
                            <div
                                style={{
                                    marginLeft: '8px',
                                    fontSize: '.9rem',
                                    overflow: "hidden",
                                    color: '#111111',
                                    fontWeight: 590
                                }}> {button.label}</div>
                        </button>
                    ))}
                </div>
            </AnimationFrame>
        </div>
    )
}
Profile.propTypes = {
    redirectToLogin: PropTypes.func,
    redirect: PropTypes.func,
    profile: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string
    }),
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.any,
            path: PropTypes.string,
            disabled: PropTypes.bool
        })
    )
}
