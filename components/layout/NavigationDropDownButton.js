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

                border: open ? 'hsla(210, 11%, 78%, 0.5)  .7px solid' : 'transparent .7px solid',
                boxShadow: open  ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : null,
                backgroundColor: (open && !props.reduced) || hovered ? '#f2f2f2' : 'transparent',
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
                         color: props.highlight || hovered ? '#0095ff' : '#a6a6a9',
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
                    position: 'absolute',
                    justifyItems: 'center',

                    opacity: 0,
                    borderBottom: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    borderLeft: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    borderRight: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',
                    width: '210px',
                    borderRadius: '0px 0px 8px 8px',
                    backgroundColor: open || hovered ? '#f2f2f2' : 'white',
                }} className={[mainStyles.displayColumnSpaced, animations.slideDownAnimation].join(' ')}>
                    {props.options.map((option, index) => (
                        <Link href={{pathname: option.path, locale: props.locale, query: option.query}}>
                            <Button onMouseLeave={() => setHoveredOption(null)} onMouseEnter={() => setHoveredOption(index)} style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                textTransform: 'capitalize',
                                color: hoveredOption === index ? '#0095ff' : '#555555',
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