import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {ArrowForwardIosRounded,} from "@material-ui/icons";
import React, {useState} from "react";
import animations from '../../styles/shared/Animations.module.css'
import mainStyles from "../../styles/shared/Main.module.css";

export default function Accordion(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{

            border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
            width: open ? (props.openSize !== null ? props.openSize + '%' : 'fit-content') : props.closedSize + '%',
            borderRadius: '8px',
            opacity: '0',
            animationDelay: props.animationDelay !== undefined ? props.animationDelay + 'ms' : null,
            boxShadow: props.elevation === false ? null : (open ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : null),
            height: 'fit-content',
            backgroundColor: 'white'
        }} className={animations.slideUpAnimation} key={props.key + '-accordion'}>
            <Button onClick={props.asButton !== true ? () => setOpen(!open) : null} disabled={props.disabled}
                    style={{
                        textTransform: 'none',
                        width: '100%',
                        color: 'black',
                        borderRadius: open ? '0 8px 8px 0' : props.asRow ? '0px' : '8px',
                        position: 'relative',
                        minHeight: '65px',
                    }}>
                <div className={mainStyles.rowContainer}>
                    {props.summary}

                    {props.disabled || props.asButton ? null :
                        <ArrowForwardIosRounded style={{
                            transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
                            transition: '300ms',
                        }}/>
                    }
                </div>
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
