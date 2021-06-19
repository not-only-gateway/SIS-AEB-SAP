import PropTypes from 'prop-types'
import {Avatar} from "@material-ui/core";
import React from 'react'
import styles from '../styles/Navigation.module.css'
import AnimationFrame from "./AnimationFrame";
import NavigationButton from "./NavigationButton";
import {useState} from "react";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)

    return (
        // <Link href={{pathname: '/person', query: {id: props.profile.id}}}>

        <div className={styles.appsContainer} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>

            <button
                className={styles.buttonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    border: open ? '#ecedf2 1px solid' : 'transparent 1px solid',
                    backgroundColor: open ? '#f4f5fa' : undefined,
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                    cursor: 'pointer',
                    maxWidth: '225px',
                    height: '100%',
                    gap: '6px',
                }}
            >
                <div style={{
                    color: '#555555',
                    fontWeight: 620,
                    fontSize: '.85rem',
                    transition: '300ms ease-in',
                }}>
                    {props.lang.hello}
                </div>

                <div className={styles.overflowEllipsis} style={{
                    color: '#555555',
                    maxWidth: '43%',
                    fontWeight: 575,
                    fontSize: '.85rem',
                    transition: '300ms ease-in'
                }}>
                    {props.profile.name}
                </div>
                <Avatar  style={{width: '30px', height: '30px'}} src={props.profile.image}/>

            </button>
            <AnimationFrame elementKey={'floating-profile'} children={
                <div className={styles.floatingBox} style={{
                    width: '175px', transform: 'translateY(23%)', marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    gap: '8px'
                }}>

                    {props.buttons.map(button => (
                        <div style={{height: '44px', width: '100%'}}>
                            <NavigationButton
                                extended={true}

                                linkPath={button.link}
                                linkQuery={button.linkProps}
                                highlight={false}
                                icon={
                                    button.icon
                                } label={button.label}
                            />
                        </div>
                    ))}
                </div>
            } render={open} type={"fade"}/>
        </div>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.object,
    accessProfile: PropTypes.object,
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
