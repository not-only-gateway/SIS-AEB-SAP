import PropTypes from 'prop-types'
import mainStyles from "../../styles/shared/Main.module.css";
import {getBoxShadow, getSecondaryColor, getTertiaryColor} from "../../styles/shared/MainStyles";
import {Avatar, Button, createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import ImageHost from "../../utils/shared/ImageHost";
import React, {useState} from "react";
import Link from "next/link";
import Cookies from "universal-cookie/lib";

export default function NavigationProfile(props) {
    const [open, setOpen] = useState(false)
    if (props.profile !== null && (new Cookies()).get('jwt') !== undefined)
        return (
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: "dark"
                }
            })}>
                <div className={mainStyles.displayColumnSpaced} style={{
                    position: 'absolute',
                    bottom: '5px',
                    justifyItems: 'center',
                    width: '100%',
                    borderRadius: '8px',
                }}>
                    {open && !props.reduced ?
                        <div className={mainStyles.displayColumnSpaced}
                             style={{backgroundColor: '#262626', width: '13vw', borderRadius: '5px 5px 0px 0px'}}>
                            <Link href={{pathname: 'person', query: {id: props.profile.id}}}>
                                <Button style={{
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    height: '5vh'
                                }}>{props.locale.profile}</Button>
                            </Link>
                            <Link href={{pathname: 'signin'}}>
                                <Button style={{
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    height: '5vh'
                                }}>{props.locale.signout}</Button>
                            </Link>
                            <Divider style={{marginBottom: '10px'}} orientation={"horizontal"}/>
                        </div>
                        :
                        null
                    }
                    <Button style={{
                        height: '6.5vh',
                        width: props.reduced ? null : '13vw',
                        textTransform: 'none',
                        borderRadius: open ? '0px 0px 5px 5px' : '5px',
                        backgroundColor: '#262626'
                    }} disabled={props.reduced} onClick={() => setOpen(!open)}>
                        <>
                            <Avatar src={ImageHost() + props.profile.pic} style={{
                                ...{
                                    width: '50px',
                                    height: '50px',
                                    marginRight: props.reduced ? null : '5px'
                                }, ...getBoxShadow({dark: props.dark})
                            }}/>
                            {props.reduced ?
                                null
                                :
                                <div>
                                    <div
                                        className={[mainStyles.overflowEllipsis, mainStyles.displayInlineStart].join(' ')}
                                        style={{color: 'white', fontWeight: '550'}}>
                                        {props.profile.name}
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
            </ThemeProvider>
        )
    else return (
        <div>
            Sign in
        </div>
    )
}
NavigationProfile.propTypes = {
    profile: PropTypes.object,
    dark: PropTypes.bool,
    reduced: PropTypes.bool,
    locale: PropTypes.object
}