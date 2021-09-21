import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import React, {useState} from 'react'
import styles from '../styles/Navigation.module.css'
import AnimationFrame from "./AnimationFrame";

import Link from "next/link";

export default function NavigationProfile(props) {
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

                    backgroundColor: open ? '#E8F0FE' : null,
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                    cursor: 'pointer',
                    maxWidth: '225px',
                    height: '100%',
                    gap: '6px',
                }}
            >
                <div style={{
                    fontSize: '.85rem',
                    fontWeight: 'bold',
                    color: open ? '#0095ff' : undefined,
                    transition: '150ms linear'
                }}>
                    {props.lang.hello}
                </div>

                <div className={styles.overflowEllipsis} style={{maxWidth: '50%'}}>
                    {props.profile.name}
                </div>
                <Avatar style={{width: '30px', height: '30px'}} src={props.profile.image}/>

            </button>
            <AnimationFrame elementKey={'floating-profile'} render={open} type={"fade"}>
                <div className={styles.floatingBox} style={{
                    width: '175px', transform: 'translateY(23%)', marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    gap: '8px'
                }}>

                    {props.buttons.map((button, index) => (

                        <Link href={{
                            pathname: button.link,
                            query: button.linkProps !== undefined ? button.linkProps : null
                        }}>

                            <button
                                className={styles.appsButtonContainer}
                                key={button.label + index}
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

                        </Link>
                    ))}
                </div>
            </AnimationFrame>
        </div>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string
    }),
    lang: PropTypes.object,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    )
}
