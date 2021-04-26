import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {
    ArrowDownwardRounded,
    ArrowDropDown,
    ArrowForwardIos,
    ArrowForwardIosRounded,
    ArrowForwardRounded
} from "@material-ui/icons";
import React, {useState} from "react";
import {getBorder, getBoxShadow} from "../../styles/shared/MainStyles";
import animations from '../../styles/shared/Animations.module.css'

export default function Accordion(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{
                borderLeft: open || props.highlight ? '#0095ff 2px solid' : null,
                backgroundColor: 'white',
                width: open ? (props.openSize !== null ? props.openSize + 'vw' : 'fit-content') : props.closedSize + 'vw',
                borderRadius: open || props.highlight ? '0 8px 8px 0' : '8px',
                opacity: '0',
                animationDelay: props.animationDelay !== undefined ? props.animationDelay + 'ms' : null,
                boxShadow: open  ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : props.highlight ? 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                minHeight: open ? null : '65px'

        }} className={animations.slideUpAnimation} key={props.key + '-accordion'} >
            <Button onClick={props.asButton !== true ? () => setOpen(!open) : null} disabled={props.disabled}
                    style={{
                        padding: props.asRow ? 0 : '5px',
                        textTransform: 'none',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        color: props.dark ? 'white' : 'black',
                        borderRadius: open ? '0 8px 8px 0' : '8px',
                        position: 'relative',
                        minHeight: '65px'
                    }}>
                {props.summary}
                {props.disabled || props.asButton ? null :
                    <ArrowForwardIosRounded style={{
                        transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
                        transition: '300ms',
                        position: 'absolute',
                        right: '5px',

                    }}/>
                }
            </Button>
            {open ?

                <div style={{padding: '15px'}}>
                    {props.content}
                </div>

                :
                null
            }
        </div>
    )
}

Accordion.propTypes = {
    dark: PropTypes.bool,
    summary: PropTypes.element,
    content: PropTypes.element,
    closedSize: PropTypes.number,
    openSize: PropTypes.number,
    asRow: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.number,
    highlight: PropTypes.bool,
    asButton: PropTypes.bool,
    animationDelay: PropTypes.number
}
