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
                    backgroundColor: '#333333',
                    width: '250px',
                    borderRadius: '5px 5px 0px 0px',
                    opacity: 0
                }} className={[mainStyles.displayColumnSpaced, animations.slideUpAnimation].join(' ')}>
                    <Link href={{pathname: 'person', query: {id: props.profile.id}}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(0)} style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            textTransform: 'capitalize',
                            transition: '300ms ease-in-out',
                            color: hoveredOption === 0 ? '#0095ff' : 'white',
                            paddingTop: '8px'
                        }}>{props.locale.profile}</Button>
                    </Link>
                    <Link href={{pathname: 'signin'}}>
                        <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(1)} style={{
                            width: '100%',
                            justifyContent: 'flex-start',
                            textTransform: 'capitalize',
                            transition: '300ms ease-in-out',
                            color: hoveredOption === 1 ? '#0095ff' : 'white'
                        }}>{props.locale.signout}</Button>
                    </Link>
                    <Divider style={{marginBottom: '10px'}} orientation={"horizontal"}/>
                </div>
                :
                null
            }

            <Button style={{
                width: props.reduced ? '65px' : '250px',
                height: '65px',
                textTransform: 'none',
                borderRadius: open && !props.reduced ? '0px 0px 5px 5px' : '8px',
                backgroundColor: open ? '#333333' : hovered ? 'rgba(255, 255, 255, .2)' : 'transparent',
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
                                    size={'50px'} image={props.profile.pic}/>
                    {props.reduced ?
                        null
                        :
                        <div>
                            <div
                                className={[mainStyles.overflowEllipsis, mainStyles.displayInlineStart].join(' ')}
                                style={{color: 'white', fontWeight: '500'}}>
                                {props.profile.name.split(' ')[0] + ' ' + props.profile.name.split(' ').splice(-1).join(' ')}
                            </div>
                            <div
                                className={[mainStyles.overflowEllipsis, mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                style={{color: '#e2e2e2'}}>
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