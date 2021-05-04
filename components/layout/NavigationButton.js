import React from 'react'
import {Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Link from 'next/link'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'

export default function NavigationButton(props) {

    return (
        <div className={props.noMargin ? null : mainStyles.marginVertical}
             style={{
                     borderRadius: '8px',
                     width: props.reduced ? '65px' : '250px',
                     height: '65px',
                    backgroundColor: props.highlight ? '#333333' : 'transparent'
             }}>
            {props.linkPath !== null ?
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: "dark"
                    }
                })}>
                    <Link href={{
                        pathname: props.linkPath,
                        locale: props.locale,
                        query: props.linkQuery !== undefined ? props.linkQuery : null
                    }}>

                        <Button style={{
                            width: props.reduced ? '65px' : '250px',
                            height: '65px',
                            textTransform: 'none',
                            borderRadius: '8px',
                            transition: '.3s'
                        }}>
                            <div className={mainStyles.displayInlineStart}
                                 style={{
                                     width: '100%'
                                 }}>
                                {props.icon}
                                <p style={{
                                    transition: '.3s',
                                    transform: 'translateX(10px)',
                                    color: props.highlight ? '#0095ff' : 'white',
                                    fontSize: '.95rem'
                                }}> {!props.reduced ? props.label : null}</p>
                            </div>
                        </Button>

                    </Link>
                </ThemeProvider>
                :

                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        type: "dark"
                    }
                })}>
                    <Button style={{
                        width: '65px',
                        height: '65px', textTransform: 'none'
                    }}
                            onClick={() => props.setToggle(!props.initialValue)}>
                        {props.icon}
                    </Button>
                </ThemeProvider>
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
    noMargin: PropTypes.bool
}
