import React from 'react'
import {Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import Link from 'next/link'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {getBoxShadow} from "../../styles/shared/MainStyles";

export default function NavigationButtonLayout(props) {

    return (
        <div className={mainStyles.marginVertical}
             style={{
                 ...{
                     borderRadius: '8px',
                     backgroundColor: props.highlight ? '#0095ff' : null
                 },
                 ...props.highlight ? getBoxShadow({dark: props.dark}) : null
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
                            height: '6vh',
                            width: props.reduced ? null : '13vw',
                            textTransform: 'none',
                            transition: '.3s'
                        }}>
                            <div className={mainStyles.displayInlineStart}
                                 style={{
                                     width: '100%'
                                 }}>
                                {props.icon}
                                {/*{typeof(props.label) === 'string' ?*/}
                                {/*<p className={[mainStyles.secondaryParagraph, mainStyles.overflowEllipsis].join(' ')}*/}
                                {/*   style={{...{transition: '.3s', transform: 'translateX(10px)', color: props.highlight? '#e5e6e8' : props.dark ? 'white' : 'black'}, ...getSecondaryColor({dark: props.dark})}}> {!props.reduced ? props.label : null}</p>*/}
                                {/*   :*/}
                                {/*   <div className={[mainStyles.secondaryParagraph, mainStyles.overflowEllipsis].join(' ')}*/}
                                {/*   style={{...{transition: '.3s'}, ...getSecondaryColor({dark: props.dark})}}>*/}
                                {/*    {!props.reduced ? props.label : null}*/}
                                {/*   </div>*/}
                                {/*}*/}

                                <p style={{
                                    transition: '.3s',
                                    transform: 'translateX(10px)',
                                    color: 'white',
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
                    <Button style={{height: '6vh', width: '3.5vw', textTransform: 'none'}}
                            onClick={() => props.setToggle(!props.initialValue)}>
                        {props.icon}
                    </Button>
                </ThemeProvider>
            }
        </div>
    )
}

NavigationButtonLayout.propTypes = {
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
    animated: PropTypes.bool
}
