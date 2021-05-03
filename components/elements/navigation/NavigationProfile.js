import PropTypes from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {getBoxShadow} from "../../../styles/shared/MainStyles";
import {Avatar, Button, createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import ImageHost from "../../../utils/shared/ImageHost";
import React, {useState} from "react";
import Link from "next/link";
import Cookies from "universal-cookie/lib";
import {ExitToAppRounded} from "@material-ui/icons";
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../profile/ProfilePersona";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)
    if (props.profile !== null && (new Cookies()).get('jwt') !== undefined)
        return (
            <div className={mainStyles.displayColumnSpaced} style={{
                position: 'absolute',
                bottom: '5px',
                justifyItems: 'center',
                width: '100%',
                borderRadius: '8px',
            }}
            >
                {open && !props.reduced ?
                    <div style={{
                        backgroundColor: '#262626',
                        width: '250px',
                        borderRadius: '5px 5px 0px 0px',
                        opacity: 0
                    }} className={[mainStyles.displayColumnSpaced, animations.slideUpAnimation].join(' ')}>
                        <Link href={{pathname: 'person', query: {id: props.profile.id}}}>
                            <Button style={{
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                height: '5vh',
                                color: 'white'
                            }}>{props.locale.profile}</Button>
                        </Link>
                        <Link href={{pathname: 'signin'}}>
                            <Button style={{
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                height: '5vh',
                                color: 'white'
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
                    borderRadius: open ? '0px 0px 5px 5px' : '5px',
                    backgroundColor: '#262626',
                    display: 'flex',
                    justifyContent: 'space-between',
                    overflow: 'hidden'
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
    else return (

        <Link href={{pathname: 'signin'}}>
            <Button style={{
                width: props.reduced ? '65px' : '250px',
                height: '65px',
                textTransform: 'none',
                borderRadius: '8px',
                backgroundColor: '#262626',
                color: 'white',
            }}>
                <ExitToAppRounded style={{transform: 'rotate(180deg)'}}/>
                {props.reduced ? null :
                    <p style={{marginLeft: '10px'}}>{props.locale.signin}</p>}
            </Button>
        </Link>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.object,
    dark: PropTypes.bool,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    locale: PropTypes.object
}