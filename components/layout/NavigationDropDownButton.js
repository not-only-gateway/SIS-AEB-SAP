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
            style={{
                borderRadius: '8px',
                width: props.reduced ? '65px' : '210px',
                height: open ? 'auto' : '65px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            <Button style={{
                width: '100%',
                height: 'auto',
                textTransform: 'none',
                borderRadius: open ? '0px' : '8px',

                borderLeft: open ? '#0095ff  .7px solid' : 'transparent .7px solid',
                backgroundColor: props.highlight ? '#0095ff' :'transparent',
                transition: '300ms ease-in-out',
                padding: props.reduced ? '16px' : '10px',
            }} onClick={() => {
                setOpen(!open)
                props.setReduced(false)
            }
            }>
                <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineStart}
                     style={{
                         width: '100%',
                         color: hovered || open ? '#0095ff' : '#a6a6a9',
                         transition: '300ms ease-in-out',
                     }}>
                    <div className={mainStyles.displayInlineCenter}>
                        {props.icon}
                    </div>
                    <div style={{
                        display: props.reduced ? 'none' : 'unset',
                        marginLeft: '8px',
                        fontSize: '.9rem',
                    }}> {props.label}</div>
                </div>
            </Button>

            {open ?
                <div style={{
                    justifyItems: 'center',

                    opacity: 0,
                    borderLeft: '#0095ff  .7px solid',
                    width: '210px',
                    borderRadius: '0px',
                }} className={[mainStyles.displayColumnSpaced, animations.slideDownAnimation].join(' ')}>
                    {props.options.map((option, index) => (
                        <Link href={{pathname: option.path, locale: props.locale, query: option.query}}>
                            <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(index)} style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                textTransform: 'capitalize',
                                color: hoveredOption === index ? '#0095ff' : '#a6a6a9',
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