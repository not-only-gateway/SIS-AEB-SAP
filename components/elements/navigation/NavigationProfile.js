import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {Button} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import ProfilePersona from "../ProfilePersona";

export default function NavigationProfile(props) {

    const [hovered, setHovered] = useState(false)
    return (
        <div className={mainStyles.displayColumnSpaced} style={{
            position: 'absolute',
            paddingLeft: props.reduced ? '0' : '8px',
            paddingRight: props.reduced ? '0' : '8px',
            justifyItems: 'center',
            borderRadius: '8px',
            backgroundColor: hovered ? '#0095ff' : 'transparent',
            transition: '300ms ease-in'
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
                                        color: hovered ? 'white' : '#f2f2f2',
                                        fontWeight: '550',
                                        marginLeft: '10px',
                                        fontSize: '.85rem',
                                        transition: '300ms ease-in'
                                    }}>
                                    {props.profile.name}
                                </div>
                                <div
                                    className={mainStyles.overflowEllipsis}
                                    style={{
                                        color: hovered ? '#f2f2f2' : '#a6a6a9',
                                        marginLeft: '10px',
                                        fontSize: '.73rem',
                                        transition: '300ms ease-in'
                                    }}>
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