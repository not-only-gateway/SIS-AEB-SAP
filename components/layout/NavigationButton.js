import React, {useState} from 'react'
import {Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Link from 'next/link'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'

export default function NavigationButton(props) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            className={props.noMargin ? null : mainStyles.marginVertical}
            style={{
                borderRadius: '8px',
                width: props.minWidth ? '65px' : (props.reduced ? '65px' : '250px'),
                height: '65px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {props.linkPath !== null ?
                <Link href={{
                    pathname: props.linkPath,
                    locale: props.locale,
                    query: props.linkQuery !== undefined ? props.linkQuery : null
                }}>

                    <Button style={{
                        width: '100%',
                        height: 'auto',
                        textTransform: 'none',
                        borderRadius: '8px',
                        backgroundColor: hovered ? 'rgba(0, 0, 0, .07)' : 'transparent',
                        transition: '300ms ease-in-out',
                        padding: '16px'
                    }}>
                        <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineStart}
                             style={{
                                 width: '100%',
                                 color: props.highlight || hovered ? '#0095ff' : '#777777',
                                 transition: '300ms ease-in-out',
                             }}>
                            <div className={mainStyles.displayInlineCenter}>
                                {props.icon}
                            </div>
                            <div style={{
                                display: props.reduced ? 'none' : 'unset',
                                marginLeft: '16px',
                                fontSize: '1rem',
                            }}> {props.label}</div>
                        </div>
                    </Button>

                </Link>
                :


                <Button style={{
                    width: '65px',
                    height: '65px', textTransform: 'none'
                }}
                        onClick={() => props.setToggle(!props.initialValue)}>
                    {props.icon}
                </Button>

            }
        </div>
    )
}

NavigationButton.propTypes = {
    dark: PropTypes.bool,
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,
    locale: PropTypes.string,
    label: PropTypes.any,
    reduced: PropTypes.bool,
    setToggle: PropTypes.func,
    initialValue: PropTypes.bool,
    animated: PropTypes.bool,
    noMargin: PropTypes.bool,
    minWidth: PropTypes.bool
}
