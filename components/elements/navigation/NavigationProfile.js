import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {Button, Divider} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../ProfilePersona";
import {ExitToApp, PersonPinRounded, PersonRounded} from "@material-ui/icons";

export default function NavigationProfile(props) {

    const [hovered, setHovered] = useState(false)
    return (
        <div className={mainStyles.displayColumnSpaced} style={{
            position: 'absolute',

            justifyItems: 'center',
            borderRadius: '8px',

        }}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
        >
            <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                <Button style={{
                    width: props.reduced ? '65px' : '220px',
                    height: '65px',
                    textTransform: 'none',
                    borderRadius: '8px',

                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: props.reduced ? 'center' : 'flex-start',
                    overflow: 'hidden',
                    transition: '300ms ease-in-out',
                    padding: 0
                }}>
                    <>
                        <ProfilePersona base64={false} cakeDay={false} variant={'rounded'} key={'nav-bar-profile'}
                                        size={props.reduced ? '55px' : '50px'} image={props.profile.pic}
                                        elevation={false}/>
                        {props.reduced ?
                            null
                            :
                            <div>
                                <div
                                    className={[mainStyles.overflowEllipsis, mainStyles.displayInlineStart].join(' ')}
                                    style={{
                                        color: '#f2f2f2',
                                        fontWeight: '550',
                                        marginLeft: '10px',
                                        fontSize: '.85rem'
                                    }}>
                                    {props.profile.name}
                                </div>
                                <div
                                    className={mainStyles.overflowEllipsis}
                                    style={{color: '#a6a6a9', marginLeft: '10px', fontSize: '.73rem'}}>
                                    {props.profile.corporateEmail}
                                </div>

                            </div>
                        }
                    </>
                </Button>
            </Link>
        </div>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.object,
    dark: PropTypes.bool,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    locale: PropTypes.object
}