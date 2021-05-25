import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";

import React, {useState} from "react";
import Link from "next/link";
import ProfilePersona from "../ProfilePersona";
import Button from "../../modules/inputs/Button";

export default function NavigationProfile(props) {

    const [hovered, setHovered] = useState(false)

    const content = (
        <button
            style={{
                backgroundColor: "transparent",
                borderRadius: '8px',
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
                padding: '5px',
                display: 'flex',
                justifyContent: props.reduced ? 'center' : 'flex-start',
                width: props.reduced ? '65px' : '220px',
                cursor: props.accessProfile !== null && props.accessProfile.canUpdatePerson ? 'pointer' : 'unset'
            }}
            disabled={props.accessProfile === null || !props.accessProfile.canUpdatePerson}
        >
            <>
                <ProfilePersona base64={false} cakeDay={false} variant={'rounded'} key={'nav-bar-profile'}
                                size={props.reduced ? '55px' : '50px'} image={props.profile.image}
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
        </button>
    )

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

            {props.accessProfile !== null && props.accessProfile.canUpdatePerson ?
                <Link href={{pathname: '/person', query: {id: props.profile.id}}}>
                    {content}
                </Link>
                :
                content
            }

        </div>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.object,
    dark: PropTypes.bool,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    locale: PropTypes.object,
    accessProfile: PropTypes.object
}