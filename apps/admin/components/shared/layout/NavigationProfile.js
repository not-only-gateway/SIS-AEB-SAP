import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";

import React, {useState} from "react";
import Link from "next/link";
import PersonAvatar from "../PersonAvatar";
import styles from '../../../styles/Navigation.module.css'
import {AppsRounded, ExitToApp, ExtensionRounded, TimelineRounded, TuneRounded} from "@material-ui/icons";
import AnimationFrame from "../AnimationFrame";
import NavigationButton from "./NavigationButton";
import Cookies from "universal-cookie/lib";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)

    return (
        // <Link href={{pathname: '/person', query: {id: props.profile.id}}}>

        <div className={styles.appsContainer} onBlur={event =>{
            if(!event.currentTarget.contains(event.relatedTarget))
                setOpen(false)
        }}>

            <button
                className={styles.buttonContainer}

                onClick={() => setOpen(!open)}
                style={{
                    backgroundColor: open ? '#0095ff' : undefined,
                    justifyContent: 'flex-end',
                    alignItems: 'center',

                    cursor: 'pointer',
                    minWidth: '175px',
                    maxWidth:   '225px',
                    height: '100%',
                    gap: '6px',
                    paddingRight: 0,
                    paddingLeft: '5px'
                }}
            >
                <div style={{
                    color: '#f2f2f2',
                    fontWeight: '620',
                    fontSize: '.85rem',
                    transition: '300ms ease-in',
                }}>
                    {props.lang.hello}
                </div>

                <div className={mainStyles.overflowEllipsis} style={{
                    color: '#f2f2f2',
                    maxWidth: '43%',
                    fontWeight: '550',
                    fontSize: '.85rem',
                    transition: '300ms ease-in'
                }}>
                    {props.profile.name}
                </div>
                <PersonAvatar variant={'rounded'}
                              size={'44px'} image={props.profile.image}
                              elevation={false}/>

            </button>
            <AnimationFrame elementKey={'floating-profile'} children={
                <div className={styles.floatingBoxContainer} style={{
                    width: '175px', transform: 'translateY(23%)', marginLeft: 'auto',
                    marginRight: 'auto',
                    left: 0,
                    right: 0,
                    gap: '8px'
                }}>
                    <div style={{height: '44px', width: '100%'}}>
                        <NavigationButton
                            linkPath={'/authenticate'}
                            label={props.lang.signout}
                            icon={
                                <ExitToApp style={{transform: 'rotate(180deg)'}}/>
                            }
                        />
                    </div>
                    <div style={{height: '44px', width: '100%'}}>
                        <NavigationButton
                            linkPath={'/settings'}

                            label={props.lang.settings}

                            icon={
                                <TuneRounded/>
                            }
                        />
                    </div>

                </div>
            } render={open} type={"fade"}/>
        </div>
    )
}
NavigationProfile.propTypes =
{
    profile: PropTypes.object,
        locale
:
    PropTypes.object,
        accessProfile
:
    PropTypes.object,
        lang
:
    PropTypes.object
}