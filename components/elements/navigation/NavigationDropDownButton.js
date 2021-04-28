import PropTypes, {func} from 'prop-types'
import mainStyles from "../../../styles/shared/Main.module.css";
import {getBoxShadow} from "../../../styles/shared/MainStyles";
import {Avatar, Button, createMuiTheme, Divider, ThemeProvider} from "@material-ui/core";
import ImageHost from "../../../utils/shared/ImageHost";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Cookies from "universal-cookie/lib";
import {ExitToAppRounded} from "@material-ui/icons";
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../profile/ProfilePersona";

export default function NavigationDropDownButton(props) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if(props.reduced)
            setOpen(false)
    }, [props.reduced])
    return (
        <>
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: "dark"
                }
            })}>

                <div className={mainStyles.marginVertical}
                     style={{
                         ...{
                             borderRadius: open? '8px 8px 0 0' : null,
                             backgroundColor: open ? '#262626' : null,
                             width: props.reduced ? '65px' : '250px',
                             height: '65px',
                                position: 'relative'
                         },
                         ...props.highlight ? getBoxShadow({dark: props.dark}) : null
                     }}>

                    <Button style={{
                        width: props.reduced ? '65px' : '250px',
                        height: '65px',
                        textTransform: 'none',
                        borderRadius: open? '8px 8px 0 0' : '8px',
                        transition: '.3s'
                    }} onClick={() => {
                        if (props.reduced)
                            props.setReduced(false)
                        setOpen(!open)
                    }} >
                        <div className={mainStyles.displayInlineStart}
                             style={{
                                 width: '100%'
                             }}>
                            {props.icon}
                            <p style={{
                                transition: '350ms',
                                transform: 'translateX(10px)',
                                color: 'white',
                                fontSize: '.95rem'
                            }}> {!props.reduced ? props.label : null}</p>
                        </div>
                    </Button>
                    {open ?
                        <div style={{
                            position: 'absolute',
                            justifyItems: 'center',
                            width: '100%',
                            opacity: 0,
                            borderRadius: '0px 0 8px 8px',
                            backgroundColor: open ? '#262626' : null,
                        }} className={[mainStyles.displayColumnSpaced, animations.slideDownAnimation].join(' ')} >
                            {props.options.map(option => (
                                <Link href={{pathname: option.path, locale: props.locale, query: option.query}}>
                                    <Button style={{width: '100%', justifyContent: 'flex-start', textTransform: 'capitalize', color: 'white'}}>
                                        {option.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                        :
                        null
                    }
                </div>
            </ThemeProvider>
        </>
    )

}
NavigationDropDownButton.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.object,
    options: PropTypes.array,
    locale: PropTypes.string,
    setReduced: PropTypes.func,
    reduced: PropTypes.bool,
    key: PropTypes.string
}