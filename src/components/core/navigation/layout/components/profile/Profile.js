import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styles from './styles/Profile.module.css'
import AnimationFrame from "../../templates/AnimationFrame";
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
                onClick={() => props.fallbackProfileButton.onClick()}
                style={{display: props.profile !== null && props.profile && Object.keys(props.profile).length > 0 ? 'none' : undefined}}
            >
                {props.fallbackProfileButton.label}
                {props.fallbackProfileButton.icon}
            </button>
            <button
                className={styles.buttonContainer}
                onClick={() => setOpen(!open)}
                style={{
                    display: props.profile !== null && props.profile && Object.keys(props.profile).length > 0 ? undefined : 'none',
                    backgroundColor: open ? '#0095ff' : null,
                    color: open ? '#f4f5fa' : null
                }}
            >
                <div style={{
                    fontSize: '.85rem',
                    fontWeight: 'bold',
                    color: open ? 'white' : undefined,
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
                    {props.buttons.map((button, index) => !button ? null : (
                        <button
                            className={styles.buttonContainer}
                            key={'profile-button-' + index}
                            disabled={button.disabled}
                            onClick={() => button.onClick()}
                            style={{
                                width: '100%',
                                justifyContent: 'space-between',
                                height: '44px'
                            }}>

                            {button.icon}
                            <div className={styles.buttonLabel}> {button.label}</div>
                        </button>
                    ))}
                </div>
            </AnimationFrame>
        </div>
    )
}
Profile.propTypes = {
    fallbackProfileButton: PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    }),
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
            onClick: PropTypes.func,
            disabled: PropTypes.bool
        })
    )
}
