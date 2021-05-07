import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {Button, Divider} from "@material-ui/core";
import React, {useState} from "react";
import Link from "next/link";
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../ProfilePersona";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)
    const [hoveredOption, setHoveredOption] = useState(null)
    const [hovered, setHovered] = useState(false)
    return (
        <div className={mainStyles.displayColumnSpaced} style={{
            position: 'absolute',
            bottom: '5px',
            justifyItems: 'center',
            width: '100%',
            borderRadius: '8px',

        }}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
        >
            {open && !props.reduced ?
                <div style={{
                    borderTop: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    borderLeft: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    borderRight: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',
                    width: '250px',
                    borderRadius: '8px 8px 0px 0px',
                    opacity: 0,
                    backgroundColor: open || hovered ? '#f2f2f2' : 'white',
                }} className={[mainStyles.displayColumnSpaced, animations.slideUpAnimation].join(' ')}>
                    <Link href={{pathname: 'person', query: {id: props.profile.id}}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(0)}
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    textTransform: 'capitalize',
                                    transition: '300ms ease-in-out',
                                    color: hoveredOption === 0 ? '#0095ff' : '#555555',
                                    paddingTop: '8px'
                                }}>{props.locale.profile}</Button>
                    </Link>
                    <Link href={{pathname: 'signin'}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(1)}
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    textTransform: 'capitalize',
                                    transition: '300ms ease-in-out',
                                    color: hoveredOption === 1 ? '#0095ff' : '#555555'
                                }}>{props.locale.signout}</Button>
                    </Link>
                </div>
                :
                null
            }

            <Button style={{
                width: props.reduced ? '65px' : '250px',
                height: '65px',
                textTransform: 'none',
                borderRadius: open && !props.reduced ? '0px 0px 8px 8px' : '8px',
                border: (open && !props.reduced) || hovered ? 'hsla(210, 11%, 78%, 0.5)  .7px solid' : 'transparent .7px solid',
                boxShadow: (open && !props.reduced) || hovered ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : null,
                backgroundColor: (open && !props.reduced) || hovered ? '#f2f2f2' : 'white',
                display: 'flex',
                justifyContent: 'space-between',
                overflow: 'hidden',
                transition: '300ms ease-in-out'
            }} onClick={() => {
                if (props.reduced)
                    props.setReduced(false)
                setOpen(!open)
            }}>
                <>
                    <ProfilePersona base64={false} cakeDay={false} variant={'circular'} key={'nav-bar-profile'}
                                    size={'50px'} image={props.profile.pic} elevation={false}/>
                    {props.reduced ?
                        null
                        :
                        <div>
                            <div
                                className={[mainStyles.overflowEllipsis, mainStyles.displayInlineStart].join(' ')}
                                style={{color: '#555555', fontWeight: '500'}}>
                                {props.profile.name.split(' ')[0] + ' ' + props.profile.name.split(' ').splice(-1).join(' ')}
                            </div>
                            <div
                                className={[mainStyles.overflowEllipsis, mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                style={{color: '#777777'}}>
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