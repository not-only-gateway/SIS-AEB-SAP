import PropTypes from 'prop-types'
import mainStyles from "../../styles/shared/Main.module.css";
import {getBoxShadow} from "../../styles/shared/MainStyles";
import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import animations from '../../styles/shared/Animations.module.css'

export default function NavigationDropDownButton(props) {
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [hoveredOption, setHoveredOption] = useState(null)
    useEffect(() => {
        if (props.reduced)
            setOpen(false)
    }, [props.reduced])
    return (

        <div
            className={mainStyles.marginVertical}
            style={{
                borderRadius: '8px',
                width: props.reduced ? '65px' : '250px',
                height: '65px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <Button style={{
                width: '100%',
                height: 'auto',
                textTransform: 'none',
                borderRadius: open ? '8px 8px 0px 0px' : '8px',
                backgroundColor: open ? '#333333' : hovered ? 'rgba(255, 255, 255, .2)' : 'transparent',
                transition: '300ms ease-in-out',
                padding: '16px',
                fontFamily: 'Verdana, Arial, sans-serif'
            }} onClick={() => {
                setOpen(!open)
                props.setReduced(false)
            }
            }>
                <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineStart}
                     style={{
                         width: '100%',
                         color: props.highlight || hovered ? '#0095ff' : 'white',
                         transition: '300ms ease-in-out',
                     }}>
                    <div className={mainStyles.displayInlineCenter}>
                        {props.icon}
                    </div>
                    <div style={{
                        display: props.reduced ? 'none' : 'unset',
                        marginLeft: '16px',
                        fontSize: '.95rem',
                        fontWeight: 550,
                    }}> {props.label}</div>
                </div>
            </Button>

            {open ?
                <div style={{
                    position: 'absolute',
                    justifyItems: 'center',
                    width: '250px',
                    opacity: 0,
                    borderRadius: '0px 0 8px 8px',
                    backgroundColor: open ? '#333333' : null,
                }} className={[mainStyles.displayColumnSpaced, animations.slideDownAnimation].join(' ')}>
                    {props.options.map((option, index) => (
                        <Link href={{pathname: option.path, locale: props.locale, query: option.query}}>
                            <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(index)} style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                textTransform: 'capitalize',
                                color: hoveredOption === index ? '#0095ff' : 'white',
                                transition: '300ms ease-in-out',
                            }}>
                                {option.label}
                            </Button>
                        </Link>
                    ))}
                </div>
                :
                null
            }
        </div>
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