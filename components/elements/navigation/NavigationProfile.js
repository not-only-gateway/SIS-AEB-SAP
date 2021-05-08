import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {Button, Divider} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../ProfilePersona";
import {ExitToApp, PersonPinRounded, PersonRounded} from "@material-ui/icons";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)
    const [hoveredOption, setHoveredOption] = useState(null)
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
            {open && !props.reduced ?
                <div style={{
                    width: '220px',
                    opacity: 0,
                    display: 'grid',
                    gap: '16px',
                    marginBottom:'8px'
                }} className={ animations.popInAnimation}>
                    <Link href={{pathname: 'person', query: {id: props.profile.id}}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(0)}
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    textTransform: 'capitalize',
                                    transition: '300ms ease-in-out',
                                    color: hoveredOption === 0 ? '#0095ff' : '#a6a6a9',
                                    padding: 0
                                }}>
                            <PersonRounded style={{ marginRight: '8px'}}/> {props.locale.profile}</Button>
                    </Link>
                    <Link href={{pathname: 'signin'}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(1)}
                                style={{
                                    width: '100%',
                                    justifyItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    textTransform: 'capitalize',
                                    transition: '300ms ease-in-out',
                                    color: hoveredOption === 1 ? '#0095ff' : '#a6a6a9',
                                    padding: 0
                                }}>
                            <ExitToApp style={{transform: 'rotate(180deg)', marginRight: '8px'}}/> {props.locale.signout}
                        </Button>
                    </Link>
                </div>
                :
                null
            }

            <Button style={{
                width: props.reduced ? '65px' : '220px',
                height: '65px',
                textTransform: 'none',
                borderRadius: open && !props.reduced ? '0px 0px 8px 8px' : '8px',
                // border: (open && !props.reduced) || hovered ? 'hsla(210, 11%, 78%, 0.5)  .7px solid' : 'transparent .7px solid',
                boxShadow: (open && !props.reduced) || hovered ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: props.reduced ? 'center' : 'flex-start',
                overflow: 'hidden',
                transition: '300ms ease-in-out',
                padding: 0
            }} onClick={() => {
                if (props.reduced)
                    props.setReduced(false)
                setOpen(!open)
            }}>
                <>
                    <ProfilePersona base64={false} cakeDay={false} variant={'rounded'} key={'nav-bar-profile'}
                                    size={props.reduced ? '55px' : '50px'} image={props.profile.pic} elevation={false}/>
                    {props.reduced ?
                        null
                        :
                        <div>
                            <div
                                className={[mainStyles.overflowEllipsis, mainStyles.displayInlineStart].join(' ')}
                                style={{color: '#f2f2f2', fontWeight: '550', marginLeft: '10px', fontSize: '.85rem'}}>
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