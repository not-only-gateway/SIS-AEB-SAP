import React from 'react'
import {Button} from '@material-ui/core';
import Link from 'next/link'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {
    getBoxShadow,
    getPrimaryBackground,
    getPrimaryColor,
    getSecondaryBackground,
    getSecondaryColor, getTertiaryBackground
} from "../../styles/shared/MainStyles";

export default function NavigationButtonLayout(props) {
    return (
        <div className={mainStyles.marginVertical}
             style={{
                 ...{
                     borderRadius: '0px 8px 8px 0px ',
                     borderLeft: props.highlight ? '#39adf6 3px solid' : 'transparent 2px solid'
                 },
                 ...props.highlight ? getTertiaryBackground({dark: props.dark}) : null,
                 ...props.highlight ? getBoxShadow({dark: props.dark}) : null
             }}>
            {props.linkPath !== null ?
                <Link href={{
                    pathname: props.linkPath,
                    locale: props.locale,
                    query: props.linkQuery !== undefined ? props.linkQuery : null
                }}>
                    <Button style={{
                        height: '6vh',
                        width: props.reduced ? '3.5vw' : '13vw',
                        textTransform: 'none',
                        transition: '.3s'
                    }}>
                        <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineStart}
                             style={{
                                 width: '100%'
                             }}>
                            {props.icon}
                            <p className={[mainStyles.secondaryParagraph, mainStyles.overflowEllipsis].join(' ')}
                               style={{...{transition: '.3s'}, ...getSecondaryColor({dark: props.dark})}}> {!props.reduced ? props.label : null}</p>

                        </div>
                    </Button>
                </Link>
                :
                <Button style={{height: '6vh', width: '3.5vw', textTransform: 'none'}}
                        onClick={() => props.setToggle(!props.initialValue)}>
                    {props.icon}
                </Button>
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
    label: PropTypes.string,
    reduced: PropTypes.bool,
    setToggle: PropTypes.func,
    initialValue: PropTypes.bool,

}