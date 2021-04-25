import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import React, {useState} from "react";
import {getBorder, getBoxShadow} from "../../styles/shared/MainStyles";
import animations from '../../styles/shared/Animations.module.css'

export default function AccordionLayout(props) {
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false)
    return (
        <div style={{
            ...{
                backgroundColor: 'white',
                width: open ? (props.openSize !== null ? props.openSize + 'vw' : 'fit-content') : props.closedSize + 'vw',
                borderRadius: open ? '0 8px 8px 0' : '8px',
                opacity: '0',
                animationDelay: props.animationDelay !== undefined ? props.animationDelay + 'ms' : null,
                boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                transition: "300ms"
            },
            ...open ? getBorder({dark: props.dark, highlight: true}) : null
        }} className={animations.slideUpAnimation} key={props.key + '-accordion'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Button onClick={props.asButton !== true ? () => setOpen(!open) : null} disabled={props.disabled}
                    style={{
                        padding: '5px',
                        textTransform: 'none',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        color: props.dark ? 'white' : 'black',
                        borderRadius: open ? '0 8px 8px 0' : '8px',
                        position: 'relative'
                    }}>
                {props.summary}
                {props.disabled || props.asButton ? null :
                    <ArrowDownwardRounded style={{
                        transform: open ? 'rotate(180deg)' : null,
                        transition: '300ms',
                        position: 'absolute',
                        right: '5px',

                    }}/>
                }
            </Button>
            {open ?

                props.content

                :
                null
            }
        </div>
    )
}

AccordionLayout.propTypes = {
    dark: PropTypes.bool,
    summary: PropTypes.element,
    content: PropTypes.element,
    closedSize: PropTypes.number,
    openSize: PropTypes.number,
    asRow: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.number,
    background: PropTypes.string,
    asButton: PropTypes.bool,
    animationDelay: PropTypes.number
}
